import { Phone } from './Phone';
import { watch } from 'vue';

export class CallPanel extends Phone {
  constructor(callbackDict) {
    super(callbackDict);
  }
  show(option) {
    this.args = option;
    this.timestamp.value = Date.now();
  }

  hide(option) {
    this.args = option;
    this.timestamp.value = Date.now();
  }
}

class ReplyPanel {
  constructor(panel) {
    this.panel = panel instanceof CallPanel ? panel : null;
  }

  call(name, ...args) {
    if (!this.panel) {
      return false;
    }

    this.panel.callback.run(name, ...args);
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
  function run(name, replyPanel, args) {
    if (!callback) {
      return;
    }

    if (callback instanceof Callback) {
      callback.run(name, replyPanel, ...args);
      return;
    }

    if (typeof callback === 'object' && name in callback) {
      callback[name](replyPanel, ...args);
      return;
    }

    if (typeof callback === 'function') {
      callback(replyPanel, ...args);
    }
  }
  const replyPanel = new ReplyPanel(panel);
  watch(
    () => panel?.timestamp?.value,
    () => {run(
      panel?.name,
      replyPanel,
      phone?.args
    )}
  );
  return replyPanel;
}