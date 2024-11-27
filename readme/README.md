# Install app-page

```shell
npm install app-page
```

# Initialize Page Object

```javascript
// Create a page management object
import { Page } from 'app-page'
// Create a page management object for your app
const page = new Page();
/**
 * Destructure to get the proxy context, $ is the proxy object for data, functions, etc. Accessing ref or computed variables will automatically unwrap them.
 * You can read the value using $.name, and set the value using $.name = 100.
 * If you want the raw ref, use $['[getRef]name'] to read, and $['[getRef]name'] = ref(100) to set, though setting this way is not recommended as it will lose reactivity in the VUE template.
 */
const { $ } = page;
```

# Set Reactive Data

```javascript
// Set ref and computed
page.setRefs({
  num: 0,                       // Reactive data (ref)
  total: () => $.num + ' units',  // Computed property
});
```

# Set Vue Functions

```javascript
// Set multiple Vue functions
page.setFuns({clear: () => { $.num = 0; }});
// Set a Vue function by name and corresponding function
page.setFun('double', () => { $.num = $.num*2; });
```

# Add Lifecycle Hooks

```javascript
// Add multiple lifecycle hooks. You can add them multiple times, and they will execute in sequence when triggered.
page.setLives({
  onReady(){setTimeout(() => $.num++, 3000);},  // When the page is ready
  onDestroy(){() => { }}                        // Before the page is destroyed
})
// Add a single lifecycle hook
page.setLive('onLoad', func);
```

# Full Example

Used within `<script setup></script>`

```javascript
import { Page } from 'app-page';
const page = new Page();
const { $ } = page;
page.setRefs({
  num: 0,                                  // Reactive data (ref)
  price: 100,                              // Reactive data (ref)
  total: () => ($.num * $.price)+' Yuan',  // Computed property
});
page.setFuns({clear: () => { $.num = 0; }});
```

```html
<template>
  <div>Quantity: {{num}}</div>
  <div>Price: {{price}}</div>
  <div>Total: {{total}}</div>
  <button @click="clear">Reset</button>
</template>
```

# Global Data Management

1. Use within the page. By default, the global data is managed by `app-page-store`.

```javascript
// Read data from the default app-page-store
page.store.get('useId');
// Switch the global data name for the current page object
page.useStore('app');
page.store.get('isLogin');
```

2. Create a global data object before initializing the project.

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

3. Import and use in other pages.

```javascript
import { useStore } from 'app-page';
const appStore = useStore('app');
store.get('isLogin');
```

# Local Data Storage

1. Use directly within the page, using the `app-page-store` for local data by default.

```javascript
// By default, get data from local storage in app-page-store
page.local.get('version');
// Get data from 'page001' and fetch 'name'
page.local.setName('page001').get('name');
```

2. Import from app-page and use after instantiation.

```javascript
import { LocalStore } from 'app-page';
// Set local data with id = 'page001'
const local = new LocalStore('page001');
// Change the data name, id = 'userInfo'
local.setName('userInfo');
// Retrieve local data
local.get(key);
// Set local data
local.set(key, value);
// Save local data, same as set
local.save(key, value);
// Delete local data
local.delete(key);
// Clear all data
local.clear();
// Check data size
local.size();
```

# Callback Usage

1. Use directly within the page as `page.callback`.
2. Use directly in CallPanel as `panel.callback`.
3. Import from `app-page` and instantiate for use.

```javascript
import { Callback } from 'app-page';
const callback = new Callback({'input': (text) => {}});
// Add a callback
callback.add('login', func);
// Overwrite callback
callback.set('login', func);
// Remove callback
callback.remove('login');
// Get callbacks, returns a list of functions
callback.get('login');
// Execute callback, safe to run even if no function is mounted
callback.run('login', params);
// Clear callbacks
callback.destroy();
```

# Message Notifications

1. Use directly within the page as `page.tips`.
2. Import `tips` from `app-page`.

```javascript
import { tips } from 'app-page';
/**
 * tips(content, type, duration) accepts three parameters:
 * content: Message content
 * type: Type: 'default', 'success', 'fail', 'warning'
 * duration: Duration in seconds, default is 1.5s
 */
page.tips('Default message');
page.tips('Success message', 'success');
page.tips('Fail message', 'fail', 3);

tips('Default message');
tips('Success message', 'success');
tips('Fail message', 'fail', 3);
+
```

# Disable Page Scrolling
When a popup appears, the page scroll is disabled, and it is restored when the popup closes. By calling `useScroll` when the page object `page` is created, you can use `page.scroll('stop'|'run')` directly. The principle is that when `useScroll()` is called, a unique ID is generated. Using `stop` and `run`, the ID is added or removed from the module’s internal list. Finally, if the list is empty, the body’s `overflow` property is modified to disable scrolling. Therefore, if a new layer of popup is added, you need to call `useScroll` again, but popups on the same layer can share the same scroll.
1. Use directly within the page.

```javascript
// Enable scrolling
page.scroll(true);
page.scroll('run');
// Disable scrolling
page.scroll(false);
page.scroll('stop');
```
2. Import from `app-page` and instantiate for use.
```javascript
import { useScroll } from 'app-page';
const scroll = useScroll();
// Disable scrolling
scroll.stop();
// Enable scrolling
scroll.run();
```

# Parent-Child Communicator
### Used for data transfer between parent and child components

The parent component creates a phone.
```javascript
import { Phone } from 'app-page';
// Add requests the child can make into the phone
const phone = new Phone({
  danger: (param) => page.tips(param),
  finish: (param) => page.tips(param),
});
// Tell the child to update data
phone.call('update', {
  title: 'Title',
});
```

The child component listens to the phone.
```javascript
import { watchPhone } from 'app-page';
page.setRefs({title: ''});
// When the parent calls to update, execute this
function update(option, replyPhone) {
  $.title = option?.title;
  replyPhone.call('finish', 'Updated successfully');
}
// The child should always keep an eye on the phone
const replyPhone = watchPhone(page.props.phone, {update});
// Notify the parent when in danger
function injuried() {
  replyPhone.call('danger', 'Dad, someone hit me');
}
```
