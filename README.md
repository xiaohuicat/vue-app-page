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
在<script setup></script>中使用
```javascript
import { Page } from 'app-page';
const page = new Page();
const { $ } = page;
page.setRefs({
  num: 0,                             // 响应式数据ref
  price: 100,                         // 响应式数据ref
  total: () => ($.num*$.price)+'元',  // 计算属性computed
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

# 数据加载
1、在page中直接使用，page.local
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
const store = new LocalStore('page001');
// 更换数据名称，id = 'userInfo'
store.setName('userInfo');
// 获取本地数据
store.get(key);
// 设置本地数据
store.set(key, value);
// 保存本地数据，和set功能一样
store.save(key, value);
// 删除本地数据
store.delete(key);
// 清除数据
store.clear();
// 查看数据大小
store.size();
```

# 回调使用
1、在page中直接使用，page.callback
2、在CallPanel中直接使用，panel.callback
3、从app-page引入，实例化后使用。
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
1、在page中直接使用，page.tips
2、从app-page引入tips
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

# 显示隐藏面板
父组件创建一个面板管理对象
```javascript
import { CallPanel } from 'app-page';
const panel = new CallPanel();
panel.callback.add('confirm', (param) => page.tips(param));
// 父组件显示弹窗面板
function showPanel() {
  panel.show({
    title: '标题',
    content: '内容',
  });
}
```

子组件监听事件
```javascript
import { watchPanelEvent } from 'app-page';
page.setRefs({
  isShow: false,
  title: '',
  content: '',
});
let fatherCallback;
// 父组件要求显示
function show(option, callback, config) {
  $.isShow = true;
  $.title = option?.title;
  $.content = option?.content;
  fatherCallback = callback;
}
// 父组件要求隐藏
function hide(option, callback, config) {
  $.isShow = false;
  fatherCallback = null;
}
watchPanelEvent(page.props.panel, {show, hide});

function confirm() {
  fatherCallback && fatherCallback.run('confirm', '点击了确定');
}
```