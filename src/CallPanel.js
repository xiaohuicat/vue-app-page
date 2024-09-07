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
 * @param {CallPanel} callback 面板显示和隐藏的回调
 * @param {Object} props 组件的props
 */
export function watchPanelEvent (callback, props) {
  if (!(callback && callback instanceof Callback)) {
    throw new Error('callback must be an instance of Callback');
  }

  return watch(
    () => props.config.value.timestamp,
    () => {
      if (props.config.value.isShow) {
        callback
        && callback.run
        && callback.run('show', props.option.value, props.callback, props.config.value);
      } else {
        callback
        && callback.run
        && callback.run('hide', props.option.value, props.callback, props.config.value);
      }
    },
    { deep: true },
  );
};