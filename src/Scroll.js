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

let scroller;
function getScroller() {
  if (!scroller) {
    scroller = new Scroller();
  }

  return scroller;
}

function useScroll() {
  const id = Symbol();
  const myScroller = getScroller();
  return {
    stop: () => myScroller.stop(id),
    run: () => myScroller.run(id),
    reset: () => myScroller.reset(),
  };
}

export { useScroll };
