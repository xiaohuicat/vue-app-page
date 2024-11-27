var W=Object.defineProperty;var rt=Object.getOwnPropertyDescriptor;var nt=Object.getOwnPropertyNames;var ot=Object.prototype.hasOwnProperty;var ct=(i,t)=>{for(var e in t)W(i,e,{get:t[e],enumerable:!0})},Q=(i,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of nt(t))!ot.call(i,r)&&r!==e&&W(i,r,{get:()=>t[r],enumerable:!(s=rt(t,r))||s.enumerable});return i},b=(i,t,e)=>(Q(i,t,"default"),e&&Q(e,t,"default"));var f=class{constructor(t={}){this.callbackDict={},t&&typeof t=="object"&&Object.keys(t).forEach(e=>this.set(e,t[e]))}set(t,e){typeof t=="string"&&typeof e=="function"&&(this.callbackDict[t]=[e]),typeof t=="string"&&Array.isArray(e)&&e.every(s=>typeof s=="function")&&(this.callbackDict[t]=e)}add(t,e){if(typeof t=="string"&&typeof e=="function"){t in this.callbackDict?this.callbackDict[t].push(e):this.callbackDict[t]=[e];return}typeof t=="object"&&Object.keys(t).forEach(s=>{this.add(s,t[s])})}get(t){let e=this.callbackDict[t];return e?Array.isArray(e)?e:[e]:[]}run(t,...e){return this.get(t).map(s=>s(...e))}remove(t){typeof t=="string"&&t in this.callbackDict&&delete this.callbackDict[t]}destroy(){this.callbackDict={}}};function X(i){return i!==null&&typeof i=="object"&&!Array.isArray(i)}function R(i,t,e){let s=t.split("."),r=i;for(let n=0;n<s.length;n++){if(r[s[n]]===void 0)return e;r=r[s[n]]}return r}function w(i,t,e){let s=t.split("."),r=i;for(let c=0;c<s.length-1;c++){let l=s[c],h=s[c+1];!isNaN(h)?Array.isArray(r[l])||(r[l]=[]):(typeof r[l]!="object"||r[l]===null)&&(r[l]={}),r=r[l]}let n=s[s.length-1];return r[n]=e,i}function u(i){return typeof i=="string"&&i.trim()!==""}var o={};ct(o,{compile:()=>lt});b(o,Tt);import{initCustomFormatter as Ct}from"@vue/runtime-dom";import*as Tt from"@vue/runtime-dom";var lt=()=>{};var v=class{constructor(t){this.name=t||"LocalStore"}setName(t){return this.name=t,this}get(t,e){let s={};try{s=JSON.parse(localStorage.getItem(this.name))||{}}catch{}return u(t)?typeof s=="object"&&s!==null&&t in s?s[t]:e:s}set(t,e){if(u(t)){let s=this.get();s[t]=e,localStorage[this.name]=JSON.stringify(s)}else t&&typeof t=="object"&&Object.keys(t).forEach(s=>this.set(s,t[s]))}delete(t){if(!u(t))return;let e=this.get();t in e&&delete e[t],localStorage[this.name]=JSON.stringify(e)}clear(){delete localStorage.removeItem(this.name)}save(t,e){this.set(t,e)}size(){let t=localStorage.getItem(this.name)||"";return new TextEncoder().encode(t).length}};var ft=`#app-page-tips-container {
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
`,P=class{constructor(){this.id="app-page-tips",this.container,this.inner,this.style}init(){this.container||(this.container=document.createElement("div"),this.container.setAttribute("id",this.id+"-container"),document.body.appendChild(this.container),this.inner=document.createElement("div"),this.inner.setAttribute("class","app-page-tips"),this.container.appendChild(this.inner)),this.style||(this.style=document.createElement("style"),this.style.setAttribute("type","text/css"),this.style.setAttribute(this.id+"-style",""),this.style.innerHTML=ft,document.head.appendChild(this.style))}tips(t,e="default",s=1.5){this.div||this.init(),clearTimeout(this.timer),this.inner.setAttribute("class",`app-page-tips msg-${e}`),this.inner.innerHTML=t,this.timer=setTimeout(()=>{this.inner.setAttribute("class","app-page-tips msg-hide")},s*1e3)}destory(){this.id==null,this.inner&&document.body.removeChild(this.inner),this.container&&document.body.removeChild(this.container),this.style&&document.head.removeChild(this.style)}},M;function L(){return(!M||M.id===null)&&(M=new P),M}function x(i,t="default",e=1.5){L().tips(i,t,e)}function Z(i){document.body.setAttribute("style",i?"overflow:hidden":"overflow:auto")}function N(i){i.length>0?Z(!0):Z(!1)}var k=class{constructor(){this.allowList=[]}stop(t){this.allowList.indexOf(t)>-1||(this.allowList.push(t),N(this.allowList))}run(t){let e=this.allowList.indexOf(t);e!==-1&&(this.allowList.splice(e,1),N(this.allowList))}reset(){this.allowList=[],N(this.allowList)}},U;function at(){return U||(U=new k),U}function B(){let i=Symbol(),t=at();return{stop:()=>t.stop(i),run:()=>t.run(i),reset:()=>t.reset()}}var A=class{constructor(t){this.store=t||{},this.events=new Set}get(t){return u(t)?R(this.store,t):this.store}set(t,e){return u(t)?(w(this.store,t,e),this):this}delete(t){return delete R(this.store,t),this}clear(){this.store={};for(let t of this.events)delete this[t];return this.events.clear(),this}bind(t,e){if(typeof t=="string"&&typeof e=="function")return this.events.add(t),this[t]=e.bind(this),this}},a=new Map;function _(i,t,e){let s=a.get(i);if(s)throw new Error(`store named [${i}] is exists!`);return s=new A(t),a.set(i,s),e&&typeof e=="object"&&Object.keys(e).forEach(r=>{s.bind(r,e[r])}),s}function C(i){let t=a.get(i);return t||(t=new A,a.set(i,t)),t}function ht(i){if(i===void 0){let t=a.get(i);t&&t.clear(),a.delete(i);return}for(let[t,e]of a.entries())e.clear(),a.delete(t)}var j={onMounted:o.onMounted,onBeforeMount:o.onBeforeMount,onBeforeUpdate:o.onBeforeUpdate,onUpdated:o.onUpdated,onUnmounted:o.onUnmounted,onBeforeUnmount:o.onBeforeUnmount,onLoad:o.onBeforeMount,onReady:o.onMounted,onDestroy:o.onUnmounted};function V(i,t){if(typeof i=="function")try{i.call(t)}catch(e){console.log(e)}}function et(i){return typeof i=="function"?(0,o.computed)(i):(0,o.ref)(i)}function F(i,t){for(let e in t)i[e]=et(t[e]);return i}function tt(i,t){for(let e in t)i[e]=typeof t[e]=="function"?t[e]:()=>t[e];return i}var T=class{constructor(t){this.instance=(0,o.getCurrentInstance)();let{props:e,emit:s,proxy:r}=this.instance;this.props=e,this.emit=s,this.$=new Proxy({...r},{get:(n,c)=>typeof c=="string"&&c.indexOf("[getRef]")>-1?(c=c.replace("[getRef]",""),n[c]):(0,o.isRef)(n[c])?n[c].value:n[c],set:(n,c,l)=>typeof c=="string"&&c.indexOf("[setRef]")>-1?(c=c.replace("[setRef]",""),n[c]=(0,o.isRef)(l)?l:et(l),!0):(c in n&&(0,o.isRef)(n[c])?n[c].value=l:n[c]=l,!0)}),this.pageScroller=B(),this.callback=new f,this.local=new v(t||"app-page-store"),this.store=C(t||"app-page-store")}setRefs(t){this.instance.proxy=F(this.$,t)}setRef(t,e){let[s,...r]=t.split("."),n={};this.$&&s in this.$?(n=this.$[s],this.$["[setRef]"+s]=r.length>0?w(n,r.join("."),e):e):this.instance.proxy=F(this.$,{[t]:e})}getRef(t){return this.$["[getRef]"+t]}set(t,e){let[s,...r]=t.split("."),n={};this.$&&s in this.$?(n=this.$[s],this.$[s]=r.length>0?w(n,r.join("."),e):e):this.instance.proxy=F(this.$,{[t]:e})}get(t){return this.$[t]}setFuns(t){this.instance.proxy=tt(this.$,t)}setFun(t,e){this.instance.proxy=tt(this.$,{[t]:e})}getFun(t){return this.$[t]}watch(t,e){(0,o.watch)(t,(s,r)=>{typeof e=="function"?e(s,r):this.callback.run(e,s,r)})}watchRef(t,e){let[s,...r]=t.split(".");if(!(this.$&&s in this.$)){console.log(`refs\u4E2D\u6CA1\u6709\u8BE5${s}\uFF0C\u68C0\u67E5\u662F\u5426\u521D\u59CB\u5316\uFF01`);return}(0,o.watch)(()=>{let n=this.$[s];if(r.length)for(let c=0;c<r.length;c++)n=n[r[c]];return n},(n,c)=>{typeof e=="function"?e(n,c):this.callback.run(e,n,c)})}watchProps(t,e){if(!(this.props&&t in this.props)){console.log(`props\u4E2D\u6CA1\u6709\u8BE5${t}\uFF0C\u68C0\u67E5\u662F\u5426\u521D\u59CB\u5316\uFF01`);return}(0,o.watch)(this.props[t].value?this.props[t]:()=>this.props[t],(s,r)=>{typeof e=="function"?e(s,r):this.callback.run(e,s,r)})}setLives(t){if(X(t))for(let e in t)if(e in j){let s=t[e];if(typeof s!="function"){console.log(`${e}'s value need to be a function`);return}j[e](()=>V(s,this))}else console.log(`${e} is not a life function`)}setLive(t,e){if(typeof t=="string"&&typeof e=="function")if(t in j){if(typeof e!="function"){console.log("func need to be a function");return}j[t](()=>V(e,this))}else console.log(`${t} is not a life function`)}destroy(){this.instance=null,this.props=null,this.emit=null,this.proxy=null,this.$=null,this.local=null,this.callback.run("destroy"),this.callback.destroy(),this.callback=null,this.pageScroller=null,this.store=null}binds(t){for(let e in t){let s=t[e];typeof s=="function"?this[e]=(...r)=>s.call(this,...r):this[e]=s}}bind(t,e){typeof t=="string"&&(typeof e=="function"?this[t]=(...s)=>e.call(this,...s):this[t]=e)}tips(t,e="default",s=1.5){L().tips(t,e,s)}useStore(t){return this.store=C(t),this.store}createStore(t,e){return this.store=_(t,e),this.store}scroll(t){if(typeof t=="boolean"){t?this.pageScroller.run():this.pageScroller.stop();return}if(typeof t=="string"&&["stop","run"].indexOf(t)>-1){t==="stop"?this.pageScroller.stop():this.pageScroller.run();return}}};function ut(i){i==""||i=="#"||i==null||(i.indexOf("[hard]")>-1?(i=i.replace("[hard]",""),document.location.href=i):this?.router?this.router.push({path:i}):document.location.href=i)}async function pt(i){try{await navigator.clipboard.writeText(i),x("\u590D\u5236\u6210\u529F","success")}catch{let e=await navigator.permissions.query({name:"write-on-clipboard"});e.state=="granted"||e.state=="prompt"?x("\u6CA1\u6709\u6743\u9650","fail"):x("\u590D\u5236\u5931\u8D25","fail")}}function dt(i,t,e){var s=new Blob([i],{type:e});if(window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(s,t);else{var r=document.createElement("a"),n=URL.createObjectURL(s);r.href=n,r.download=t,document.body.appendChild(r),r.click(),setTimeout(function(){document.body.removeChild(r),window.URL.revokeObjectURL(n)},0)}}function mt(i,t){var e=document.createElement("a");e.href=i,e.download=t,document.body.appendChild(e),e.click(),setTimeout(function(){document.body.removeChild(e),window.URL.revokeObjectURL(i)},0)}var gt={downloadFileByData:dt,downloadFileByUrl:mt,copyText:pt,goToUrl:ut};function yt(i){return i!==null&&typeof i=="object"&&!Array.isArray(i)}function bt(i,t){let e=i.indexOf(t);if(e!==-1){let s=i.substring(0,e),r=i.substring(e+t.length);return{left:s,right:r}}else return{left:i,right:""}}function wt({componentMap:i,template:t,props:e,events:s,mainClass:r="dyComponent"}){let n=0,c=t.split(`
`),l=[];return c.forEach(h=>{if(!h||h.trim()==="")return;let d=h.match(/\{\{(.*?)\}\}/g);if(!d){l.push((0,o.h)("div",{class:r},h.trim()));return}let m=[],g=h;for(let S=0;S<d?.length;S++){let st=d[S].slice(2,-2),[q,z]=vt(st),O={},Y={},y=i?.[q],{left:E,right:G}=bt(g,d[S]);if(!y){m.push((0,o.h)("span",{},E+q)),g=G;continue}if(z||(typeof e=="function"?O=e(n):Array.isArray(e)&&e.length>n?O=e[n]:yt(e)&&(O=e),n++),s)for(let $ of Object.keys(s))typeof s[$]=="function"&&(Y[`on${$.slice(0,1).toUpperCase()+$.slice(1)}`]=s[$]);E&&E.trim()&&m.push((0,o.h)("span",{},E)),typeof y=="function"&&(y=y(e)),m.push((0,o.h)(y,{...O,...Y,...z})),g=G}g&&m.push((0,o.h)("span",{},g)),l.push((0,o.h)("div",{class:r},m))}),(0,o.defineComponent)({render:()=>l})}function vt(i){let t,e=null,s=i.match(/\([^)]*\)/g);if(!s)return t=i,[t,e];t=i.split(s[0])[0];let r=s[0].slice(1,-1);if(e={},r.length>0)try{e=JSON.parse(r)}catch{e.text=r}return[t,e]}var I=class{constructor(){this.tasks=[],this.statusMap=new Map}add(t,e,s){if(Array.isArray(t)&&e===void 0&&s===void 0){t.forEach(n=>{this.add(n.range,n.success,n.fail)});return}let r=`task_${this.tasks.length}`;this.tasks.push({name:r,range:t,success:e,fail:s})}run(t){this.tasks.forEach(e=>{let{name:s,range:r,success:n,fail:c}=e;t>=r[0]&&t<r[1]?(this.statusMap.has(s)||this.statusMap.set(s,!1),this.statusMap.get(s)!==!0&&(n&&n(t),this.statusMap.set(s,!0))):(this.statusMap.has(s)||this.statusMap.set(s,!0),this.statusMap.get(s)!==!1&&(c&&c(t),this.statusMap.set(s,!1)))})}destroy(){this.tasks=[],this.statusMap.clear()}};function xt(i){return typeof i=="string"?document.querySelector(i):i}var it={scroll:i=>{let t=i.documentElement.scrollHeight-i.documentElement.clientHeight,e=document.body.scrollTop||document.documentElement.scrollTop;return{progress:Math.round(e/t*100)}}};function St(i,t){if(i in it)return it[i](t)}var H=class{constructor(t,e){this.element=xt(t),this.register=e,this.callback=new f,this.map=new Map,this.debounceMap=new Map,this.init()}init(){for(let t in this.register)this.register[t].func&&this.addEvent(t,this.register[t].func)}addEvent(t,e){this.callback.add(t,e);let s=this.event(t);this.element.addEventListener(t,s),this.map.set(t,s)}removeEvent(t){let e=this.map.get(t);e&&(this.callback.remove(t),this.element.removeEventListener(t,e),this.map.delete(t))}event(t){return()=>{if(!(t in this.register))return;if("throttle"in this.register[t]){if(this.debounceMap.has(t)&&Date.now()-this.debounceMap.get(t)<this.register[t].throttle)return;this.debounceMap.set(t,Date.now())}let e=St(t,this.element);this.callback.run(t,this.element,e)}}destroy(){this.map.forEach((t,e)=>{this.element.removeEventListener(e,t)}),this.map.clear(),this.map=null,this.debounceMap.clear(),this.debounceMap=null,this.register=null,this.element=null,this.callback.destroy(),this.callback=null}};var p=class{constructor(t){this.args,this.name,this.callback=new f(t),this.timestamp=(0,o.ref)(Date.now())}call(t,...e){this.name=t,this.args=e.length===1?e[0]:e,this.timestamp.value=Date.now()}destroy(){this.callback.destroy(),this.callback=null,this.args=null,this.timestamp.value=null}},J=class{constructor(t){this.phone=t instanceof p?t:null}call(t,...e){return this.phone?(this.phone.callback.run(t,...e),!0):!1}};function Ot(i,t){function e(r,n,c){if(t){if(t instanceof f){t.run(r,n,c);return}if(typeof t=="object"&&r in t){t[r](n,c);return}typeof t=="function"&&t(n,c)}}let s=new J(i);return(0,o.watch)(()=>i?.timestamp?.value,()=>{e(i?.name,i?.args,s)}),s}var D=class extends p{constructor(t){super(t)}show(...t){this.name="show",this.args=t.length===1?t[0]:t,this.timestamp.value=Date.now()}hide(...t){this.name="hide",this.args=t.length===1?t[0]:t,this.timestamp.value=Date.now()}},K=class{constructor(t){if(t instanceof D){this.panel=t,this.callback=t.callback;return}}call(t,...e){return this?.panel?(this.callback.run(t,...e),!0):!1}};function Et(i,t){function e(r,n,c){if(t){if(t instanceof f){t.run(r,n,c);return}if(typeof t=="object"&&r in t){t[r](n,c);return}typeof t=="function"&&t(n,c)}}let s=new K(i);return(0,o.watch)(()=>i?.timestamp?.value,()=>{e(i?.name,i?.args,s)}),s}var be=T;export{D as CallPanel,f as Callback,H as ElementEvents,v as LocalStore,T as Page,p as Phone,I as RangeTask,gt as Tools,ht as clearStore,_ as createStore,be as default,wt as templateToComponment,x as tips,B as useScroll,C as useStore,L as useTips,Et as watchPanel,Ot as watchPhone};
/*! Bundled license information:

vue/dist/vue.runtime.esm-bundler.js:
  (**
  * vue v3.4.38
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
*/
