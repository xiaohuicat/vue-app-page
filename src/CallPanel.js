import { Phone } from './Phone';
import { Callback } from './Callback';
import { watch } from 'vue';

export class CallPanel extends Phone {
  constructor(callbackDict) {
    super(callbackDict);
  }
  show(...args) {
    this.name = 'show';
    this.args = args.length === 1 ? args[0] : args;
    this.timestamp.value = Date.now();
  }

  hide(...args) {
    this.name = 'hide';
    this.args = args.length === 1 ? args[0] : args;
    this.timestamp.value = Date.now();
  }
}

class ReplyPanel {
  constructor(panel) {
    if (panel instanceof CallPanel) {
      this.panel = panel;
      this.callback = panel.callback;
      return;
    }
  }

  call(name, ...args) {
    if (!this?.panel) {
      return false;
    }

    this.callback.run(name, ...args);
    return true;
  }
}

/**
 * 监听面板
 * @param {CallPanel} panel props中传入的父组件panel对象
 * @param {Callback | Object} callback 子组件应答函数对象
 * @returns {ReplyPanel} 回复电话对象
 */
export function watchPanel(panel, callback) {
  function run(name, args, replyPanel) {
    if (!callback) {
      return;
    }

    if (callback instanceof Callback) {
      callback.run(name, args, replyPanel);
      return;
    }

    if (typeof callback === 'object' && name in callback) {
      callback[name](args, replyPanel);
      return;
    }

    if (typeof callback === 'function') {
      callback(args, replyPanel);
    }
  }
  const replyPanel = new ReplyPanel(panel);
  watch(
    () => panel?.timestamp?.value,
    () => {
      run(panel?.name, panel?.args, replyPanel);
    }
  );
  return replyPanel;
}
