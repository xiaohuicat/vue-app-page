/**
 * 滚动控制
 * @param {Boolean} isTrue 是否禁止滚动
 * @returns {void}
 */
function bodyOverflow(isTrue) {
  document.body.setAttribute('style', isTrue ? 'overflow:hidden' : 'overflow:auto');
}

/**
 * 渲染滚动状态
 * @param {Array} dataList 滚动列表
 * @returns {void}
 */
function render(dataList) {
  if (dataList.length > 0) {
    bodyOverflow(true);
  } else {
    bodyOverflow(false);
  }
}

class Scroller {
  constructor() {
    this.allowList = [];
  }
  stop(id) {
    if (this.allowList.indexOf(id) > -1) {
      return;
    }
    this.allowList.push(id);
    render(this.allowList);
  }
  run(id) {
    let index = this.allowList.indexOf(id);
    if (index === -1) return;
    this.allowList.splice(index, 1);
    render(this.allowList);
  }
  reset() {
    this.allowList = [];
    render(this.allowList);
  }
}

// 创建一个滚动控制实例
let scroller;
/**
 * 获取滚动控制实例
 * @returns {Scroller}
 */
function getScroller() {
  if (!scroller) {
    scroller = new Scroller();
  }

  return scroller;
}

/**
 * 获取滚动控制实例
 * @returns {Object}
 */
function useScroll() {
  const id = Symbol();
  const myScroller = getScroller();
  return {
    stop: () => myScroller.stop(id),
    run: () => myScroller.run(id),
    reset: () => myScroller.reset()
  };
}

export { useScroll };
