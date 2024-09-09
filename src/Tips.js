const STYLE = `\
#app-page-tips-container {
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  z-index: 1000000001;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
}

#app-page-tips-container .app-page-tips {
  position: relative;
  max-width: 660px;
  width: auto;
  height: auto;
  display: block;
  padding: 10px 12px;
  margin: 15px;
  border-radius: 8px;
  color: #f1f1f1;
  word-break: break-all;
  background-color: #4d4d4d;
  transition: all .3s ease;
}

#app-page-tips-container .msg-default {
  color: #f1f1f1;
  background-color: #4d4d4d;
}

#app-page-tips-container .msg-success {
  color: #fff;
  background-color: #28be28;
}

#app-page-tips-container .msg-fail {
  color: #fff;
  background-color: #e64035;
}

#app-page-tips-container .msg-warning {
  color: #fff;
  background-color: #eaa640;
}

#app-page-tips-container .msg-hide {
  display: none;
}
`;

/* 提醒消息类
show方法传入两个参数，消息内容（content）和消息样式（style）均为字符串
style的值可取一下四种 'default'、'success'、'fail'、'warning'
duration为消息显示时长，单位为秒，默认为1.5秒 */
class Tips {
  constructor() {
    this.id = 'app-page-tips';
    this.container;
    this.inner;
    this.style;
  }

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.setAttribute('id', this.id + '-container');
      document.body.appendChild(this.container);
      this.inner = document.createElement('div');
      this.inner.setAttribute('class', 'app-page-tips');
      this.container.appendChild(this.inner);
    }

    if (!this.style) {
      this.style = document.createElement('style');
      this.style.setAttribute('type', 'text/css');
      this.style.setAttribute(this.id + '-style', '');
      this.style.innerHTML = STYLE;
      document.head.appendChild(this.style);
    }
  }

  tips(content, style = 'default', duration = 1.5) {
    if (!this.div) this.init();
    clearTimeout(this.timer);
    this.inner.setAttribute('class', `app-page-tips msg-${style}`);
    this.inner.innerHTML = content;
    this.timer = setTimeout(() => {
      this.inner.setAttribute('class', 'app-page-tips msg-hide');
    }, duration * 1000);
  }

  destory() {
    this.id == null;
    this.inner && document.body.removeChild(this.inner);
    this.container && document.body.removeChild(this.container);
    this.style && document.head.removeChild(this.style);
  }
}

let msg;
function useTips() {
  if (!msg || msg.id === null) {
    msg = new Tips();
  }

  return msg;
}

function tips(text, type = 'default', duration = 1.5) {
  useTips().tips(text, type, duration);
}

export { useTips, tips };
