import { Storage } from './Storage.js'; 

export class MemoryStore extends Storage {
  constructor() {
    super();
    this.data = new Map();
  }

  get(id) {
    return this.data.get(id) || null;
  }

  set(id, value) {
    this.data.set(id, value);
  }

  delete(id) {
    this.data.delete(id);
  }

  list() {
    return Array.from(this.data.values());
  }
}
