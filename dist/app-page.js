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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));

// src/Callback.js
var Callback = class {
  constructor(callbackDict = {}) {
    this.callbackDict = {};
    if (!callbackDict && typeof callbackDict === "object") {
      Object.keys(callbackDict).forEach((each) => this.set(each, callbackDict[each]));
    }
  }
  // 添加回调函数，如果存在则覆盖
  set(name, func) {
    if (name === "string" && typeof func === "function") {
      this.callbackDict[name] = [func];
    }
    if (name === "string" && Array.isArray(func) && func.every((each) => typeof each === "function")) {
      this.callbackDict[name] = func;
    }
  }
  // 添加回调函数
  add(name, func) {
    if (typeof name === "string" && typeof func === "function") {
      if (name in this.callbackDict) {
        this.callbackDict[name].push(func);
      } else {
        this.callbackDict[name] = [func];
      }
      return;
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
  // 运行回调函数
  run(name, ...param) {
    return this.get(name).map((callback) => callback(...param));
  }
  // 移除回调函数
  remove(name) {
    if (typeof name === "string" && name in this.callbackDict) {
      delete this.callbackDict[name];
    }
  }
  // 销毁回调管理对象
  destroy() {
    this.callbackDict = {};
  }
};

// src/utils.js
function isObject(obj) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}
function setObjectProperty(obj, key, value) {
  const keys = key.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const keyPart = keys[i];
    const nextKeyPart = keys[i + 1];
    const isNextKeyPartArrayIndex = !isNaN(nextKeyPart);
    if (isNextKeyPartArrayIndex) {
      if (!Array.isArray(current[keyPart])) {
        current[keyPart] = [];
      }
    } else {
      if (typeof current[keyPart] !== "object" || current[keyPart] === null) {
        current[keyPart] = {};
      }
    }
    current = current[keyPart];
  }
  const finalKeyPart = keys[keys.length - 1];
  current[finalKeyPart] = value;
  return obj;
}

// node_modules/.store/vue@3.4.38/node_modules/vue/dist/vue.runtime.esm-bundler.js
var vue_runtime_esm_bundler_exports = {};
__export(vue_runtime_esm_bundler_exports, {
  compile: () => compile
});
__reExport(vue_runtime_esm_bundler_exports, runtime_dom_star);
import { initCustomFormatter, warn } from "@vue/runtime-dom";
import * as runtime_dom_star from "@vue/runtime-dom";
function initDev() {
  {
    initCustomFormatter();
  }
}
if (true) {
  initDev();
}
var compile = () => {
  if (true) {
    warn(
      `Runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
    );
  }
};

// src/LocalStore.js
function verifiedString(string) {
  return typeof string === "string" && string.trim() !== "";
}
var LocalStore = class {
  constructor(name) {
    this.name = name || "LocalStore";
  }
  get(key, default_val) {
    let data = {};
    try {
      data = JSON.parse(localStorage.getItem(this.name)) || {};
    } catch (err) {
    }
    if (!verifiedString(key)) {
      return data;
    }
    if (typeof data === "object" && data !== null && key in data) {
      return data[key];
    }
    return default_val;
  }
  set(key, value) {
    if (verifiedString(key)) {
      const data = this.get();
      data[key] = value;
      localStorage[this.name] = JSON.stringify(data);
    } else if (key && typeof key == "object") {
      Object.keys(key).forEach((each) => this.set(each, key[each]));
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
    const str = localStorage.getItem(this.name) || "";
    return new TextEncoder().encode(str).length;
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
  onMounted: vue_runtime_esm_bundler_exports.onMounted,
  onBeforeMount: vue_runtime_esm_bundler_exports.onBeforeMount,
  onBeforeUpdate: vue_runtime_esm_bundler_exports.onBeforeUpdate,
  onUpdated: vue_runtime_esm_bundler_exports.onUpdated,
  onUnmounted: vue_runtime_esm_bundler_exports.onUnmounted,
  onBeforeUnmount: vue_runtime_esm_bundler_exports.onBeforeUnmount,
  onLoad: vue_runtime_esm_bundler_exports.onBeforeMount,
  onReady: vue_runtime_esm_bundler_exports.onMounted,
  onDestroy: vue_runtime_esm_bundler_exports.onUnmounted
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
    return (0, vue_runtime_esm_bundler_exports.computed)(val);
  } else {
    return (0, vue_runtime_esm_bundler_exports.ref)(val);
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
    this.instance = (0, vue_runtime_esm_bundler_exports.getCurrentInstance)();
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
          return (0, vue_runtime_esm_bundler_exports.isRef)(target[key]) ? target[key].value : target[key];
        },
        set: (target, key, value) => {
          if (typeof key === "string" && key.indexOf("[setRef]") > -1) {
            key = key.replace("[setRef]", "");
            target[key] = (0, vue_runtime_esm_bundler_exports.isRef)(value) ? value : createRef(value);
            return true;
          }
          if (key in target) {
            if ((0, vue_runtime_esm_bundler_exports.isRef)(target[key])) {
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
    this.callback = new Callback();
    this.rangeTask = new RangeTask();
    this.local = new LocalStore(localStoreName ? localStoreName : "app-page-store");
    (0, vue_runtime_esm_bundler_exports.onUnmounted)(() => this?.destroy());
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
    (0, vue_runtime_esm_bundler_exports.watch)(ref_or_fun, (newValue, oldValue) => {
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
    (0, vue_runtime_esm_bundler_exports.watch)(
      () => {
        let ref_value = this.$[head];
        if (others.length) {
          for (let i = 0; i < others.length; i++) {
            ref_value = ref_value[others[i]];
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
    (0, vue_runtime_esm_bundler_exports.watch)(
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
var Tools_default = {
  downloadFileByData,
  downloadFileByUrl,
  copyText,
  goToUrl
};

// src/templateParse.js
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
      vnode.push((0, vue_runtime_esm_bundler_exports.h)("div", { class: mainClass }, template2.trim()));
      return;
    }
    const children = [];
    let parseTemplate = template2;
    for (let i = 0; i < matchs?.length; i++) {
      const instruction = matchs[i].slice(2, -2);
      const [componentName, params] = getComponentByInstruction(instruction);
      let componentProps = {};
      let componentEvents = {};
      let component = componentMap?.[componentName];
      const { left, right } = cutString(parseTemplate, matchs[i]);
      if (!component) {
        children.push((0, vue_runtime_esm_bundler_exports.h)("span", {}, left + componentName));
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
        children.push((0, vue_runtime_esm_bundler_exports.h)("span", {}, left));
      }
      if (typeof component === "function") {
        component = component(props);
      }
      children.push(
        (0, vue_runtime_esm_bundler_exports.h)(component, {
          ...componentProps,
          ...componentEvents,
          ...params
        })
      );
      parseTemplate = right;
    }
    if (parseTemplate) {
      children.push((0, vue_runtime_esm_bundler_exports.h)("span", {}, parseTemplate));
    }
    vnode.push((0, vue_runtime_esm_bundler_exports.h)("div", { class: mainClass }, children));
  });
  return (0, vue_runtime_esm_bundler_exports.defineComponent)({ render: () => vnode });
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
export {
  Callback,
  LocalStore,
  Page,
  Tools_default as Tools,
  src_default as default,
  templateToComponment
};
/*! Bundled license information:

vue/dist/vue.runtime.esm-bundler.js:
  (**
  * vue v3.4.38
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
*/
