import inherits from '../utils/inherits.js';
import { UserSchema } from '../schemas/UserSchema.js';

export class UserDTO extends inherits(UserSchema) {}
