import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

/**
 * Usage Examples:
 *
 * // Only schema validation
 * class A extends inherits(Schema1) {}
 *
 * // With base class and schema
 * class A extends inherits(BaseClass, Schema1) {}
 *
 * // With base class, mixins, and schemas
 * class A extends inherits(BaseClass, MixinA, MixinB, Schema1, Schema2) {}
 *
 * // Only mixins and schema
 * class A extends inherits(MixinA, Schema1) {}
 */
export default function inherits(...args) {
  const schemas = [];
  let BaseClass = Object;
  const mixins = [];

  for (const arg of args) {
    if (typeof arg === 'function') {
      if (BaseClass === Object) {
        BaseClass = arg;
      } else {
        mixins.push(arg);
      }
    } else if (typeof arg === 'object' && arg !== null) {
      schemas.push(arg);
    }
  }

  const schema = schemas.length === 1 ? schemas[0] : { allOf: schemas };
  const validate = schemas.length ? ajv.compile(schema) : null;

  class Combined extends BaseClass {
    constructor(data = {}) {
      super(data);
      if (validate && !validate(data)) {
        throw new Error('DTO validation failed: ' + ajv.errorsText(validate.errors));
      }
      Object.assign(this, data);
      Object.freeze(this);
    }

    static validate(data) {
      return validate ? validate(data) : true;
    }

    static get errors() {
      return validate?.errors || null;
    }
  }

  for (const mixin of mixins) {
    Object.getOwnPropertyNames(mixin.prototype).forEach(name => {
      if (name !== 'constructor') {
        Object.defineProperty(
          Combined.prototype,
          name,
          Object.getOwnPropertyDescriptor(mixin.prototype, name)
        );
      }
    });
  }

  return Combined;
}
