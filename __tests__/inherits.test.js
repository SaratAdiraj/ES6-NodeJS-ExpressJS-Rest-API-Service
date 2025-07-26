import inherits from '../utils/inherits.js';

// Base class example
class Base {
  constructor(data = {}) {
    this.baseSet = true;
  }

  getBaseFlag() {
    return this.baseSet;
  }
}

// Mixin example
class TimestampMixin {
  get createdAt() {
    return this._createdAt || new Date().toISOString();
  }
}

// JSON Schemas
const SchemaA = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' }
  }
};

const SchemaB = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' }
  }
};

describe('inherits utility', () => {
  test('validates with single schema', () => {
    class A extends inherits(SchemaA) {}

    const a = new A({ id: '123', name: 'John' });
    expect(a.id).toBe('123');
    expect(A.validate({ id: 'abc' })).toBe(true);
  });

  test('throws on invalid data', () => {
    class A extends inherits(SchemaA) {}
    expect(() => new A({ name: 'No ID' })).toThrow(/DTO validation failed/);
  });

  test('uses allOf when multiple schemas provided', () => {
    class A extends inherits(SchemaA, SchemaB) {}
    expect(() => new A({ id: '123', email: 'bad' })).toThrow();
    const a = new A({ id: '123', email: 'ok@example.com' });
    expect(a.email).toBe('ok@example.com');
  });

  test('static validate() and errors', () => {
    class A extends inherits(SchemaA, SchemaB) {}
    const valid = A.validate({ id: 'x', email: 'bad' });
    expect(valid).toBe(false);
    expect(Array.isArray(A.errors)).toBe(true);
  });

  test('inherits from base class', () => {
    class A extends inherits(Base, SchemaA) {}
    const a = new A({ id: '1' });
    expect(a.getBaseFlag()).toBe(true);
  });

  test('applies mixins', () => {
    class A extends inherits(Base, TimestampMixin, SchemaA) {}
    const a = new A({ id: 'x' });
    expect(typeof a.createdAt).toBe('string');
  });

  test('no args (fallback to Object)', () => {
    class A extends inherits() {}
    const a = new A({ foo: 1 });
    expect(a.foo).toBe(1);
  });

  test('only mixins without schemas', () => {
    class A extends inherits(TimestampMixin) {}
    const a = new A({ x: 1 });
    expect(a.x).toBe(1);
    expect(typeof a.createdAt).toBe('string');
  });

  test('freeze instance', () => {
    class A extends inherits(SchemaA) {}
    const a = new A({ id: 'freeze' });
    expect(Object.isFrozen(a)).toBe(true);
  });
});
