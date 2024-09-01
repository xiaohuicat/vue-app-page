var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var src_exports = {};
__export(src_exports, {
  Callback: () => Callback,
  LocalStore: () => LocalStore,
  Page: () => Page,
  Tools: () => Tools_default,
  default: () => src_default,
  templateToComponment: () => templateToComponment
});
module.exports = __toCommonJS(src_exports);

// src/Callback.js
var Callback = class {
  constructor(callbackDict = {}) {
    this.callbackDict = callbackDict;
  }
  // 添加回调函数，如果存在则替换
  add_hard(name, func) {
    this.callbackDict[name] = func;
  }
  // 添加回调函数
  add(name, func) {
    if (name === "string" && typeof func === "function") {
      if (name in this.callbackDict) {
        const callbacks = Array.isArray(this.callbackDict[name]) ? this.callbackDict[name] : [this.callbackDict[name]];
        callbacks.push(func);
        this.callbackDict[name] = callbacks;
      } else {
        this.callbackDict[name] = func;
      }
    }
    if (name === "object") {
      Object.keys(name).forEach((key) => {
        this.add(key, name[key]);
      });
    }
  }
  // 获取回调函数列表
  get(name) {
    const callback = this.callbackDict[name];
    return callback ? Array.isArray(callback) ? callback : [callback] : [];
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
};

// src/Page.js
var import_vue_router = require("vue-router");

// src/utils.js
function isObject(obj) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}
function getObjectProperty(obj, key, default_value) {
  const keys = key.split(".");
  let current = obj;
  for (let i2 = 0; i2 < keys.length; i2++) {
    if (!current[keys[i2]]) {
      return default_value;
    }
    current = current[keys[i2]];
  }
  return current;
}
function setObjectProperty(obj, key, value) {
  const keys = key.split(".");
  let current = obj;
  for (let i2 = 0; i2 < keys.length - 1; i2++) {
    if (!current[keys[i2]]) {
      current[keys[i2]] = {};
    }
    current = current[keys[i2]];
  }
  current[keys[keys.length - 1]] = value;
  return obj;
}
function setObjectExistProperty(obj, key, value) {
  const keys = key.split(".");
  let current = obj;
  for (let key2 of keys) {
    if (!current[key2]) {
      break;
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
  return obj;
}
function downloadFileByData(data, filename, type) {
  var file = new Blob([data], { type });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else {
    var a = document.createElement("a"), url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
function downloadFileByUrl(url, filename) {
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}

// src/Page.js
var import_vue = require("vue");

// src/LocalStore.js
var LocalStore = class {
  constructor(name) {
    this.name = name || "LocalStore";
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
    if (!key && typeof key != "string") {
      return data;
    }
    return getObjectProperty(data, key, default_val);
  }
  set(key, value) {
    if (!key) return;
    if (typeof key == "string") {
      this.data = setObjectProperty(this.data, key, value);
    } else if (typeof key == "object") {
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
    if (typeof key == "string") {
      this.data = setObjectExistProperty(this.data, key, value);
    } else if (typeof key == "object") {
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
    let str = localStorage.getItem(this.name) || "";
    return new Blob([str]).size;
  }
};

// src/RangeTask.js
var RangeTask = class {
  constructor() {
    this.tasks = [];
    this.statusMap = /* @__PURE__ */ new Map();
  }
  add(range, success, fail) {
    const name = `task_${this.tasks.length}`;
    this.tasks.push({ name, range, success, fail });
  }
  addList(list) {
    list.forEach((item) => {
      this.add(item.range, item.success, item.fail);
    });
  }
  run(val) {
    this.tasks.forEach((task) => {
      const { name, range, success, fail } = task;
      if (val >= range[0] && val < range[1]) {
        if (!this.statusMap.has(name)) {
          this.statusMap.set(name, false);
        }
        if (this.statusMap.get(name) !== true) {
          success && success(val);
          this.statusMap.set(name, true);
        }
      } else {
        if (!this.statusMap.has(name)) {
          this.statusMap.set(name, true);
        }
        if (this.statusMap.get(name) !== false) {
          fail && fail(val);
          this.statusMap.set(name, false);
        }
      }
    });
  }
  destroy() {
    this.tasks = [];
    this.statusMap.clear();
  }
};

// src/Page.js
var LIVE_MAP = {
  onMounted: import_vue.onMounted,
  onBeforeMount: import_vue.onBeforeMount,
  onBeforeUpdate: import_vue.onBeforeUpdate,
  onUpdated: import_vue.onUpdated,
  onUnmounted: import_vue.onUnmounted,
  onBeforeUnmount: import_vue.onBeforeUnmount,
  onLoad: import_vue.onBeforeMount,
  onReady: import_vue.onMounted,
  onDestroy: import_vue.onUnmounted
};
function tryFunc(func, obj) {
  if (typeof func === "function") {
    try {
      func.call(obj);
    } catch (e) {
      console.log(e);
    }
  }
}
function createRef(val) {
  if (typeof val === "function") {
    return (0, import_vue.computed)(val);
  } else {
    return (0, import_vue.ref)(val);
  }
}
function createRefs(ctx, obj) {
  for (const key in obj) {
    ctx[key] = createRef(obj[key]);
  }
  return ctx;
}
function createFuns(ctx, obj) {
  for (const key in obj) {
    ctx[key] = typeof obj[key] === "function" ? obj[key] : () => obj[key];
  }
  return ctx;
}
var Page = class {
  constructor(localStoreName) {
    this.instance = (0, import_vue.getCurrentInstance)();
    const { props, emit, proxy } = this.instance;
    this.props = props;
    this.emit = emit;
    this.$ = new Proxy(
      { ...proxy },
      {
        get: (target, key) => {
          if (typeof key === "string" && key.indexOf("[getRef]") > -1) {
            key = key.replace("[getRef]", "");
            return target[key];
          }
          return (0, import_vue.isRef)(target[key]) ? target[key].value : target[key];
        },
        set: (target, key, value) => {
          if (typeof key === "string" && key.indexOf("[setRef]") > -1) {
            key = key.replace("[setRef]", "");
            target[key] = (0, import_vue.isRef)(value) ? value : createRef(value);
            return true;
          }
          if (key in target) {
            if ((0, import_vue.isRef)(target[key])) {
              target[key].value = value;
            } else {
              target[key] = value;
            }
          } else {
            target[key] = value;
          }
          return true;
        }
      }
    );
    this.router = (0, import_vue_router.useRouter)();
    this.callback = new Callback();
    this.rangeTask = new RangeTask();
    this.local = new LocalStore(localStoreName ? localStoreName : "app-page-store");
    (0, import_vue.onUnmounted)(() => this?.destroy());
  }
  // ref对象的配置、获取和设置
  setRefs(refs) {
    this.instance["proxy"] = createRefs(this.$, refs);
  }
  setRef(key, value) {
    let [head, ...others] = key.split(".");
    let ref_value = {};
    if (this.$ && head in this.$) {
      ref_value = this.$[head];
      this.$["[setRef]" + head] = others.length > 0 ? setObjectProperty(ref_value, others.join("."), value) : value;
    } else {
      this.instance["proxy"] = createRefs(this.$, { [key]: value });
    }
  }
  getRef(key) {
    return this.$["[getRef]" + key];
  }
  set(key, value) {
    let [head, ...others] = key.split(".");
    let ref_value = {};
    if (this.$ && head in this.$) {
      ref_value = this.$[head];
      this.$[head] = others.length > 0 ? setObjectProperty(ref_value, others.join("."), value) : value;
    } else {
      this.instance["proxy"] = createRefs(this.$, { [key]: value });
    }
  }
  get(key) {
    return this.$[key];
  }
  setFuns(funs) {
    this.instance["proxy"] = createFuns(this.$, funs);
  }
  setFun(key, value) {
    this.instance["proxy"] = createFuns(this.$, { [key]: value });
  }
  getFun(key) {
    return this.$[key];
  }
  // watch数据对象
  watch(ref_or_fun, callback) {
    (0, import_vue.watch)(ref_or_fun, (newValue, oldValue) => {
      if (typeof callback === "function") {
        callback(newValue, oldValue);
      } else {
        this.callback.run(callback, newValue, oldValue);
      }
    });
  }
  // watch数据对象
  watchRef(name, callback) {
    let [head, ...others] = name.split(".");
    if (!(this.$ && head in this.$)) {
      console.log(`refs\u4E2D\u6CA1\u6709\u8BE5${head}\uFF0C\u68C0\u67E5\u662F\u5426\u521D\u59CB\u5316\uFF01`);
      return;
    }
    (0, import_vue.watch)(
      () => {
        let ref_value = this.$[head];
        if (others.length) {
          for (let i2 = 0; i2 < others.length; i2++) {
            ref_value = ref_value[others[i2]];
          }
        }
        return ref_value;
      },
      (newValue, oldValue) => {
        if (typeof callback === "function") {
          callback(newValue, oldValue);
        } else {
          this.callback.run(callback, newValue, oldValue);
        }
      }
    );
  }
  // watch数据对象
  watchProps(name, callback) {
    if (!(this.props && name in this.props)) {
      console.log(`props\u4E2D\u6CA1\u6709\u8BE5${name}\uFF0C\u68C0\u67E5\u662F\u5426\u521D\u59CB\u5316\uFF01`);
      return;
    }
    (0, import_vue.watch)(
      this.props[name].value ? this.props[name] : () => this.props[name],
      (newValue, oldValue) => {
        if (typeof callback === "function") {
          callback(newValue, oldValue);
        } else {
          this.callback.run(callback, newValue, oldValue);
        }
      }
    );
  }
  // 生命周期的函数的配置和设置
  setLives(LIVE) {
    if (isObject(LIVE)) {
      for (let key in LIVE) {
        if (key in LIVE_MAP) {
          let func = LIVE[key];
          if (typeof func !== "function") {
            console.log(`${key}'s value need to be a function`);
            return;
          }
          LIVE_MAP[key](() => tryFunc(func, this));
        } else {
          console.log(`${key} is not a life function`);
        }
      }
    }
  }
  setLive(name, func) {
    if (typeof name === "string" && typeof func === "function") {
      if (name in LIVE_MAP) {
        if (typeof func !== "function") {
          console.log(`func need to be a function`);
          return;
        }
        LIVE_MAP[name](() => tryFunc(func, this));
      } else {
        console.log(`${name} is not a life function`);
      }
    }
  }
  destroy() {
    this.instance = null;
    this.props = null;
    this.emit = null;
    this.proxy = null;
    this.$ = null;
    this.router = null;
    this.local.free();
    this.local = null;
    this.rangeTask.destroy();
    this.rangeTask = null;
    this.callback.run("destroy");
    this.callback.destroy();
    this.callback = null;
  }
  binds(options) {
    for (let key in options) {
      const val = options[key];
      if (typeof val === "function") {
        this[key] = (...args) => val.call(this, ...args);
      } else {
        this[key] = val;
      }
    }
  }
  bind(key, val) {
    if (typeof key !== "string") return;
    if (typeof val === "function") {
      this[key] = (...args) => val.call(this, ...args);
    } else {
      this[key] = val;
    }
  }
};

// src/Tools.js
function goToUrl(url) {
  if (url == "" || url == "#" || url == void 0) {
    return;
  } else if (url.indexOf("[hard]") > -1) {
    url = url.replace("[hard]", "");
    document.location.href = url;
  } else {
    if (this?.router) {
      this.router.push({ path: url });
    } else {
      document.location.href = url;
    }
  }
}
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    this?.msg && this.msg.showMsg("\u590D\u5236\u6210\u529F", "success");
  } catch (err) {
    let result = await navigator.permissions.query({ name: "write-on-clipboard" });
    if (result.state == "granted" || result.state == "prompt") {
      this?.msg && this.msg.showMsg("\u6CA1\u6709\u6743\u9650", "fail");
    } else {
      this?.msg && this.msg.showMsg("\u590D\u5236\u5931\u8D25", "fail");
    }
  }
}
var Tools_default = {
  downloadFileByData,
  downloadFileByUrl,
  copyText,
  goToUrl
};

// src/templateParse.js
var import_vue2 = require("vue");
function isObject2(obj) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}
function cutString(string, piece) {
  const index = string.indexOf(piece);
  if (index !== -1) {
    const left = string.substring(0, index);
    const right = string.substring(index + piece.length);
    return { left, right };
  } else {
    return { left: string, right: "" };
  }
}
function templateToComponment({
  componentMap,
  template,
  props,
  events,
  mainClass = "dyComponent"
}) {
  let index = 0;
  const templates = template.split("\n");
  const vnode = [];
  templates.forEach((template2) => {
    if (!template2 || template2.trim() === "") {
      return;
    }
    const matchs = template2.match(/\{\{(.*?)\}\}/g);
    if (!matchs) {
      vnode.push((0, import_vue2.h)("div", { class: mainClass }, template2.trim()));
      return;
    }
    const children = [];
    let parseTemplate = template2;
    for (let i2 = 0; i2 < matchs?.length; i2++) {
      const instruction = matchs[i2].slice(2, -2);
      const [componentName, params] = getComponentByInstruction(instruction);
      let componentProps = {};
      let componentEvents = {};
      let component = componentMap?.[componentName];
      const { left, right } = cutString(parseTemplate, matchs[i2]);
      if (!component) {
        children.push((0, import_vue2.h)("span", {}, left + componentName));
        parseTemplate = right;
        continue;
      }
      if (!params) {
        if (typeof props === "function") {
          componentProps = props(index);
        } else if (Array.isArray(props) && props.length > index) {
          componentProps = props[index];
        } else if (isObject2(props)) {
          componentProps = props;
        }
        index++;
      }
      if (events) {
        for (let eventName of Object.keys(events)) {
          if (typeof events[eventName] === "function") {
            componentEvents[`on${eventName.slice(0, 1).toUpperCase() + eventName.slice(1)}`] = events[eventName];
          }
        }
      }
      if (left && left.trim()) {
        children.push((0, import_vue2.h)("span", {}, left));
      }
      if (typeof component === "function") {
        component = component(props);
      }
      children.push(
        (0, import_vue2.h)(component, {
          ...componentProps,
          ...componentEvents,
          ...params
        })
      );
      parseTemplate = right;
    }
    if (parseTemplate) {
      children.push((0, import_vue2.h)("span", {}, parseTemplate));
    }
    vnode.push((0, import_vue2.h)("div", { class: mainClass }, children));
  });
  return (0, import_vue2.defineComponent)({ render: () => vnode });
}
function getComponentByInstruction(instruction) {
  let componentName;
  let param = null;
  const matchs = instruction.match(/\([^)]*\)/g);
  if (!matchs) {
    componentName = instruction;
    return [componentName, param];
  }
  componentName = instruction.split(matchs[0])[0];
  const paramStr = matchs[0].slice(1, -1);
  param = {};
  if (paramStr.length > 0) {
    try {
      param = JSON.parse(paramStr);
    } catch (error) {
      param.text = paramStr;
    }
  }
  return [componentName, param];
}

// src/index.js
var src_default = Page;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Callback,
  LocalStore,
  Page,
  Tools,
  templateToComponment
});
