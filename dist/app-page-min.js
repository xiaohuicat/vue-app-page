var L=Object.defineProperty;var I=Object.getOwnPropertyDescriptor;var J=Object.getOwnPropertyNames;var K=Object.prototype.hasOwnProperty;var z=(s,t)=>{for(var e in t)L(s,e,{get:t[e],enumerable:!0})},P=(s,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of J(t))!K.call(s,n)&&n!==e&&L(s,n,{get:()=>t[n],enumerable:!(i=I(t,n))||i.enumerable});return s},m=(s,t,e)=>(P(s,t,"default"),e&&P(e,t,"default"));var h=class{constructor(t={}){this.callbackDict={},t&&typeof t=="object"&&Object.keys(t).forEach(e=>this.set(e,t[e]))}set(t,e){typeof t=="string"&&typeof e=="function"&&(this.callbackDict[t]=[e]),typeof t=="string"&&Array.isArray(e)&&e.every(i=>typeof i=="function")&&(this.callbackDict[t]=e)}add(t,e){if(typeof t=="string"&&typeof e=="function"){t in this.callbackDict?this.callbackDict[t].push(e):this.callbackDict[t]=[e];return}typeof t=="object"&&Object.keys(t).forEach(i=>{this.add(i,t[i])})}get(t){let e=this.callbackDict[t];return e?Array.isArray(e)?e:[e]:[]}run(t,...e){return this.get(t).map(i=>i(...e))}remove(t){typeof t=="string"&&t in this.callbackDict&&delete this.callbackDict[t]}destroy(){this.callbackDict={}}};function U(s){return s!==null&&typeof s=="object"&&!Array.isArray(s)}function R(s,t,e){let i=t.split("."),n=s;for(let c=0;c<i.length-1;c++){let a=i[c],f=i[c+1];!isNaN(f)?Array.isArray(n[a])||(n[a]=[]):(typeof n[a]!="object"||n[a]===null)&&(n[a]={}),n=n[a]}let r=i[i.length-1];return n[r]=e,s}var o={};z(o,{compile:()=>H});m(o,at);import{initCustomFormatter as rt}from"@vue/runtime-dom";import*as at from"@vue/runtime-dom";var H=()=>{};function S(s){return typeof s=="string"&&s.trim()!==""}var g=class{constructor(t){this.name=t||"LocalStore"}get(t,e){let i={};try{i=JSON.parse(localStorage.getItem(this.name))||{}}catch{}return S(t)?typeof i=="object"&&i!==null&&t in i?i[t]:e:i}set(t,e){if(S(t)){let i=this.get();i[t]=e,localStorage[this.name]=JSON.stringify(i)}else t&&typeof t=="object"&&Object.keys(t).forEach(i=>this.set(i,t[i]))}delete(t){if(!S(t))return;let e=this.get();t in e&&delete e[t],localStorage[this.name]=JSON.stringify(e)}clear(){delete localStorage.removeItem(this.name)}save(t,e){this.set(t,e)}size(){let t=localStorage.getItem(this.name)||"";return new TextEncoder().encode(t).length}};var v=class{constructor(){this.tasks=[],this.statusMap=new Map}add(t,e,i){let n=`task_${this.tasks.length}`;this.tasks.push({name:n,range:t,success:e,fail:i})}addList(t){t.forEach(e=>{this.add(e.range,e.success,e.fail)})}run(t){this.tasks.forEach(e=>{let{name:i,range:n,success:r,fail:c}=e;t>=n[0]&&t<n[1]?(this.statusMap.has(i)||this.statusMap.set(i,!1),this.statusMap.get(i)!==!0&&(r&&r(t),this.statusMap.set(i,!0))):(this.statusMap.has(i)||this.statusMap.set(i,!0),this.statusMap.get(i)!==!1&&(c&&c(t),this.statusMap.set(i,!1)))})}destroy(){this.tasks=[],this.statusMap.clear()}};var E=class{constructor(){this.id="app-page-tips",this.container,this.inner,this.style}init(){this.container||(this.container=document.createElement("div"),this.container.setAttribute("id",this.id+"-container"),document.body.appendChild(this.container),this.inner=document.createElement("div"),this.inner.setAttribute("class","app-page-tips"),this.container.appendChild(this.inner)),this.style||(this.style=document.createElement("style"),this.style.setAttribute("type","text/css"),this.style.setAttribute(this.id+"-style",""),this.style.innerHTML=`
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
`,document.head.appendChild(this.style))}show(t,e="default",i=1.5){this.div||this.init(),clearTimeout(this.timer),this.inner.setAttribute("class",`app-page-tips msg-${e}`),this.inner.innerHTML=t,this.timer=setTimeout(()=>{this.inner.setAttribute("class","app-page-tips msg-hide")},i*1e3)}destory(){this.inner&&document.body.removeChild(this.inner),this.container&&document.body.removeChild(this.container),this.style&&document.head.removeChild(this.style)}},M=new E;var $={onMounted:o.onMounted,onBeforeMount:o.onBeforeMount,onBeforeUpdate:o.onBeforeUpdate,onUpdated:o.onUpdated,onUnmounted:o.onUnmounted,onBeforeUnmount:o.onBeforeUnmount,onLoad:o.onBeforeMount,onReady:o.onMounted,onDestroy:o.onUnmounted};function B(s,t){if(typeof s=="function")try{s.call(t)}catch(e){console.log(e)}}function F(s){return typeof s=="function"?(0,o.computed)(s):(0,o.ref)(s)}function T(s,t){for(let e in t)s[e]=F(t[e]);return s}function k(s,t){for(let e in t)s[e]=typeof t[e]=="function"?t[e]:()=>t[e];return s}var O=class{constructor(t){this.instance=(0,o.getCurrentInstance)();let{props:e,emit:i,proxy:n}=this.instance;this.props=e,this.emit=i,this.$=new Proxy({...n},{get:(r,c)=>typeof c=="string"&&c.indexOf("[getRef]")>-1?(c=c.replace("[getRef]",""),r[c]):(0,o.isRef)(r[c])?r[c].value:r[c],set:(r,c,a)=>typeof c=="string"&&c.indexOf("[setRef]")>-1?(c=c.replace("[setRef]",""),r[c]=(0,o.isRef)(a)?a:F(a),!0):(c in r&&(0,o.isRef)(r[c])?r[c].value=a:r[c]=a,!0)}),this.callback=new h,this.rangeTask=new v,this.local=new g(t||"app-page-store"),(0,o.onUnmounted)(()=>this?.destroy())}setRefs(t){this.instance.proxy=T(this.$,t)}setRef(t,e){let[i,...n]=t.split("."),r={};this.$&&i in this.$?(r=this.$[i],this.$["[setRef]"+i]=n.length>0?R(r,n.join("."),e):e):this.instance.proxy=T(this.$,{[t]:e})}getRef(t){return this.$["[getRef]"+t]}set(t,e){let[i,...n]=t.split("."),r={};this.$&&i in this.$?(r=this.$[i],this.$[i]=n.length>0?R(r,n.join("."),e):e):this.instance.proxy=T(this.$,{[t]:e})}get(t){return this.$[t]}setFuns(t){this.instance.proxy=k(this.$,t)}setFun(t,e){this.instance.proxy=k(this.$,{[t]:e})}getFun(t){return this.$[t]}watch(t,e){(0,o.watch)(t,(i,n)=>{typeof e=="function"?e(i,n):this.callback.run(e,i,n)})}watchRef(t,e){let[i,...n]=t.split(".");if(!(this.$&&i in this.$)){console.log(`refs\u4E2D\u6CA1\u6709\u8BE5${i}\uFF0C\u68C0\u67E5\u662F\u5426\u521D\u59CB\u5316\uFF01`);return}(0,o.watch)(()=>{let r=this.$[i];if(n.length)for(let c=0;c<n.length;c++)r=r[n[c]];return r},(r,c)=>{typeof e=="function"?e(r,c):this.callback.run(e,r,c)})}watchProps(t,e){if(!(this.props&&t in this.props)){console.log(`props\u4E2D\u6CA1\u6709\u8BE5${t}\uFF0C\u68C0\u67E5\u662F\u5426\u521D\u59CB\u5316\uFF01`);return}(0,o.watch)(this.props[t].value?this.props[t]:()=>this.props[t],(i,n)=>{typeof e=="function"?e(i,n):this.callback.run(e,i,n)})}setLives(t){if(U(t))for(let e in t)if(e in $){let i=t[e];if(typeof i!="function"){console.log(`${e}'s value need to be a function`);return}$[e](()=>B(i,this))}else console.log(`${e} is not a life function`)}setLive(t,e){if(typeof t=="string"&&typeof e=="function")if(t in $){if(typeof e!="function"){console.log("func need to be a function");return}$[t](()=>B(e,this))}else console.log(`${t} is not a life function`)}destroy(){this.instance=null,this.props=null,this.emit=null,this.proxy=null,this.$=null,this.local.free(),this.local=null,this.rangeTask.destroy(),this.rangeTask=null,this.callback.run("destroy"),this.callback.destroy(),this.callback=null}binds(t){for(let e in t){let i=t[e];typeof i=="function"?this[e]=(...n)=>i.call(this,...n):this[e]=i}}bind(t,e){typeof t=="string"&&(typeof e=="function"?this[t]=(...i)=>e.call(this,...i):this[t]=e)}tips(t,e="default",i=1.5){M.show(t,e,i)}};function q(s){s==""||s=="#"||s==null||(s.indexOf("[hard]")>-1?(s=s.replace("[hard]",""),document.location.href=s):this?.router?this.router.push({path:s}):document.location.href=s)}async function G(s){try{await navigator.clipboard.writeText(s),this?.msg&&this.msg.showMsg("\u590D\u5236\u6210\u529F","success")}catch{let e=await navigator.permissions.query({name:"write-on-clipboard"});e.state=="granted"||e.state=="prompt"?this?.msg&&this.msg.showMsg("\u6CA1\u6709\u6743\u9650","fail"):this?.msg&&this.msg.showMsg("\u590D\u5236\u5931\u8D25","fail")}}function Q(s,t,e){var i=new Blob([s],{type:e});if(window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(i,t);else{var n=document.createElement("a"),r=URL.createObjectURL(i);n.href=r,n.download=t,document.body.appendChild(n),n.click(),setTimeout(function(){document.body.removeChild(n),window.URL.revokeObjectURL(r)},0)}}function W(s,t){var e=document.createElement("a");e.href=s,e.download=t,document.body.appendChild(e),e.click(),setTimeout(function(){document.body.removeChild(e),window.URL.revokeObjectURL(s)},0)}var X={downloadFileByData:Q,downloadFileByUrl:W,copyText:G,goToUrl:q};function Y(s){return s!==null&&typeof s=="object"&&!Array.isArray(s)}function Z(s,t){let e=s.indexOf(t);if(e!==-1){let i=s.substring(0,e),n=s.substring(e+t.length);return{left:i,right:n}}else return{left:s,right:""}}function V({componentMap:s,template:t,props:e,events:i,mainClass:n="dyComponent"}){let r=0,c=t.split(`
`),a=[];return c.forEach(f=>{if(!f||f.trim()==="")return;let l=f.match(/\{\{(.*?)\}\}/g);if(!l){a.push((0,o.h)("div",{class:n},f.trim()));return}let p=[],u=f;for(let y=0;y<l?.length;y++){let _=l[y].slice(2,-2),[j,C]=tt(_),b={},D={},d=s?.[j],{left:w,right:N}=Z(u,l[y]);if(!d){p.push((0,o.h)("span",{},w+j)),u=N;continue}if(C||(typeof e=="function"?b=e(r):Array.isArray(e)&&e.length>r?b=e[r]:Y(e)&&(b=e),r++),i)for(let x of Object.keys(i))typeof i[x]=="function"&&(D[`on${x.slice(0,1).toUpperCase()+x.slice(1)}`]=i[x]);w&&w.trim()&&p.push((0,o.h)("span",{},w)),typeof d=="function"&&(d=d(e)),p.push((0,o.h)(d,{...b,...D,...C})),u=N}u&&p.push((0,o.h)("span",{},u)),a.push((0,o.h)("div",{class:n},p))}),(0,o.defineComponent)({render:()=>a})}function tt(s){let t,e=null,i=s.match(/\([^)]*\)/g);if(!i)return t=s,[t,e];t=s.split(i[0])[0];let n=i[0].slice(1,-1);if(e={},n.length>0)try{e=JSON.parse(n)}catch{e.text=n}return[t,e]}var A=class{constructor(t){this.callback=new h,this.option=(0,o.ref)({}),this.config=(0,o.ref)({timestamp:Date.now(),isShow:!1,id:t})}show(t){this.option.value=t,this.config.value={timestamp:Date.now(),isShow:!0}}hide(){this.config.value={timestamp:Date.now(),isShow:!1}}destroy(){this.callback.destroy(),this.callback=null,this.option.value=null,this.config.value=null}};function et(s,t){function e(i,n,r,c){if(t){if(t instanceof A){t.run(i,n,r,c);return}if(typeof t=="object"&&i in t){t[i](n,r,c);return}typeof t=="function"&&t(n,r,c)}}return(0,o.watch)(()=>s?.config?.value?.timestamp,()=>{e(s?.config?.value?.isShow?"show":"hide",s?.option?.value,s?.callback,s?.config?.value)},{deep:!0})}var Dt=O;export{A as CallPanel,h as Callback,g as LocalStore,O as Page,X as Tools,Dt as default,M as msg,V as templateToComponment,et as watchPanelEvent};
/*! Bundled license information:

vue/dist/vue.runtime.esm-bundler.js:
  (**
  * vue v3.4.38
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
*/
