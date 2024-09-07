function bodyOverflow(isTrue) {
  document.body.setAttribute('style', isTrue ? 'overflow:hidden' : 'overflow:auto');
}

function render(dataList) {
  if (dataList.length > 0) {
    bodyOverflow(true);
  } else {
    bodyOverflow(false);
  }
}

class PageScroller {
  constructor() {
    this.allowList = [];
  }
  show(id) {
    if (this.allowList.indexOf(id) > -1) {
      return;
    }
    this.allowList.push(id);
    render(this.allowList);
  }
  hide(id) {
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

let pageScroller;
function getPageScroller() {
  if (!pageScroller) {
    pageScroller = new PageScroller();
  }
  return pageScroller;
}

function usePageScroller() {
  const id = Symbol();
  const scroller = getPageScroller();
  return {
    show: () => scroller.show(id),
    hide: () => scroller.hide(id),
    reset: () => scroller.reset()
  };
}

export { usePageScroller };
