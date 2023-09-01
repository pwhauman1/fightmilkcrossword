(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const u of s)if(u.type==="childList")for(const c of u.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(s){const u={};return s.integrity&&(u.integrity=s.integrity),s.referrerPolicy&&(u.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?u.credentials="include":s.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function o(s){if(s.ep)return;s.ep=!0;const u=r(s);fetch(s.href,u)}})();function K(){}function ct(t,e){for(const r in e)t[r]=e[r];return t}function lt(t){return t()}function tt(){return Object.create(null)}function Oe(t){t.forEach(lt)}function ft(t){return typeof t=="function"}function me(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function kt(t){return Object.keys(t).length===0}function Be(t,e){t.appendChild(e)}function ae(t,e,r){t.insertBefore(e,r||null)}function ne(t){t.parentNode&&t.parentNode.removeChild(t)}function dt(t,e){for(let r=0;r<t.length;r+=1)t[r]&&t[r].d(e)}function _e(t){return document.createElement(t)}function ht(t){return document.createTextNode(t)}function pt(){return ht(" ")}function Ge(){return ht("")}function je(t,e,r,o){return t.addEventListener(e,r,o),()=>t.removeEventListener(e,r,o)}function gt(t,e,r){r==null?t.removeAttribute(e):t.getAttribute(e)!==r&&t.setAttribute(e,r)}function Ct(t){return Array.from(t.childNodes)}function nt(t,e){t.value=e??""}function rt(t,e,r){t.classList.toggle(e,!!r)}let Te;function Ie(t){Te=t}function _t(){if(!Te)throw new Error("Function called outside component initialization");return Te}function wt(t){_t().$$.on_mount.push(t)}function Et(t){_t().$$.on_destroy.push(t)}const Ce=[],We=[];let we=[];const it=[],xt=Promise.resolve();let Qe=!1;function Ot(){Qe||(Qe=!0,xt.then(mt))}function Je(t){we.push(t)}const Ke=new Set;let ve=0;function mt(){if(ve!==0)return;const t=Te;do{try{for(;ve<Ce.length;){const e=Ce[ve];ve++,Ie(e),Rt(e.$$)}}catch(e){throw Ce.length=0,ve=0,e}for(Ie(null),Ce.length=0,ve=0;We.length;)We.pop()();for(let e=0;e<we.length;e+=1){const r=we[e];Ke.has(r)||(Ke.add(r),r())}we.length=0}while(Ce.length);for(;it.length;)it.pop()();Qe=!1,Ke.clear(),Ie(t)}function Rt(t){if(t.fragment!==null){t.update(),Oe(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(Je)}}function St(t){const e=[],r=[];we.forEach(o=>t.indexOf(o)===-1?e.push(o):r.push(o)),r.forEach(o=>o()),we=e}const ze=new Set;let ge;function Ze(){ge={r:0,c:[],p:ge}}function Ye(){ge.r||Oe(ge.c),ge=ge.p}function W(t,e){t&&t.i&&(ze.delete(t),t.i(e))}function X(t,e,r,o){if(t&&t.o){if(ze.has(t))return;ze.add(t),ge.c.push(()=>{ze.delete(t),o&&(r&&t.d(1),o())}),t.o(e)}else o&&o()}function Pe(t){return t?.length!==void 0?t:Array.from(t)}function yt(t,e){const r={},o={},s={$$scope:1};let u=t.length;for(;u--;){const c=t[u],f=e[u];if(f){for(const a in c)a in f||(o[a]=1);for(const a in f)s[a]||(r[a]=f[a],s[a]=1);t[u]=f}else for(const a in c)s[a]=1}for(const c in o)c in r||(r[c]=void 0);return r}function bt(t){return typeof t=="object"&&t!==null?t:{}}function Le(t){t&&t.c()}function Ee(t,e,r){const{fragment:o,after_update:s}=t.$$;o&&o.m(e,r),Je(()=>{const u=t.$$.on_mount.map(lt).filter(ft);t.$$.on_destroy?t.$$.on_destroy.push(...u):Oe(u),t.$$.on_mount=[]}),s.forEach(Je)}function xe(t,e){const r=t.$$;r.fragment!==null&&(St(r.after_update),Oe(r.on_destroy),r.fragment&&r.fragment.d(e),r.on_destroy=r.fragment=null,r.ctx=[])}function At(t,e){t.$$.dirty[0]===-1&&(Ce.push(t),Ot(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Re(t,e,r,o,s,u,c,f=[-1]){const a=Te;Ie(t);const _=t.$$={fragment:null,ctx:[],props:u,update:K,not_equal:s,bound:tt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(a?a.$$.context:[])),callbacks:tt(),dirty:f,skip_bound:!1,root:e.target||a.$$.root};c&&c(_.root);let w=!1;if(_.ctx=r?r(t,e.props||{},(N,re,...ee)=>{const ie=ee.length?ee[0]:re;return _.ctx&&s(_.ctx[N],_.ctx[N]=ie)&&(!_.skip_bound&&_.bound[N]&&_.bound[N](ie),w&&At(t,N)),re}):[],_.update(),w=!0,Oe(_.before_update),_.fragment=o?o(_.ctx):!1,e.target){if(e.hydrate){const N=Ct(e.target);_.fragment&&_.fragment.l(N),N.forEach(ne)}else _.fragment&&_.fragment.c();e.intro&&W(t.$$.fragment),Ee(t,e.target,e.anchor),mt()}Ie(a)}class Se{$$=void 0;$$set=void 0;$destroy(){xe(this,1),this.$destroy=K}$on(e,r){if(!ft(r))return K;const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(r),()=>{const s=o.indexOf(r);s!==-1&&o.splice(s,1)}}$set(e){this.$$set&&!kt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const $t="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add($t);function It(t){let e;return{c(){e=_e("h1"),e.textContent=`${Tt}`},m(r,o){ae(r,e,o)},p:K,i:K,o:K,d(r){r&&ne(e)}}}let Tt="Fight Milk Cross Word Coming Soon";class Lt extends Se{constructor(e){super(),Re(this,e,null,It,me,{})}}function Ht(){const t="COMINGSOON",e=[{type:"boarder",coordinate:[0,0]}],r=[{type:"boarder",coordinate:[0,1]}],o=[{type:"boarder",coordinate:[0,2]}],s=[{type:"boarder",coordinate:[0,3]}];t.split("").forEach((c,f)=>{e.push({type:"boarder",coordinate:[f+1,0]}),r.push({type:"cell",aHead:[1,1],dHead:[f+1,1],answer:c,coordinate:[f+1,1]}),o.push({type:"cell",aHead:[1,2],dHead:[f+1,1],answer:c,coordinate:[f+1,2]}),s.push({type:"boarder",coordinate:[f+1,3]})});const u=t.length;return e.push({type:"boarder",coordinate:[u,0]}),r.push({type:"boarder",coordinate:[u,1]}),o.push({type:"boarder",coordinate:[u,2]}),s.push({type:"boarder",coordinate:[u,3]}),[e,r,o,s]}function Dt(t){let e;return{c(){e=_e("input"),e.disabled=!0,gt(e,"class","svelte-dqahul")},m(r,o){ae(r,e,o)},p:K,i:K,o:K,d(r){r&&ne(e)}}}function Ft(t,e,r){let{coordinate:o}=e;return t.$$set=s=>{"coordinate"in s&&r(0,o=s.coordinate)},[o]}class zt extends Se{constructor(e){super(),Re(this,e,Ft,Dt,me,{coordinate:0})}}const ke=[];function vt(t,e=K){let r;const o=new Set;function s(f){if(me(t,f)&&(t=f,r)){const a=!ke.length;for(const _ of o)_[1](),ke.push(_,t);if(a){for(let _=0;_<ke.length;_+=2)ke[_][0](ke[_+1]);ke.length=0}}}function u(f){s(f(t))}function c(f,a=K){const _=[f,a];return o.add(_),o.size===1&&(r=e(s,u)||K),f(t),()=>{o.delete(_),o.size===0&&r&&(r(),r=null)}}return{set:s,update:u,subscribe:c}}const He=vt(),Ve=vt();class Xe{orientation="across";currentHead;selectedCell;static instance;constructor(){this.setOrientation=this.setOrientation.bind(this),this.getOrientation=this.getOrientation.bind(this),this.setCurrentHead=this.setCurrentHead.bind(this),Ve.subscribe(this.setCurrentHead),this.getCurrentHead=this.getCurrentHead.bind(this),this.setSelectedCell=this.setSelectedCell.bind(this),He.subscribe(this.setSelectedCell),this.getCurrentCell=this.getCurrentCell.bind(this)}static get(){return this.instance||(this.instance=new Xe),this.instance}toggleOrientation(){return this.orientation==="across"?this.orientation="down":this.orientation="across",this.orientation}setOrientation(e){this.orientation=e}getOrientation(){return this.orientation}setCurrentHead(e){this.currentHead=e?.head}getCurrentHead(){return this.currentHead}setSelectedCell(e){this.selectedCell=e?.coordinate}getCurrentCell(){return this.selectedCell}}const Me=Xe.get();function Ne(t,e){if(!t||!e)return!1;const[r,o]=t,[s,u]=e;return r===s&&o===u}function Mt(t){const e=t.toLocaleUpperCase();if(e==="BACKSPACE"||e==="DELETE")return"delete";const r=/^[A-Z]|[1-9]$/;return e.match(r)?.length?"char":"ignore"}function Nt(t,e){const[r,o]=t;return e==="across"?[r+1,o]:[r,o+1]}function Pt(t,e){const[r,o]=t;return e==="across"?[r-1,o]:[r,o-1]}function Ut(t){let e=Me.getOrientation();const r=t.coordinate,o=Me.getCurrentCell();Ne(r,o)&&(e=Me.toggleOrientation());let s;!t.aHead&&!t.dHead?console.error(`Cell ${t.coordinate} has no associated head!`):!t.aHead&&t.dHead?s=t.dHead:!t.dHead&&t.aHead?s=t.aHead:s=e==="across"?t.aHead:t.dHead,Ve.set({head:s,orientation:e}),He.set({coordinate:r,clear:!1})}function qt(t){const{coordinate:e,key:r}=t,o=Mt(r);if(o==="ignore")return;const s=Me.getOrientation();if(o==="delete"){const u=Pt(e,s);He.set({coordinate:u,clear:!0})}if(o==="char"){const u=Nt(e,s);He.set({coordinate:u,clear:!1})}}function Bt(t){let e,r,o;return{c(){e=_e("input"),gt(e,"class","svelte-1bl4m7z"),rt(e,"is-correct",t[2])},m(s,u){ae(s,e,u),nt(e,t[1]),t[11](e),r||(o=[je(e,"input",t[10]),je(e,"keyup",t[3]),je(e,"click",t[4])],r=!0)},p(s,[u]){u&2&&e.value!==s[1]&&nt(e,s[1]),u&4&&rt(e,"is-correct",s[2])},i:K,o:K,d(s){s&&ne(e),t[11](null),r=!1,Oe(o)}}}function jt(t,e,r){const o="cell";let{dHead:s=void 0}=e,{aHead:u=void 0}=e,{answer:c}=e,{coordinate:f}=e,a,_=[],w="",N=!1;wt(()=>{const S=He.subscribe(ue=>{ue&&Ne(ue.coordinate,f)&&(a.focus(),ue.clear&&r(1,w=""))}),Ae=Ve.subscribe(ue=>{if(!ue)return;const{head:ye,orientation:$e}=ue;ye&&($e==="across"&&r(2,N=Ne(u,ye)),$e==="down"&&r(2,N=Ne(s,ye)))});_.push(S),_.push(Ae)}),Et(()=>{_.forEach(S=>S())});const re=S=>{r(1,w=w.toUpperCase()),w.length>1&&r(1,w=w.slice(-1)),qt({coordinate:f,key:S.key})},ee=()=>{Ut({aHead:u,dHead:s,coordinate:f})};function ie(){w=this.value,r(1,w)}function De(S){We[S?"unshift":"push"](()=>{a=S,r(0,a)})}return t.$$set=S=>{"dHead"in S&&r(6,s=S.dHead),"aHead"in S&&r(7,u=S.aHead),"answer"in S&&r(8,c=S.answer),"coordinate"in S&&r(9,f=S.coordinate)},[a,w,N,re,ee,o,s,u,c,f,ie,De]}class Kt extends Se{constructor(e){super(),Re(this,e,jt,Bt,me,{type:5,dHead:6,aHead:7,answer:8,coordinate:9})}get type(){return this.$$.ctx[5]}}function st(t,e,r){const o=t.slice();return o[1]=e[r],o}function Wt(t){let e,r;const o=[t[1]];let s={};for(let u=0;u<o.length;u+=1)s=ct(s,o[u]);return e=new zt({props:s}),{c(){Le(e.$$.fragment)},m(u,c){Ee(e,u,c),r=!0},p(u,c){const f=c&1?yt(o,[bt(u[1])]):{};e.$set(f)},i(u){r||(W(e.$$.fragment,u),r=!0)},o(u){X(e.$$.fragment,u),r=!1},d(u){xe(e,u)}}}function Qt(t){let e,r;const o=[t[1]];let s={};for(let u=0;u<o.length;u+=1)s=ct(s,o[u]);return e=new Kt({props:s}),{c(){Le(e.$$.fragment)},m(u,c){Ee(e,u,c),r=!0},p(u,c){const f=c&1?yt(o,[bt(u[1])]):{};e.$set(f)},i(u){r||(W(e.$$.fragment,u),r=!0)},o(u){X(e.$$.fragment,u),r=!1},d(u){xe(e,u)}}}function ot(t){let e,r,o,s;const u=[Qt,Wt],c=[];function f(a,_){return a[1].type==="cell"?0:1}return e=f(t),r=c[e]=u[e](t),{c(){r.c(),o=Ge()},m(a,_){c[e].m(a,_),ae(a,o,_),s=!0},p(a,_){let w=e;e=f(a),e===w?c[e].p(a,_):(Ze(),X(c[w],1,1,()=>{c[w]=null}),Ye(),r=c[e],r?r.p(a,_):(r=c[e]=u[e](a),r.c()),W(r,1),r.m(o.parentNode,o))},i(a){s||(W(r),s=!0)},o(a){X(r),s=!1},d(a){a&&ne(o),c[e].d(a)}}}function Jt(t){let e,r,o=Pe(t[0]),s=[];for(let c=0;c<o.length;c+=1)s[c]=ot(st(t,o,c));const u=c=>X(s[c],1,1,()=>{s[c]=null});return{c(){for(let c=0;c<s.length;c+=1)s[c].c();e=Ge()},m(c,f){for(let a=0;a<s.length;a+=1)s[a]&&s[a].m(c,f);ae(c,e,f),r=!0},p(c,[f]){if(f&1){o=Pe(c[0]);let a;for(a=0;a<o.length;a+=1){const _=st(c,o,a);s[a]?(s[a].p(_,f),W(s[a],1)):(s[a]=ot(_),s[a].c(),W(s[a],1),s[a].m(e.parentNode,e))}for(Ze(),a=o.length;a<s.length;a+=1)u(a);Ye()}},i(c){if(!r){for(let f=0;f<o.length;f+=1)W(s[f]);r=!0}},o(c){s=s.filter(Boolean);for(let f=0;f<s.length;f+=1)X(s[f]);r=!1},d(c){c&&ne(e),dt(s,c)}}}function Gt(t,e,r){let{tiles:o}=e;return t.$$set=s=>{"tiles"in s&&r(0,o=s.tiles)},[o]}class Zt extends Se{constructor(e){super(),Re(this,e,Gt,Jt,me,{tiles:0})}}function at(t,e,r){const o=t.slice();return o[1]=e[r],o}function ut(t){let e,r,o,s;return e=new Zt({props:{tiles:t[1]}}),{c(){Le(e.$$.fragment),r=pt(),o=_e("br")},m(u,c){Ee(e,u,c),ae(u,r,c),ae(u,o,c),s=!0},p:K,i(u){s||(W(e.$$.fragment,u),s=!0)},o(u){X(e.$$.fragment,u),s=!1},d(u){u&&(ne(r),ne(o)),xe(e,u)}}}function Yt(t){let e,r,o=Pe(t[0]),s=[];for(let c=0;c<o.length;c+=1)s[c]=ut(at(t,o,c));const u=c=>X(s[c],1,1,()=>{s[c]=null});return{c(){for(let c=0;c<s.length;c+=1)s[c].c();e=Ge()},m(c,f){for(let a=0;a<s.length;a+=1)s[a]&&s[a].m(c,f);ae(c,e,f),r=!0},p(c,[f]){if(f&1){o=Pe(c[0]);let a;for(a=0;a<o.length;a+=1){const _=at(c,o,a);s[a]?(s[a].p(_,f),W(s[a],1)):(s[a]=ut(_),s[a].c(),W(s[a],1),s[a].m(e.parentNode,e))}for(Ze(),a=o.length;a<s.length;a+=1)u(a);Ye()}},i(c){if(!r){for(let f=0;f<o.length;f+=1)W(s[f]);r=!0}},o(c){s=s.filter(Boolean);for(let f=0;f<s.length;f+=1)X(s[f]);r=!1},d(c){c&&ne(e),dt(s,c)}}}function Vt(t){return[Ht()]}class Xt extends Se{constructor(e){super(),Re(this,e,Vt,Yt,me,{})}}var en=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},tn={exports:{}};/* @license
Papa Parse
v5.4.1
https://github.com/mholt/PapaParse
License: MIT
*/(function(t,e){(function(r,o){t.exports=o()})(en,function r(){var o=typeof self<"u"?self:typeof window<"u"?window:o!==void 0?o:{},s=!o.document&&!!o.postMessage,u=o.IS_PAPA_WORKER||!1,c={},f=0,a={parse:function(i,n){var l=(n=n||{}).dynamicTyping||!1;if(E(l)&&(n.dynamicTypingFunction=l,l={}),n.dynamicTyping=l,n.transform=!!E(n.transform)&&n.transform,n.worker&&a.WORKERS_SUPPORTED){var d=function(){if(!a.WORKERS_SUPPORTED)return!1;var b=(P=o.URL||o.webkitURL||null,I=r.toString(),a.BLOB_URL||(a.BLOB_URL=P.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",I,")();"],{type:"text/javascript"})))),v=new o.Worker(b),P,I;return v.onmessage=ue,v.id=f++,c[v.id]=v}();return d.userStep=n.step,d.userChunk=n.chunk,d.userComplete=n.complete,d.userError=n.error,n.step=E(n.step),n.chunk=E(n.chunk),n.complete=E(n.complete),n.error=E(n.error),delete n.worker,void d.postMessage({input:i,config:n,workerId:d.id})}var p=null;return a.NODE_STREAM_INPUT,typeof i=="string"?(i=function(b){return b.charCodeAt(0)===65279?b.slice(1):b}(i),p=n.download?new N(n):new ee(n)):i.readable===!0&&E(i.read)&&E(i.on)?p=new ie(n):(o.File&&i instanceof File||i instanceof Object)&&(p=new re(n)),p.stream(i)},unparse:function(i,n){var l=!1,d=!0,p=",",b=`\r
`,v='"',P=v+v,I=!1,g=null,L=!1;(function(){if(typeof n=="object"){if(typeof n.delimiter!="string"||a.BAD_DELIMITERS.filter(function(h){return n.delimiter.indexOf(h)!==-1}).length||(p=n.delimiter),(typeof n.quotes=="boolean"||typeof n.quotes=="function"||Array.isArray(n.quotes))&&(l=n.quotes),typeof n.skipEmptyLines!="boolean"&&typeof n.skipEmptyLines!="string"||(I=n.skipEmptyLines),typeof n.newline=="string"&&(b=n.newline),typeof n.quoteChar=="string"&&(v=n.quoteChar),typeof n.header=="boolean"&&(d=n.header),Array.isArray(n.columns)){if(n.columns.length===0)throw new Error("Option columns is empty");g=n.columns}n.escapeChar!==void 0&&(P=n.escapeChar+v),(typeof n.escapeFormulae=="boolean"||n.escapeFormulae instanceof RegExp)&&(L=n.escapeFormulae instanceof RegExp?n.escapeFormulae:/^[=+\-@\t\r].*$/)}})();var y=new RegExp(S(v),"g");if(typeof i=="string"&&(i=JSON.parse(i)),Array.isArray(i)){if(!i.length||Array.isArray(i[0]))return Y(null,i,I);if(typeof i[0]=="object")return Y(g||Object.keys(i[0]),i,I)}else if(typeof i=="object")return typeof i.data=="string"&&(i.data=JSON.parse(i.data)),Array.isArray(i.data)&&(i.fields||(i.fields=i.meta&&i.meta.fields||g),i.fields||(i.fields=Array.isArray(i.data[0])?i.fields:typeof i.data[0]=="object"?Object.keys(i.data[0]):[]),Array.isArray(i.data[0])||typeof i.data[0]=="object"||(i.data=[i.data])),Y(i.fields||[],i.data||[],I);throw new Error("Unable to serialize unrecognized input");function Y(h,R,B){var T="";typeof h=="string"&&(h=JSON.parse(h)),typeof R=="string"&&(R=JSON.parse(R));var U=Array.isArray(h)&&0<h.length,z=!Array.isArray(R[0]);if(U&&d){for(var M=0;M<h.length;M++)0<M&&(T+=p),T+=q(h[M],M);0<R.length&&(T+=b)}for(var m=0;m<R.length;m++){var k=U?h.length:R[m].length,A=!1,F=U?Object.keys(R[m]).length===0:R[m].length===0;if(B&&!U&&(A=B==="greedy"?R[m].join("").trim()==="":R[m].length===1&&R[m][0].length===0),B==="greedy"&&U){for(var x=[],j=0;j<k;j++){var H=z?h[j]:j;x.push(R[m][H])}A=x.join("").trim()===""}if(!A){for(var O=0;O<k;O++){0<O&&!F&&(T+=p);var V=U&&z?h[O]:O;T+=q(R[m][V],O)}m<R.length-1&&(!B||0<k&&!F)&&(T+=b)}}return T}function q(h,R){if(h==null)return"";if(h.constructor===Date)return JSON.stringify(h).slice(1,25);var B=!1;L&&typeof h=="string"&&L.test(h)&&(h="'"+h,B=!0);var T=h.toString().replace(y,P);return(B=B||l===!0||typeof l=="function"&&l(h,R)||Array.isArray(l)&&l[R]||function(U,z){for(var M=0;M<z.length;M++)if(-1<U.indexOf(z[M]))return!0;return!1}(T,a.BAD_DELIMITERS)||-1<T.indexOf(p)||T.charAt(0)===" "||T.charAt(T.length-1)===" ")?v+T+v:T}}};if(a.RECORD_SEP=String.fromCharCode(30),a.UNIT_SEP=String.fromCharCode(31),a.BYTE_ORDER_MARK="\uFEFF",a.BAD_DELIMITERS=["\r",`
`,'"',a.BYTE_ORDER_MARK],a.WORKERS_SUPPORTED=!s&&!!o.Worker,a.NODE_STREAM_INPUT=1,a.LocalChunkSize=10485760,a.RemoteChunkSize=5242880,a.DefaultDelimiter=",",a.Parser=Ae,a.ParserHandle=De,a.NetworkStreamer=N,a.FileStreamer=re,a.StringStreamer=ee,a.ReadableStreamStreamer=ie,o.jQuery){var _=o.jQuery;_.fn.parse=function(i){var n=i.config||{},l=[];return this.each(function(b){if(!(_(this).prop("tagName").toUpperCase()==="INPUT"&&_(this).attr("type").toLowerCase()==="file"&&o.FileReader)||!this.files||this.files.length===0)return!0;for(var v=0;v<this.files.length;v++)l.push({file:this.files[v],inputElem:this,instanceConfig:_.extend({},n)})}),d(),this;function d(){if(l.length!==0){var b,v,P,I,g=l[0];if(E(i.before)){var L=i.before(g.file,g.inputElem);if(typeof L=="object"){if(L.action==="abort")return b="AbortError",v=g.file,P=g.inputElem,I=L.reason,void(E(i.error)&&i.error({name:b},v,P,I));if(L.action==="skip")return void p();typeof L.config=="object"&&(g.instanceConfig=_.extend(g.instanceConfig,L.config))}else if(L==="skip")return void p()}var y=g.instanceConfig.complete;g.instanceConfig.complete=function(Y){E(y)&&y(Y,g.file,g.inputElem),p()},a.parse(g.file,g.instanceConfig)}else E(i.complete)&&i.complete()}function p(){l.splice(0,1),d()}}}function w(i){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(n){var l=Ue(n);l.chunkSize=parseInt(l.chunkSize),n.step||n.chunk||(l.chunkSize=null),this._handle=new De(l),(this._handle.streamer=this)._config=l}.call(this,i),this.parseChunk=function(n,l){if(this.isFirstChunk&&E(this._config.beforeFirstChunk)){var d=this._config.beforeFirstChunk(n);d!==void 0&&(n=d)}this.isFirstChunk=!1,this._halted=!1;var p=this._partialLine+n;this._partialLine="";var b=this._handle.parse(p,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var v=b.meta.cursor;this._finished||(this._partialLine=p.substring(v-this._baseIndex),this._baseIndex=v),b&&b.data&&(this._rowCount+=b.data.length);var P=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(u)o.postMessage({results:b,workerId:a.WORKER_ID,finished:P});else if(E(this._config.chunk)&&!l){if(this._config.chunk(b,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);b=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(b.data),this._completeResults.errors=this._completeResults.errors.concat(b.errors),this._completeResults.meta=b.meta),this._completed||!P||!E(this._config.complete)||b&&b.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),P||b&&b.meta.paused||this._nextChunk(),b}this._halted=!0},this._sendError=function(n){E(this._config.error)?this._config.error(n):u&&this._config.error&&o.postMessage({workerId:a.WORKER_ID,error:n,finished:!1})}}function N(i){var n;(i=i||{}).chunkSize||(i.chunkSize=a.RemoteChunkSize),w.call(this,i),this._nextChunk=s?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(l){this._input=l,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(n=new XMLHttpRequest,this._config.withCredentials&&(n.withCredentials=this._config.withCredentials),s||(n.onload=ce(this._chunkLoaded,this),n.onerror=ce(this._chunkError,this)),n.open(this._config.downloadRequestBody?"POST":"GET",this._input,!s),this._config.downloadRequestHeaders){var l=this._config.downloadRequestHeaders;for(var d in l)n.setRequestHeader(d,l[d])}if(this._config.chunkSize){var p=this._start+this._config.chunkSize-1;n.setRequestHeader("Range","bytes="+this._start+"-"+p)}try{n.send(this._config.downloadRequestBody)}catch(b){this._chunkError(b.message)}s&&n.status===0&&this._chunkError()}},this._chunkLoaded=function(){n.readyState===4&&(n.status<200||400<=n.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:n.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(l){var d=l.getResponseHeader("Content-Range");return d===null?-1:parseInt(d.substring(d.lastIndexOf("/")+1))}(n),this.parseChunk(n.responseText)))},this._chunkError=function(l){var d=n.statusText||l;this._sendError(new Error(d))}}function re(i){var n,l;(i=i||{}).chunkSize||(i.chunkSize=a.LocalChunkSize),w.call(this,i);var d=typeof FileReader<"u";this.stream=function(p){this._input=p,l=p.slice||p.webkitSlice||p.mozSlice,d?((n=new FileReader).onload=ce(this._chunkLoaded,this),n.onerror=ce(this._chunkError,this)):n=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var p=this._input;if(this._config.chunkSize){var b=Math.min(this._start+this._config.chunkSize,this._input.size);p=l.call(p,this._start,b)}var v=n.readAsText(p,this._config.encoding);d||this._chunkLoaded({target:{result:v}})},this._chunkLoaded=function(p){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(p.target.result)},this._chunkError=function(){this._sendError(n.error)}}function ee(i){var n;w.call(this,i=i||{}),this.stream=function(l){return n=l,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var l,d=this._config.chunkSize;return d?(l=n.substring(0,d),n=n.substring(d)):(l=n,n=""),this._finished=!n,this.parseChunk(l)}}}function ie(i){w.call(this,i=i||{});var n=[],l=!0,d=!1;this.pause=function(){w.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){w.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(p){this._input=p,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){d&&n.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),n.length?this.parseChunk(n.shift()):l=!0},this._streamData=ce(function(p){try{n.push(typeof p=="string"?p:p.toString(this._config.encoding)),l&&(l=!1,this._checkIsFinished(),this.parseChunk(n.shift()))}catch(b){this._streamError(b)}},this),this._streamError=ce(function(p){this._streamCleanUp(),this._sendError(p)},this),this._streamEnd=ce(function(){this._streamCleanUp(),d=!0,this._streamData("")},this),this._streamCleanUp=ce(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function De(i){var n,l,d,p=Math.pow(2,53),b=-p,v=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,P=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,I=this,g=0,L=0,y=!1,Y=!1,q=[],h={data:[],errors:[],meta:{}};if(E(i.step)){var R=i.step;i.step=function(m){if(h=m,U())T();else{if(T(),h.data.length===0)return;g+=m.data.length,i.preview&&g>i.preview?l.abort():(h.data=h.data[0],R(h,I))}}}function B(m){return i.skipEmptyLines==="greedy"?m.join("").trim()==="":m.length===1&&m[0].length===0}function T(){return h&&d&&(M("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+a.DefaultDelimiter+"'"),d=!1),i.skipEmptyLines&&(h.data=h.data.filter(function(m){return!B(m)})),U()&&function(){if(!h)return;function m(A,F){E(i.transformHeader)&&(A=i.transformHeader(A,F)),q.push(A)}if(Array.isArray(h.data[0])){for(var k=0;U()&&k<h.data.length;k++)h.data[k].forEach(m);h.data.splice(0,1)}else h.data.forEach(m)}(),function(){if(!h||!i.header&&!i.dynamicTyping&&!i.transform)return h;function m(A,F){var x,j=i.header?{}:[];for(x=0;x<A.length;x++){var H=x,O=A[x];i.header&&(H=x>=q.length?"__parsed_extra":q[x]),i.transform&&(O=i.transform(O,H)),O=z(H,O),H==="__parsed_extra"?(j[H]=j[H]||[],j[H].push(O)):j[H]=O}return i.header&&(x>q.length?M("FieldMismatch","TooManyFields","Too many fields: expected "+q.length+" fields but parsed "+x,L+F):x<q.length&&M("FieldMismatch","TooFewFields","Too few fields: expected "+q.length+" fields but parsed "+x,L+F)),j}var k=1;return!h.data.length||Array.isArray(h.data[0])?(h.data=h.data.map(m),k=h.data.length):h.data=m(h.data,0),i.header&&h.meta&&(h.meta.fields=q),L+=k,h}()}function U(){return i.header&&q.length===0}function z(m,k){return A=m,i.dynamicTypingFunction&&i.dynamicTyping[A]===void 0&&(i.dynamicTyping[A]=i.dynamicTypingFunction(A)),(i.dynamicTyping[A]||i.dynamicTyping)===!0?k==="true"||k==="TRUE"||k!=="false"&&k!=="FALSE"&&(function(F){if(v.test(F)){var x=parseFloat(F);if(b<x&&x<p)return!0}return!1}(k)?parseFloat(k):P.test(k)?new Date(k):k===""?null:k):k;var A}function M(m,k,A,F){var x={type:m,code:k,message:A};F!==void 0&&(x.row=F),h.errors.push(x)}this.parse=function(m,k,A){var F=i.quoteChar||'"';if(i.newline||(i.newline=function(H,O){H=H.substring(0,1048576);var V=new RegExp(S(O)+"([^]*?)"+S(O),"gm"),Q=(H=H.replace(V,"")).split("\r"),te=H.split(`
`),se=1<te.length&&te[0].length<Q[0].length;if(Q.length===1||se)return`
`;for(var J=0,$=0;$<Q.length;$++)Q[$][0]===`
`&&J++;return J>=Q.length/2?`\r
`:"\r"}(m,F)),d=!1,i.delimiter)E(i.delimiter)&&(i.delimiter=i.delimiter(m),h.meta.delimiter=i.delimiter);else{var x=function(H,O,V,Q,te){var se,J,$,D;te=te||[",","	","|",";",a.RECORD_SEP,a.UNIT_SEP];for(var he=0;he<te.length;he++){var C=te[he],be=0,oe=0,pe=0;$=void 0;for(var le=new Ae({comments:Q,delimiter:C,newline:O,preview:10}).parse(H),fe=0;fe<le.data.length;fe++)if(V&&B(le.data[fe]))pe++;else{var de=le.data[fe].length;oe+=de,$!==void 0?0<de&&(be+=Math.abs(de-$),$=de):$=de}0<le.data.length&&(oe/=le.data.length-pe),(J===void 0||be<=J)&&(D===void 0||D<oe)&&1.99<oe&&(J=be,se=C,D=oe)}return{successful:!!(i.delimiter=se),bestDelimiter:se}}(m,i.newline,i.skipEmptyLines,i.comments,i.delimitersToGuess);x.successful?i.delimiter=x.bestDelimiter:(d=!0,i.delimiter=a.DefaultDelimiter),h.meta.delimiter=i.delimiter}var j=Ue(i);return i.preview&&i.header&&j.preview++,n=m,l=new Ae(j),h=l.parse(n,k,A),T(),y?{meta:{paused:!0}}:h||{meta:{paused:!1}}},this.paused=function(){return y},this.pause=function(){y=!0,l.abort(),n=E(i.chunk)?"":n.substring(l.getCharIndex())},this.resume=function(){I.streamer._halted?(y=!1,I.streamer.parseChunk(n,!0)):setTimeout(I.resume,3)},this.aborted=function(){return Y},this.abort=function(){Y=!0,l.abort(),h.meta.aborted=!0,E(i.complete)&&i.complete(h),n=""}}function S(i){return i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ae(i){var n,l=(i=i||{}).delimiter,d=i.newline,p=i.comments,b=i.step,v=i.preview,P=i.fastMode,I=n=i.quoteChar===void 0||i.quoteChar===null?'"':i.quoteChar;if(i.escapeChar!==void 0&&(I=i.escapeChar),(typeof l!="string"||-1<a.BAD_DELIMITERS.indexOf(l))&&(l=","),p===l)throw new Error("Comment character same as delimiter");p===!0?p="#":(typeof p!="string"||-1<a.BAD_DELIMITERS.indexOf(p))&&(p=!1),d!==`
`&&d!=="\r"&&d!==`\r
`&&(d=`
`);var g=0,L=!1;this.parse=function(y,Y,q){if(typeof y!="string")throw new Error("Input must be a string");var h=y.length,R=l.length,B=d.length,T=p.length,U=E(b),z=[],M=[],m=[],k=g=0;if(!y)return G();if(i.header&&!Y){var A=y.split(d)[0].split(l),F=[],x={},j=!1;for(var H in A){var O=A[H];E(i.transformHeader)&&(O=i.transformHeader(O,H));var V=O,Q=x[O]||0;for(0<Q&&(j=!0,V=O+"_"+Q),x[O]=Q+1;F.includes(V);)V=V+"_"+Q;F.push(V)}if(j){var te=y.split(d);te[0]=F.join(l),y=te.join(d)}}if(P||P!==!1&&y.indexOf(n)===-1){for(var se=y.split(d),J=0;J<se.length;J++){if(m=se[J],g+=m.length,J!==se.length-1)g+=d.length;else if(q)return G();if(!p||m.substring(0,T)!==p){if(U){if(z=[],pe(m.split(l)),Fe(),L)return G()}else pe(m.split(l));if(v&&v<=J)return z=z.slice(0,v),G(!0)}}return G()}for(var $=y.indexOf(l,g),D=y.indexOf(d,g),he=new RegExp(S(I)+S(n),"g"),C=y.indexOf(n,g);;)if(y[g]!==n)if(p&&m.length===0&&y.substring(g,g+T)===p){if(D===-1)return G();g=D+B,D=y.indexOf(d,g),$=y.indexOf(l,g)}else if($!==-1&&($<D||D===-1))m.push(y.substring(g,$)),g=$+R,$=y.indexOf(l,g);else{if(D===-1)break;if(m.push(y.substring(g,D)),de(D+B),U&&(Fe(),L))return G();if(v&&z.length>=v)return G(!0)}else for(C=g,g++;;){if((C=y.indexOf(n,C+1))===-1)return q||M.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:z.length,index:g}),fe();if(C===h-1)return fe(y.substring(g,C).replace(he,n));if(n!==I||y[C+1]!==I){if(n===I||C===0||y[C-1]!==I){$!==-1&&$<C+1&&($=y.indexOf(l,C+1)),D!==-1&&D<C+1&&(D=y.indexOf(d,C+1));var be=le(D===-1?$:Math.min($,D));if(y.substr(C+1+be,R)===l){m.push(y.substring(g,C).replace(he,n)),y[g=C+1+be+R]!==n&&(C=y.indexOf(n,g)),$=y.indexOf(l,g),D=y.indexOf(d,g);break}var oe=le(D);if(y.substring(C+1+oe,C+1+oe+B)===d){if(m.push(y.substring(g,C).replace(he,n)),de(C+1+oe+B),$=y.indexOf(l,g),C=y.indexOf(n,g),U&&(Fe(),L))return G();if(v&&z.length>=v)return G(!0);break}M.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:z.length,index:g}),C++}}else C++}return fe();function pe(Z){z.push(Z),k=g}function le(Z){var et=0;if(Z!==-1){var qe=y.substring(C+1,Z);qe&&qe.trim()===""&&(et=qe.length)}return et}function fe(Z){return q||(Z===void 0&&(Z=y.substring(g)),m.push(Z),g=h,pe(m),U&&Fe()),G()}function de(Z){g=Z,pe(m),m=[],D=y.indexOf(d,g)}function G(Z){return{data:z,errors:M,meta:{delimiter:l,linebreak:d,aborted:L,truncated:!!Z,cursor:k+(Y||0)}}}function Fe(){b(G()),z=[],M=[]}},this.abort=function(){L=!0},this.getCharIndex=function(){return g}}function ue(i){var n=i.data,l=c[n.workerId],d=!1;if(n.error)l.userError(n.error,n.file);else if(n.results&&n.results.data){var p={abort:function(){d=!0,ye(n.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:$e,resume:$e};if(E(l.userStep)){for(var b=0;b<n.results.data.length&&(l.userStep({data:n.results.data[b],errors:n.results.errors,meta:n.results.meta},p),!d);b++);delete n.results}else E(l.userChunk)&&(l.userChunk(n.results,p,n.file),delete n.results)}n.finished&&!d&&ye(n.workerId,n.results)}function ye(i,n){var l=c[i];E(l.userComplete)&&l.userComplete(n),l.terminate(),delete c[i]}function $e(){throw new Error("Not implemented.")}function Ue(i){if(typeof i!="object"||i===null)return i;var n=Array.isArray(i)?[]:{};for(var l in i)n[l]=Ue(i[l]);return n}function ce(i,n){return function(){i.apply(n,arguments)}}function E(i){return typeof i=="function"}return u&&(o.onmessage=function(i){var n=i.data;if(a.WORKER_ID===void 0&&n&&(a.WORKER_ID=n.workerId),typeof n.input=="string")o.postMessage({workerId:a.WORKER_ID,results:a.parse(n.input,n.config),finished:!0});else if(o.File&&n.input instanceof File||n.input instanceof Object){var l=a.parse(n.input,n.config);l&&o.postMessage({workerId:a.WORKER_ID,results:l,finished:!0})}}),(N.prototype=Object.create(w.prototype)).constructor=N,(re.prototype=Object.create(w.prototype)).constructor=re,(ee.prototype=Object.create(ee.prototype)).constructor=ee,(ie.prototype=Object.create(w.prototype)).constructor=ie,a})})(tn);function nn(t){let e,r,o,s,u,c,f;return o=new Lt({}),c=new Xt({}),{c(){e=_e("main"),r=_e("div"),Le(o.$$.fragment),s=pt(),u=_e("div"),Le(c.$$.fragment)},m(a,_){ae(a,e,_),Be(e,r),Ee(o,r,null),Be(e,s),Be(e,u),Ee(c,u,null),f=!0},p:K,i(a){f||(W(o.$$.fragment,a),W(c.$$.fragment,a),f=!0)},o(a){X(o.$$.fragment,a),X(c.$$.fragment,a),f=!1},d(a){a&&ne(e),xe(o),xe(c)}}}class rn extends Se{constructor(e){super(),Re(this,e,null,nn,me,{})}}new rn({target:document.getElementById("app")});
