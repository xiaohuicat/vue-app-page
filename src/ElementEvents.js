import { Callback } from './Callback';

function getElement(element) {
  if (typeof element === 'string') {
    return document.querySelector(element);
  }
  return element;
}

const default_events = {
  scroll: (dom) => {
    const height = dom.documentElement.scrollHeight - dom.documentElement.clientHeight;
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    return {
      progress: Math.round((scrollTop / height) * 100)
    };
  }
};

function default_func(name, dom) {
  if (name in default_events) {
    return default_events[name](dom);
  }
}

export class ElementEvents {
  constructor(element, register) {
    this.element = getElement(element);
    this.register = register;
    this.callback = new Callback();
    this.map = new Map();
    this.debounceMap = new Map();
    this.init();
  }
  init() {
    for (let name in this.register) {
      if (!this.register[name]['func']) {
        continue;
      }

      this.addEvent(name, this.register[name]['func']);
    }
  }
  addEvent(name, func) {
    this.callback.add(name, func);
    const event = this.event(name);
    this.element.addEventListener(name, event);
    this.map.set(name, event);
  }
  removeEvent(name) {
    const event = this.map.get(name);
    if (!event) {
      return;
    }
    this.callback.remove(name);
    this.element.removeEventListener(name, event);
    this.map.delete(name);
  }
  event(name) {
    return () => {
      if (!(name in this.register)) return;

      if ('throttle' in this.register[name]) {
        if (this.debounceMap.has(name)) {
          if (Date.now() - this.debounceMap.get(name) < this.register[name].throttle) {
            return;
          }
        }
        this.debounceMap.set(name, Date.now());
      }

      const param = default_func(name, this.element);
      this.callback.run(name, this.element, param);
    };
  }
  destroy() {
    this.map.forEach((event, name) => {
      this.element.removeEventListener(name, event);
    });
    this.map.clear();
    this.map = null;
    this.debounceMap.clear();
    this.debounceMap = null;
    this.register = null;
    this.element = null;
    this.callback.destroy();
    this.callback = null;
  }
}
