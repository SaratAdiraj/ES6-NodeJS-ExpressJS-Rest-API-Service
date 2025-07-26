export const UserSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' }
  },
  required: ['id', 'name', 'email'],
  additionalProperties: false
};
