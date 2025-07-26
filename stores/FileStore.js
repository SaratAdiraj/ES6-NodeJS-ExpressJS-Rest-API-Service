import fs from 'fs';
import path from 'path';
import { Storage } from './Storage.js';

const DATA_FILE = path.resolve('./users.json');

export class FileStore extends Storage {
  constructor() {
    super();
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify({}));
    }
    this.data = JSON.parse(fs.readFileSync(DATA_FILE));
  }

  _save() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2));
  }

  get(id) {
    return this.data[id] || null;
  }

  set(id, value) {
    this.data[id] = value;
    this._save();
  }

  delete(id) {
    delete this.data[id];
    this._save();
  }

  list() {
    return Object.values(this.data);
  }
}
