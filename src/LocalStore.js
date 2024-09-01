import { getObjectProperty, setObjectExistProperty, setObjectProperty } from './utils';

// 本地数据存储
export class LocalStore {
  constructor(name) {
    this.name = name || 'LocalStore';
    this.data = null;
  }

  get(key, default_val) {
    let data;
    try {
      data = JSON.parse(localStorage.getItem(this.name));
    } catch (err) {
      data = {};
    }

    if (!data) {
      data = {};
    }
    this.data;

    if (!key && typeof key != 'string') {
      return data;
    }

    return getObjectProperty(data, key, default_val);
  }

  set(key, value) {
    if (!key) return;
    if (typeof key == 'string') {
      this.data = setObjectProperty(this.data, key, value);
    } else if (typeof key == 'object') {
      for (let each of Object.keys(key)) {
        if (!this.data) {
          this.data = {};
        }
        this.data[each] = key[each];
      }
    }
  }

  update(key, value) {
    if (!key) return;
    if (typeof key == 'string') {
      this.data = setObjectExistProperty(this.data, key, value);
    } else if (typeof key == 'object') {
      for (let each of Object.keys(key)) {
        if (each in this.data) {
          if (!this.data) {
            this.data = {};
          }
          this.data[each] = key[each];
        }
      }
    }
  }

  delete(key) {
    if (!key) return;
    if (key in this.data) {
      delete this.get(key);
    }
  }

  save(key, value) {
    this.set(key, value);
    localStorage[this.name] = JSON.stringify(this.data);
  }

  free() {
    this.data = null;
  }

  clear() {
    delete localStorage[this.name];
  }

  size() {
    let str = localStorage.getItem(this.name) || '';
    return new Blob([str]).size;
  }
}
