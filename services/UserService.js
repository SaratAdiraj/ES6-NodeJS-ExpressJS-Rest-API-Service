import { UserDTO } from '../dtos/UserDTO.js';

export class UserService {
  constructor(store) {
    this.store = store;
  }

  createUsers(users) {
    const results = [];
    for (const u of users) {
      const dto = new UserDTO(u);
      if (this.store.get(dto.id)) {
        throw new Error(`User already exists: ${dto.id}`);
      }
      this.store.set(dto.id, dto);
      results.push(dto);
    }
    return results;
  }
  
  updateUsers(users) {
    const results = [];
    for (const u of users) {
      if (!this.store.get(u.id)) {
        throw new Error(`User not found: ${u.id}`);
      }
      const dto = new UserDTO(u);
      this.store.set(dto.id, dto);
      results.push(dto);
    }
    return results;
  }
  
  deleteUsers(ids) {
    for (const id of ids) {
      if (!this.store.get(id)) {
        throw new Error(`User not found: ${id}`);
      }
      this.store.delete(id);
    }
    return true;
  }
  
  searchUsers(query) {
    const wildcard = new RegExp(query.replace(/\*/g, '.*'), 'i');
    return this.store
      .list()
      .filter(u => wildcard.test(u.name) || wildcard.test(u.email));
  }
  
  listUsers() {
    return this.store.list();
  }
}
