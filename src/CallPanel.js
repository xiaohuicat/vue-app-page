import { Callback } from './Callback.js';
import { ref, watch } from 'vue';

export class CallPanel {
  constructor(id) {
    this.callback = new Callback();
    this.option = ref({});
    this.config = ref({
      timestamp: Date.now(),
      isShow: false,
      id: id,
    });
  }
  show(option) {
    this.option.value = option;
    this.config.value = {
      timestamp: Date.now(),
      isShow: true,
    };
  }

  hide() {
    this.config.value = {
      timestamp: Date.now(),
      isShow: false,
    };
  }

  destroy() {
    this.callback.destroy();
    this.callback = null;
    this.option.value = null;
    this.config.value = null;
  }
}

/**
 * 监听面板事件
 * @param {CallPanel} props 面板显示和隐藏的回调
 * @param {Object} callback 组件的props
 */
export function watchPanelEvent (props, callback) {
  function run(name, panelOption, panelCallback, panelConfig) {
    if (!callback) {
      return;
    }

    if (callback instanceof CallPanel) {
      callback.run(name, panelOption, panelCallback, panelConfig);
      return;
    }

    if (typeof callback === 'object' && name in callback) {
      callback[name](panelOption, panelCallback, panelConfig);
      return;
    }

    if (typeof callback === 'function') {
      callback(panelOption, panelCallback, panelConfig);
    }
  }

  return watch(
    () => props?.config?.value?.timestamp,
    () => {
      run(
        props?.config?.value?.isShow ? 'show' : 'hide',
        props?.option?.value,
        props?.callback,
        props?.config?.value
      );
    },
    { deep: true },
  );
};