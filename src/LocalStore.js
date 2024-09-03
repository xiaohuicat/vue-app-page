/**
 * 通过校验的字符串
 * @param {*} string
 */
function verifiedString(string) {
  return typeof string === 'string' && string.trim() !== '';
}


// 本地数据存储
export class LocalStore {
  constructor(name) {
    this.name = name || 'LocalStore';
  }

  get(key, default_val) {
    let data = {};
    try {
      data = JSON.parse(localStorage.getItem(this.name)) || {};
    } catch (err) {}

    if (!verifiedString(key)) {
      return data;
    }

    if (typeof data === 'object' && data !== null && key in data) {
      return data[key];
    }

    return default_val;
  }
  
  set(key, value) {
    if (verifiedString(key)) {
      const data = this.get();
      data[key] = value;
      localStorage[this.name] = JSON.stringify(data);
    } else if (key && typeof key == 'object') {
      Object.keys(key).forEach(each => this.set(each, key[each]));
    }
  }

  delete(key) {
    if (!verifiedString(key)) return;
    const data = this.get();
    if (key in data) {
      delete data[key];
    }

    localStorage[this.name] = JSON.stringify(data);
  }

  clear() {
    delete localStorage.removeItem(this.name);
  }

  size() {
    const str = localStorage.getItem(this.name) || '';
    return new TextEncoder().encode(str).length;
  }  
}
