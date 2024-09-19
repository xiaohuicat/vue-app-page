# README.zh_CN.md
- en [English](README.md)
- zh_CN [简体中文](readme/README.zh_CN.md)

# 安装app-page

```shell
npm install app-page
```

# 初始化页面对象

```javascript
// 创建一个页面管理对象
import { Page } from 'app-page'
// 给你的应用创建一个页面管理对象
const page = new Page();
/**
 * 解构获取代理上下文，$是数据、函数等的代理对象，访问ref或computed变量可以自动解包。
 * 你可以通过$.name读取值，$.name = 100设置值
 * 如果你想要原始的ref，$['[getRef]name']读取，$['[getRef]name'] = ref(100)设置，但不建议设置，在VUE模板中会失去响应性。
 */
const { $ } = page;
```

# 设置响应式数据

```javascript
// 设置ref和computed
page.setRefs({
  num: 0,                  // 响应式数据ref
  total: () => $.num+'个',  // 计算属性computed
});
```

# 设置vue函数

```javascript
// 设置多个vue函数
page.setFuns({clear: () => { $.num = 0; }});
// 根据名称和对应的函数设置vue函数
page.setFun('double', () => { $.num = $.num*2; });
```

# 添加生命周期

```javascript
// 一次添加多个生命周期，可以多次添加，触发时按顺序执行
page.setLives({
  onReady(){setTimeout(() => $.num++, 3000);},  // 页面准备好了
  onDestroy(){() => { }}                        // 页面销毁前
})
// 添加一个生命周期
page.setLive('onLoad', func);
```

# 完整案例

在 `<script setup></script>`中使用

```javascript
import { Page } from 'app-page';
const page = new Page();
const { $ } = page;
page.setRefs({
  num: 0,                             // 响应式数据ref
  price: 100,                         // 响应式数据ref
  total: () => ($.num * $.price)+'元',  // 计算属性computed
});
page.setFuns({clear: () => { $.num = 0; }});
```

```html
<template>
  <div>数量：{{num}}</div>
  <div>单价：{{price}}</div>
  <div>总价：{{total}}</div>
  <button @click="clear">重置</button>
</template>
```

# 全局数据管理

1、在page中使用，默认使用的是app-page-store全局数据

```javascript
// 从默认的app-page-store读取数据
page.store.get('useId');
// 切换当前page对象的全局数据名称
page.useStore('app');
page.store.get('isLogin');
```

2、在项目初始化之前创建一个全局数据对象

```javascript
import { createStore } from 'app-page';
const store = createStore('app', {isLogin: false, user: null}, {
  setLogin(self, value) {
    self.set('isLogin', value);
  },
  setUser(self, value) {
    self.set('user', value);
  }
});
store.setLogin(true);
store.get('isLogin');
```

3、在其他页面中引入使用

```javascript
import { useStore } from 'app-page';
const appStore = useStore('app');
store.get('isLogin');
```

# 本地数据存储

1、在page中直接使用，默认使用的是app-page-store本地数据

```javascript
// 默认从本地数据app-page-store中获取
page.local.get('version');
// 获取本地数据page001中的name
page.local.setName('page001').get('name');
```

2、从app-page引入，实例化后使用。

```javascript
import { LocalStore } from 'app-page';
// 设置本地数据，id = 'page001'
const local = new LocalStore('page001');
// 更换数据名称，id = 'userInfo'
local.setName('userInfo');
// 获取本地数据
local.get(key);
// 设置本地数据
local.set(key, value);
// 保存本地数据，和set功能一样
local.save(key, value);
// 删除本地数据
local.delete(key);
// 清除数据
local.clear();
// 查看数据大小
local.size();
```

# 回调使用

1. 在page中直接使用，page.callback
2. 在CallPanel中直接使用，panel.callback
3. 从app-page引入，实例化后使用

```javascript
import { Callback } from 'app-page';
const callback = new Callback({'input': (text) => {}});
// 添加回调
callback.add('login', func);
// 覆盖回调
callback.set('login', func);
// 移除回调
callback.remove('login');
// 获取回调，返回一个函数列表
callback.get('login');
// 执行回调，没有挂载函数也可以安全执行
callback.run('login', params);
// 清空回调
callback.destroy();
```

# 消息提示

1. 在page中直接使用，page.tips
2. 从app-page引入tips

```javascript
import { tips } from 'app-page';
/**
 * tips(content, type, duration) 可输入三个参数
 * content: 提示内容
 * type: 类型'default'、'success'、'fail'、'warning'
 * duration: 显示时间秒，默认1.5s
 * */
page.tips('默认信息');
page.tips('成功信息', 'success');
page.tips('失败信息', 'fail', 3);

tips('默认信息');
tips('成功信息', 'success');
tips('失败信息', 'fail', 3);
```

# 禁止页面滚动
在弹窗弹出时，页面滚动被禁止，弹窗关闭时恢复。在页面对象page创建时自动调用useSrcoll可以直接使用page.scroll('stop'|'run')。原理是调用useSrcoll()时生成一个唯一的id，然后通过stop和run在模块内部列表中添加和移除这个id，最后判断列表是否为空，修改body的overflow属性实现。所以新增一层弹窗，需要运行一次useScroll函数，同一层的可以共用一个scroll。
1. 直接在page中使用

```javascript
// 允许滚动
page.scroll(true);
page.scroll('run');
// 禁止滚动
page.scroll(false);
page.scroll('stop');
```
2. 从app-page引入，实例化后使用
```javascript
import { useScroll } from 'app-page';
const scroll = useScroll();
// 禁止滚动
scroll.stop();
// 允许滚动
scroll.run();
```

# 父子传呼机
### 用于父子组件之间传递数据

父组件创建手机
```javascript
import { Phone } from 'app-page';
// 把允许儿子可以提的要求放进手机
const phone = new Phone({
  danger: (param) => page.tips(param),
  finish: (param) => page.tips(param),
});
// 告诉儿子更新数据
phone.call('update', {
  title: '标题',
});
```

子组件监听手机
```javascript
import { watchPhone } from 'app-page';
page.setRefs({title: ''});
// 父亲打电话要求更新的时候执行
function update(option, replyPhone) {
  $.title = option?.title;
  replyPhone.call('finish', '已经更新好了');
}
// 儿子要时刻盯着手机
const replyPhone = watchPhone(page.props.phone, {update});
// 有危险的时候告诉父亲
function injuried() {
  replyPhone.call('danger', '爸，有人打你儿子了');
}
```
