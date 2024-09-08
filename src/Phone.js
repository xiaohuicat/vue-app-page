import { Callback } from './Callback.js';
import { ref, watch } from 'vue';

export class Phone {
  constructor(callbackDict) {
    this.args;
    this.name;
    this.callback = new Callback(callbackDict);
    this.timestamp = ref(Date.now());
  }
  call(name, args) {
    this.name = name;
    this.args = args;
    this.timestamp.value = Date.now();
  }
  destroy() {
    this.callback.destroy();
    this.callback = null;
    this.args = null;
    this.timestamp.value = null;
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
  function run(name, replyPhone, args) {
    if (!callback) {
      return;
    }

    if (callback instanceof Callback) {
      callback.run(name, replyPhone, ...args);
      return;
    }

    if (typeof callback === 'object' && name in callback) {
      callback[name](replyPhone, ...args);
      return;
    }

    if (typeof callback === 'function') {
      callback(replyPhone, ...args);
    }
  }

  const replyPhone = new ReplyPhone(phone);

  watch(
    () => phone?.timestamp?.value,
    () => {run(
      phone?.name,
      replyPhone,
      phone?.args
    )}
  );

  return replyPhone;
}