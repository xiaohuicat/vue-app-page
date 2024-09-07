var I=Object.defineProperty;var W=Object.getOwnPropertyDescriptor;var X=Object.getOwnPropertyNames;var Y=Object.prototype.hasOwnProperty;var Z=(i,t)=>{for(var e in t)I(i,e,{get:t[e],enumerable:!0})},F=(i,t,e,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of X(t))!Y.call(i,n)&&n!==e&&I(i,n,{get:()=>t[n],enumerable:!(o=W(t,n))||o.enumerable});return i},g=(i,t,e)=>(F(i,t,"default"),e&&F(e,t,"default"));var a=class{constructor(t={}){this.callbackDict={},t&&typeof t=="object"&&Object.keys(t).forEach(e=>this.set(e,t[e]))}set(t,e){typeof t=="string"&&typeof e=="function"&&(this.callbackDict[t]=[e]),typeof t=="string"&&Array.isArray(e)&&e.every(o=>typeof o=="function")&&(this.callbackDict[t]=e)}add(t,e){if(typeof t=="string"&&typeof e=="function"){t in this.callbackDict?this.callbackDict[t].push(e):this.callbackDict[t]=[e];return}typeof t=="object"&&Object.keys(t).forEach(o=>{this.add(o,t[o])})}get(t){let e=this.callbackDict[t];return e?Array.isArray(e)?e:[e]:[]}run(t,...e){return this.get(t).map(o=>o(...e))}remove(t){typeof t=="string"&&t in this.callbackDict&&delete this.callbackDict[t]}destroy(){this.callbackDict={}}};function _(i){return i!==null&&typeof i=="object"&&!Array.isArray(i)}function A(i,t,e){let o=t.split("."),n=i;for(let c=0;c<o.length-1;c++){let l=o[c],f=o[c+1];!isNaN(f)?Array.isArray(n[l])||(n[l]=[]):(typeof n[l]!="object"||n[l]===null)&&(n[l]={}),n=n[l]}let r=o[o.length-1];return n[r]=e,i}var s={};Z(s,{compile:()=>k});g(s,mt);import{initCustomFormatter as ut}from"@vue/runtime-dom";import*as mt from"@vue/runtime-dom";var k=()=>{};function L(i){return typeof i=="string"&&i.trim()!==""}var y=class{constructor(t){this.name=t||"LocalStore"}setName(t){return this.name=t,this}get(t,e){let o={};try{o=JSON.parse(localStorage.getItem(this.name))||{}}catch{}return L(t)?typeof o=="object"&&o!==null&&t in o?o[t]:e:o}set(t,e){if(L(t)){let o=this.get();o[t]=e,localStorage[this.name]=JSON.stringify(o)}else t&&typeof t=="object"&&Object.keys(t).forEach(o=>this.set(o,t[o]))}delete(t){if(!L(t))return;let e=this.get();t in e&&delete e[t],localStorage[this.name]=JSON.stringify(e)}clear(){delete localStorage.removeItem(this.name)}save(t,e){this.set(t,e)}size(){let t=localStorage.getItem(this.name)||"";return new TextEncoder().encode(t).length}};var R=class{constructor(){this.id="app-page-tips",this.container,this.inner,this.style}init(){this.container||(this.container=document.createElement("div"),this.container.setAttribute("id",this.id+"-container"),document.body.appendChild(this.container),this.inner=document.createElement("div"),this.inner.setAttribute("class","app-page-tips"),this.container.appendChild(this.inner)),this.style||(this.style=document.createElement("style"),this.style.setAttribute("type","text/css"),this.style.setAttribute(this.id+"-style",""),this.style.innerHTML=`
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
`,document.head.appendChild(this.style))}tips(t,e="default",o=1.5){this.div||this.init(),clearTimeout(this.timer),this.inner.setAttribute("class",`app-page-tips msg-${e}`),this.inner.innerHTML=t,this.timer=setTimeout(()=>{this.inner.setAttribute("class","app-page-tips msg-hide")},o*1e3)}destory(){this.inner&&document.body.removeChild(this.inner),this.container&&document.body.removeChild(this.container),this.style&&document.head.removeChild(this.style)}},M;function J(){return M||new R}function h(i,t="default",e=1.5){J().tips(i,t,e)}function K(i){document.body.setAttribute("style",i?"overflow:hidden":"overflow:auto")}function P(i){i.length>0?K(!0):K(!1)}var C=class{constructor(){this.allowList=[]}show(t){this.allowList.indexOf(t)>-1||(this.allowList.push(t),P(this.allowList))}hide(t){let e=this.allowList.indexOf(t);e!=-1&&(this.allowList.splice(e,1),P(this.allowList))}reset(){this.allowList=[],P(this.allowList)}},z;function j(){return z||new C}function D(){let i=Symbol();return{show:()=>j().show(i),hide:()=>j().hide(i),reset:()=>j().reset()}}var O={onMounted:s.onMounted,onBeforeMount:s.onBeforeMount,onBeforeUpdate:s.onBeforeUpdate,onUpdated:s.onUpdated,onUnmounted:s.onUnmounted,onBeforeUnmount:s.onBeforeUnmount,onLoad:s.onBeforeMount,onReady:s.onMounted,onDestroy:s.onUnmounted};function H(i,t){if(typeof i=="function")try{i.call(t)}catch(e){console.log(e)}}function G(i){return typeof i=="function"?(0,s.computed)(i):(0,s.ref)(i)}function E(i,t){for(let e in t)i[e]=G(t[e]);return i}function q(i,t){for(let e in t)i[e]=typeof t[e]=="function"?t[e]:()=>t[e];return i}var S=class{constructor(t){this.instance=(0,s.getCurrentInstance)();let{props:e,emit:o,proxy:n}=this.instance;this.props=e,this.emit=o,this.$=new Proxy({...n},{get:(r,c)=>typeof c=="string"&&c.indexOf("[getRef]")>-1?(c=c.replace("[getRef]",""),r[c]):(0,s.isRef)(r[c])?r[c].value:r[c],set:(r,c,l)=>typeof c=="string"&&c.indexOf("[setRef]")>-1?(c=c.replace("[setRef]",""),r[c]=(0,s.isRef)(l)?l:G(l),!0):(c in r&&(0,s.isRef)(r[c])?r[c].value=l:r[c]=l,!0)}),this.pageScroller=D(),this.callback=new a,this.local=new y(t||"app-page-store")}setRefs(t){this.instance.proxy=E(this.$,t)}setRef(t,e){let[o,...n]=t.split("."),r={};this.$&&o in this.$?(r=this.$[o],this.$["[setRef]"+o]=n.length>0?A(r,n.join("."),e):e):this.instance.proxy=E(this.$,{[t]:e})}getRef(t){return this.$["[getRef]"+t]}set(t,e){let[o,...n]=t.split("."),r={};this.$&&o in this.$?(r=this.$[o],this.$[o]=n.length>0?A(r,n.join("."),e):e):this.instance.proxy=E(this.$,{[t]:e})}get(t){return this.$[t]}setFuns(t){this.instance.proxy=q(this.$,t)}setFun(t,e){this.instance.proxy=q(this.$,{[t]:e})}getFun(t){return this.$[t]}watch(t,e){(0,s.watch)(t,(o,n)=>{typeof e=="function"?e(o,n):this.callback.run(e,o,n)})}watchRef(t,e){let[o,...n]=t.split(".");if(!(this.$&&o in this.$)){console.log(`refs\u4E2D\u6CA1\u6709\u8BE5${o}\uFF0C\u68C0\u67E5\u662F\u5426\u521D\u59CB\u5316\uFF01`);return}(0,s.watch)(()=>{let r=this.$[o];if(n.length)for(let c=0;c<n.length;c++)r=r[n[c]];return r},(r,c)=>{typeof e=="function"?e(r,c):this.callback.run(e,r,c)})}watchProps(t,e){if(!(this.props&&t in this.props)){console.log(`props\u4E2D\u6CA1\u6709\u8BE5${t}\uFF0C\u68C0\u67E5\u662F\u5426\u521D\u59CB\u5316\uFF01`);return}(0,s.watch)(this.props[t].value?this.props[t]:()=>this.props[t],(o,n)=>{typeof e=="function"?e(o,n):this.callback.run(e,o,n)})}setLives(t){if(_(t))for(let e in t)if(e in O){let o=t[e];if(typeof o!="function"){console.log(`${e}'s value need to be a function`);return}O[e](()=>H(o,this))}else console.log(`${e} is not a life function`)}setLive(t,e){if(typeof t=="string"&&typeof e=="function")if(t in O){if(typeof e!="function"){console.log("func need to be a function");return}O[t](()=>H(e,this))}else console.log(`${t} is not a life function`)}destroy(){this.instance=null,this.props=null,this.emit=null,this.proxy=null,this.$=null,this.local=null,this.callback.run("destroy"),this.callback.destroy(),this.callback=null,this.pageScroller=null}binds(t){for(let e in t){let o=t[e];typeof o=="function"?this[e]=(...n)=>o.call(this,...n):this[e]=o}}bind(t,e){typeof t=="string"&&(typeof e=="function"?this[t]=(...o)=>e.call(this,...o):this[t]=e)}tips(t,e="default",o=1.5){h(t,e,o)}scroll(t){t?this.pageScroller.show():this.pageScroller.hide()}};function V(i){i==""||i=="#"||i==null||(i.indexOf("[hard]")>-1?(i=i.replace("[hard]",""),document.location.href=i):this?.router?this.router.push({path:i}):document.location.href=i)}async function tt(i){try{await navigator.clipboard.writeText(i),h("\u590D\u5236\u6210\u529F","success")}catch{let e=await navigator.permissions.query({name:"write-on-clipboard"});e.state=="granted"||e.state=="prompt"?h("\u6CA1\u6709\u6743\u9650","fail"):h("\u590D\u5236\u5931\u8D25","fail")}}function et(i,t,e){var o=new Blob([i],{type:e});if(window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(o,t);else{var n=document.createElement("a"),r=URL.createObjectURL(o);n.href=r,n.download=t,document.body.appendChild(n),n.click(),setTimeout(function(){document.body.removeChild(n),window.URL.revokeObjectURL(r)},0)}}function it(i,t){var e=document.createElement("a");e.href=i,e.download=t,document.body.appendChild(e),e.click(),setTimeout(function(){document.body.removeChild(e),window.URL.revokeObjectURL(i)},0)}var ot={downloadFileByData:et,downloadFileByUrl:it,copyText:tt,goToUrl:V};function nt(i){return i!==null&&typeof i=="object"&&!Array.isArray(i)}function st(i,t){let e=i.indexOf(t);if(e!==-1){let o=i.substring(0,e),n=i.substring(e+t.length);return{left:o,right:n}}else return{left:i,right:""}}function rt({componentMap:i,template:t,props:e,events:o,mainClass:n="dyComponent"}){let r=0,c=t.split(`
`),l=[];return c.forEach(f=>{if(!f||f.trim()==="")return;let p=f.match(/\{\{(.*?)\}\}/g);if(!p){l.push((0,s.h)("div",{class:n},f.trim()));return}let u=[],d=f;for(let w=0;w<p?.length;w++){let Q=p[w].slice(2,-2),[N,T]=ct(Q),b={},U={},m=i?.[N],{left:x,right:B}=st(d,p[w]);if(!m){u.push((0,s.h)("span",{},x+N)),d=B;continue}if(T||(typeof e=="function"?b=e(r):Array.isArray(e)&&e.length>r?b=e[r]:nt(e)&&(b=e),r++),o)for(let v of Object.keys(o))typeof o[v]=="function"&&(U[`on${v.slice(0,1).toUpperCase()+v.slice(1)}`]=o[v]);x&&x.trim()&&u.push((0,s.h)("span",{},x)),typeof m=="function"&&(m=m(e)),u.push((0,s.h)(m,{...b,...U,...T})),d=B}d&&u.push((0,s.h)("span",{},d)),l.push((0,s.h)("div",{class:n},u))}),(0,s.defineComponent)({render:()=>l})}function ct(i){let t,e=null,o=i.match(/\([^)]*\)/g);if(!o)return t=i,[t,e];t=i.split(o[0])[0];let n=o[0].slice(1,-1);if(e={},n.length>0)try{e=JSON.parse(n)}catch{e.text=n}return[t,e]}var $=class{constructor(t){this.callback=new a,this.option=(0,s.ref)({}),this.config=(0,s.ref)({timestamp:Date.now(),isShow:!1,id:t})}show(t){this.option.value=t,this.config.value={timestamp:Date.now(),isShow:!0}}hide(){this.config.value={timestamp:Date.now(),isShow:!1}}destroy(){this.callback.destroy(),this.callback=null,this.option.value=null,this.config.value=null}};function lt(i,t){function e(o,n,r,c){if(t){if(t instanceof $){t.run(o,n,r,c);return}if(typeof t=="object"&&o in t){t[o](n,r,c);return}typeof t=="function"&&t(n,r,c)}}return(0,s.watch)(()=>i?.config?.value?.timestamp,()=>{e(i?.config?.value?.isShow?"show":"hide",i?.option?.value,i?.callback,i?.config?.value)},{deep:!0})}var Jt=S;export{$ as CallPanel,a as Callback,y as LocalStore,S as Page,ot as Tools,Jt as default,rt as templateToComponment,h as tips,D as usePageScroller,J as useTips,lt as watchPanelEvent};
/*! Bundled license information:

vue/dist/vue.runtime.esm-bundler.js:
  (**
  * vue v3.4.38
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
*/
