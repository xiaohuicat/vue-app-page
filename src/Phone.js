import { Callback } from './Callback.js';
import { ref, watch } from 'vue';

export class Phone {
  constructor(callbackDict = {}) {
    this.args;
    this.name;
    this.timestamp = ref(0);
    if (callbackDict) {
      this.callback = new Callback(callbackDict);
    }
  }
  call(name, ...args) {
    this.name = name;
    this.args = args.length === 1 ? args[0] : args;
    this.timestamp.value += 1;
  }
  destroy() {
    if (this.callback) {
      this.callback.destroy();
      this.callback = null;
    }

    this.args = null;
  }
}

class ReplyPhone {
  constructor(phone) {
    this.phone = phone instanceof Phone ? phone : null;
  }

  call(name, ...args) {
    if (!this.phone) {
      return false;
    }

    this.phone.callback.run(name, ...args);
    return true;
  }
}

/**
 * 监听电话
 * @param {Phone} phone props中传入的父组件phone对象
 * @param {Object} callback 子组件应答函数对象
 * @returns {ReplyPhone} 回复电话对象
 */
export function watchPhone(phone, callback) {
  function run(name, args, replyPhone) {
    if (!callback) {
      return;
    }

    if (callback instanceof Callback) {
      callback.run(name, args, replyPhone);
      return;
    }

    if (typeof callback === 'object' && name in callback) {
      callback[name](args, replyPhone);
      return;
    }

    if (typeof callback === 'function') {
      callback(args, replyPhone);
    }
  }

  const replyPhone = new ReplyPhone(phone);
  watch(
    () => phone?.timestamp?.value,
    () => {
      run(phone?.name, phone?.args, replyPhone);
    }
  );
  return replyPhone;
}
