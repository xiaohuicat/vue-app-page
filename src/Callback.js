export class Callback {
  constructor(callbackDict = {}) {
    this.callbackDict = {};
    if (callbackDict && typeof callbackDict === 'object') {
      Object.keys(callbackDict).forEach(each => this.set(each, callbackDict[each]));
    }
  }

  // 添加回调函数，如果存在则覆盖
  set(name, func) {
    if (typeof name === 'string' && typeof func === 'function') {
      this.callbackDict[name] = [func];
    }

    if (typeof name === 'string' && Array.isArray(func) && func.every(each => typeof each === 'function')) {
      this.callbackDict[name] = func;
    }
  }

  // 添加回调函数
  add(name, func) {
    if (typeof name === 'string' && typeof func === 'function') {
      if (name in this.callbackDict) {
        this.callbackDict[name].push(func);
      } else {
        this.callbackDict[name] = [func];
      }

      return;
    }

    if (typeof name === 'object') {
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

  // 运行回调函数
  run(name, ...param) {
    return this.get(name).map(callback => callback(...param));
  }

  // 移除回调函数
  remove(name) {
    if (typeof name === 'string' && name in this.callbackDict) {
      delete this.callbackDict[name];
    }
  }

  // 销毁回调管理对象
  destroy() {
    this.callbackDict = {};
  }
}