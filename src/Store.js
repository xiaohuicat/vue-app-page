import { verifiedString, getObjectProperty, setObjectProperty } from './utils';

class Store {
  constructor(data) {
    this.store = data || {};
    this.events = new Set();
  }

  get(key) {
    if (!verifiedString(key)) return this.store;
    return getObjectProperty(this.store, key);
  }

  set(key, value) {
    if (!verifiedString(key)) return this;
    setObjectProperty(this.store, key, value);
    return this;
  }

  delete(key) {
    delete getObjectProperty(this.store, key);
    return this;
  }

  clear() {
    this.store = {};
    for (let event of this.events) {
      delete this[event];
    }

    this.events.clear();
    return this;
  }

  bind(name, func) {
    if (typeof name === 'string' && typeof func === 'function') {
      this.events.add(name);
      this[name] = (...args) => {
        func.call(this, ...args);
      };
      return this;
    }
  }
}

// 存储实例
const storeMap = new Map();

/**
 * 创建一个全局的store
 * @param {String} name store名称
 * @param {Object} data 数据对象
 * @param {Object} events 事件对象
 * @returns {Store} store实例
 * @example createStore('app-page-store', {}, {setLogin(val){this.set('login', val)}});
 */
function createStore(name, data, events) {
  let store = storeMap.get(name);
  if (store) {
    throw new Error(`store named [${name}] is exists!`);
  }

  store = new Store(data);
  storeMap.set(name, store);
  if (events && typeof events === 'object') {
    Object.keys(events).forEach((key) => {
      store.bind(key, events[key]);
    });
  }

  return store;
}

/**
 * 获取一个全局的store
 * @param {String} name store名称
 * @returns
 */
function useStore(name) {
  let store = storeMap.get(name);
  if (!store) {
    store = new Store();
    storeMap.set(name, store);
  }

  return store;
}

/**
 * 清除store
 * @param {String | undefined} name 清除的store名称，不输入则清除所有
 * @returns
 * @example clearStore('app-page-store') // 清除app-page-store
 * @example clearStore() // 清除所有
 */
function clearStore(name) {
  if (name === undefined) {
    const store = storeMap.get(name);
    store && store.clear();
    storeMap.delete(name);
    return;
  }

  for (let [key, store] of storeMap.entries()) {
    store.clear();
    storeMap.delete(key);
  }
}

export { createStore, useStore, clearStore };
