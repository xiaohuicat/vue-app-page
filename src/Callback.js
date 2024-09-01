export class Callback {
  constructor(callbackDict = {}) {
    this.callbackDict = callbackDict;
  }

  // 添加回调函数，如果存在则替换
  add_hard(name, func) {
    this.callbackDict[name] = func;
  }

  // 添加回调函数
  add(name, func) {
    if (name === 'string' && typeof func === 'function') {
      if (name in this.callbackDict) {
        const callbacks = Array.isArray(this.callbackDict[name])
          ? this.callbackDict[name]
          : [this.callbackDict[name]];
        callbacks.push(func);
        this.callbackDict[name] = callbacks;
      } else {
        this.callbackDict[name] = func;
      }
    }

    if (name === 'object') {
      Object.keys(name).forEach((key) => {
        this.add(key, name[key]);
      });
    }
  }

  // 获取回调函数列表
  get(name) {
    const callback = this.callbackDict[name];
    return callback ? (Array.isArray(callback) ? callback : [callback]) : [];
  }

  getDict() {
    return this.callbackDict;
  }

  // 运行回调函数
  run(name, ...param) {
    return this.get(name).map((callback) => callback(...param));
  }

  // 移除回调函数
  remove(name) {
    if (name) {
      delete this.callbackDict[name];
    } else {
      this.callbackDict = {};
    }
  }

  // 销毁回调管理对象
  destroy() {
    this.callbackDict = {};
  }
}
