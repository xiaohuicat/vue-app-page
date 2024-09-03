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
// 解构获取代理上下文，$是数据、函数等的代理对象，访问ref或computed变量可以自动解包。
// 你可以通过$.name读取值，$.name = 100设置值。
// 如果你想要原始的ref，$['[getRef]name']读取，$['[getRef]name'] = ref(100)设置，但不建议设置，在VUE模板中会失去响应性。
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
const page = new Page;
const { $ } = page;
page.setRefs({
  num: 0,                   // 响应式数据ref
  price: 100,               // 响应式数据ref
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
```javascript
// 获取本地数据
page.local.get(key);
// 设置本地数据
page.local.set(key, value);
// 删除本地数据
page.local.delete(key);
// 清除数据
page.local.clear();
// 查看数据大小
page.local.size();
```

# 回调使用
```javascript
// 添加回调
page.callback.add('login', func);
// 覆盖回调
page.callback.set('login', func);
// 移除回调
page.callback.remove('login');
// 获取回调，返回一个函数列表
page.callback.get('login');
// 执行回调，没有挂载函数也可以安全执行
page.callback.run('login', params);
// 清空回调
page.callback.destroy();
