export class RangeTask {
  constructor() {
    this.tasks = [];
    this.statusMap = new Map();
  }

  add(range, success, fail) {
    if (Array.isArray(range) && success === undefined && fail === undefined) {
      range.forEach((item) => {
        this.add(item.range, item.success, item.fail);
      });
      return;
    }

    const name = `task_${this.tasks.length}`;
    this.tasks.push({ name, range, success, fail });
  }

  run(val) {
    this.tasks.forEach((task) => {
      const { name, range, success, fail } = task;
      if (val >= range[0] && val < range[1]) {
        if (!this.statusMap.has(name)) {
          this.statusMap.set(name, false);
        }
        if (this.statusMap.get(name) !== true) {
          success && success(val);
          this.statusMap.set(name, true);
        }
      } else {
        if (!this.statusMap.has(name)) {
          this.statusMap.set(name, true);
        }
        if (this.statusMap.get(name) !== false) {
          fail && fail(val);
          this.statusMap.set(name, false);
        }
      }
    });
  }

  destroy() {
    this.tasks = [];
    this.statusMap.clear();
  }
}
