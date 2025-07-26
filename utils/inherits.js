import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

/**
 * Versatile `inherits()` utility that allows combining:
 * - Zero or one ES6 base class
 * - Zero or more mixins (functions returning classes)
 * - Zero or more JSON Schemas (for validation)
 *
 * Usage Examples:
 *
 * 1. Schema only:
 *    class UserDTO extends inherits(UserSchema) {}
 *
 * 2. Base class + schema:
 *    class BaseUser {
 *      get type() { return 'user'; }
 *    }
 *    class UserDTO extends inherits(BaseUser, UserSchema) {}
 *
 * 3. Mixins + schema:
 *    const Timestamp = Base => class extends Base {
 *      get createdAt() { return Date.now(); }
 *    };
 *    class UserDTO extends inherits(Timestamp, UserSchema) {}
 *
 * 4. Base class + mixins + multiple schemas:
 *    const SoftDelete = Base => class extends Base {
 *      delete() { this._deleted = true; }
 *    };
 *    const A = { properties: { a: { type: 'string' } }, required: ['a'] };
 *    const B = { properties: { b: { type: 'number' } }, required: ['b'] };
 *    class UserDTO extends inherits(BaseUser, SoftDelete, A, B) {}
 *
 * 5. No schema, no class:
 *    class EmptyDTO extends inherits() {}
 */

const isClass = v => typeof v === 'function' && /^class\\s/.test(v.toString());
const isMixin = v => typeof v === 'function' && !isClass(v);
const isSchema = v =>
  typeof v === 'object' &&
  v !== null &&
  (v.type || v.properties || v.allOf || v.anyOf);

export function inherits(...args) {
  let Base = class {};
  const schemas = [];

  for (const arg of args) {
    if (isClass(arg)) {
      Base = arg;
    } else if (isMixin(arg)) {
      Base = arg(Base);
    } else if (isSchema(arg)) {
      schemas.push(arg);
    } else {
      throw new Error('Invalid argument to inherits(): must be a class, mixin, or schema');
    }
  }

  const validate = schemas.length
    ? ajv.compile(schemas.length === 1 ? schemas[0] : { allOf: schemas })
    : null;

  return class extends Base {
    constructor(data = {}) {
      super(data);
      if (validate && !validate(data)) {
        throw new Error('DTO validation failed: ' + ajv.errorsText(validate.errors));
      }
      Object.assign(this, data);
      Object.freeze(this);
    }
  };
}
