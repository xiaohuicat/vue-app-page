import { Callback } from './Callback';
import { isObject, setObjectProperty } from './utils';
import {
  onMounted,
  onBeforeUnmount,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  getCurrentInstance,
  watch,
  isRef,
  ref,
  computed
} from 'vue';
import { LocalStore } from './LocalStore';
import { useTips } from './Tips';
import { useScroll } from './Scroll';
import { createStore, useStore } from './Store';

const LIVE_MAP = {
  onMounted,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
  onUnmounted,
  onBeforeUnmount,
  onLoad: onBeforeMount,
  onReady: onMounted,
  onDestroy: onUnmounted
};

function tryFunc(func, obj) {
  if (typeof func === 'function') {
    try {
      func.call(obj);
    } catch (e) {
      console.log(e);
    }
  }
}

function createRef(val) {
  if (typeof val === 'function') {
    return computed(val);
  } else {
    return ref(val);
  }
}

function createRefs(ctx, obj) {
  for (const key in obj) {
    ctx[key] = createRef(obj[key]);
  }

  return ctx;
}

export function createFuns(ctx, obj) {
  for (const key in obj) {
    ctx[key] = typeof obj[key] === 'function' ? obj[key] : () => obj[key];
  }

  return ctx;
}

export class Page {
  constructor(localStoreName) {
    this.instance = getCurrentInstance();
    const { props, emit, proxy } = this.instance;
    this.props = props;
    this.emit = emit;
    this.$ = new Proxy(
      { ...proxy },
      {
        get: (target, key) => {
          if (typeof key === 'string' && key.indexOf('[getRef]') > -1) {
            key = key.replace('[getRef]', '');
            return target[key];
          }

          return isRef(target[key]) ? target[key].value : target[key];
        },
        set: (target, key, value) => {
          if (typeof key === 'string' && key.indexOf('[setRef]') > -1) {
            key = key.replace('[setRef]', '');
            target[key] = isRef(value) ? value : createRef(value);
            return true;
          }

          if (key in target) {
            if (isRef(target[key])) {
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

    this.pageScroller = useScroll();
    this.callback = new Callback();
    this.local = new LocalStore(localStoreName ? localStoreName : 'app-page-store');
    this.store = useStore(localStoreName ? localStoreName : 'app-page-store');
  }

  // ref对象的配置、获取和设置
  setRefs(refs) {
    this.instance['proxy'] = createRefs(this.$, refs);
  }

  setRef(key, value) {
    let [head, ...others] = key.split('.');
    let ref_value = {};
    if (this.$ && head in this.$) {
      ref_value = this.$[head];
      this.$['[setRef]' + head] =
        others.length > 0 ? setObjectProperty(ref_value, others.join('.'), value) : value;
    } else {
      this.instance['proxy'] = createRefs(this.$, { [key]: value });
    }
  }

  getRef(key) {
    return this.$['[getRef]' + key];
  }

  set(key, value) {
    let [head, ...others] = key.split('.');
    let ref_value = {};
    if (this.$ && head in this.$) {
      ref_value = this.$[head];
      this.$[head] =
        others.length > 0 ? setObjectProperty(ref_value, others.join('.'), value) : value;
    } else {
      this.instance['proxy'] = createRefs(this.$, { [key]: value });
    }
  }

  get(key) {
    return this.$[key];
  }
  setFuns(funs) {
    this.instance['proxy'] = createFuns(this.$, funs);
  }

  setFun(key, value) {
    this.instance['proxy'] = createFuns(this.$, { [key]: value });
  }

  getFun(key) {
    return this.$[key];
  }

  // watch数据对象
  watch(ref_or_fun, callback) {
    watch(ref_or_fun, (newValue, oldValue) => {
      if (typeof callback === 'function') {
        callback(newValue, oldValue);
      } else {
        this.callback.run(callback, newValue, oldValue);
      }
    });
  }

  // watch数据对象
  watchRef(name, callback) {
    let [head, ...others] = name.split('.');
    if (!(this.$ && head in this.$)) {
      console.log(`refs中没有该${head}，检查是否初始化！`);
      return;
    }

    watch(
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
        if (typeof callback === 'function') {
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
      console.log(`props中没有该${name}，检查是否初始化！`);
      return;
    }
    watch(
      this.props[name].value ? this.props[name] : () => this.props[name],
      (newValue, oldValue) => {
        if (typeof callback === 'function') {
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
          if (typeof func !== 'function') {
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
    if (typeof name === 'string' && typeof func === 'function') {
      if (name in LIVE_MAP) {
        if (typeof func !== 'function') {
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
    this.local = null;
    this.callback.run('destroy');
    this.callback.destroy();
    this.callback = null;
    this.pageScroller = null;
    this.store = null;
  }

  binds(options) {
    for (let key in options) {
      const val = options[key];
      if (typeof val === 'function') {
        this[key] = (...args) => val.call(this, ...args);
      } else {
        this[key] = val;
      }
    }
  }

  bind(key, val) {
    if (typeof key !== 'string') return;
    if (typeof val === 'function') {
      this[key] = (...args) => val.call(this, ...args);
    } else {
      this[key] = val;
    }
  }

  tips(text, type = 'default', duration = 1.5) {
    useTips().tips(text, type, duration);
  }

  useStore(name) {
    this.store = useStore(name);
    return this.store;
  }

  createStore(name, events) {
    this.store = createStore(name, events);
    return this.store;
  }

  scroll(status) {
    if (typeof status === 'boolean') {
      status ? this.pageScroller.run() : this.pageScroller.stop();
      return;
    }

    if (typeof status === 'string' && ['stop', 'run'].indexOf(status) > -1) {
      status === 'stop' ? this.pageScroller.stop() : this.pageScroller.run();
      return;
    }
  }
}
