(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=r(i);fetch(i.href,a)}})();function $(){}function _t(t,e){for(const r in e)t[r]=e[r];return t}function At(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function mt(t){return t()}function ot(){return Object.create(null)}function $e(t){t.forEach(mt)}function yt(t){return typeof t=="function"}function we(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Rt(t){return Object.keys(t).length===0}function Re(t,e){t.appendChild(e)}function G(t,e,r){t.insertBefore(e,r||null)}function Z(t){t.parentNode&&t.parentNode.removeChild(t)}function bt(t,e){for(let r=0;r<t.length;r+=1)t[r]&&t[r].d(e)}function ne(t){return document.createElement(t)}function Je(t){return document.createTextNode(t)}function je(){return Je(" ")}function vt(){return Je("")}function ze(t,e,r,n){return t.addEventListener(e,r,n),()=>t.removeEventListener(e,r,n)}function He(t,e,r){r==null?t.removeAttribute(e):t.getAttribute(e)!==r&&t.setAttribute(e,r)}function Ht(t){return Array.from(t.childNodes)}function wt(t,e){e=""+e,t.data!==e&&(t.data=e)}function at(t,e){t.value=e??""}function ut(t,e,r){t.classList.toggle(e,!!r)}let Pe;function de(t){Pe=t}function rt(){if(!Pe)throw new Error("Function called outside component initialization");return Pe}function St(t){rt().$$.on_mount.push(t)}function Tt(t){rt().$$.on_destroy.push(t)}const Oe=[],Xe=[];let Ae=[];const ct=[],$t=Promise.resolve();let et=!1;function It(){et||(et=!0,$t.then(nt))}function tt(t){Ae.push(t)}const Ye=new Set;let Ee=0;function nt(){if(Ee!==0)return;const t=Pe;do{try{for(;Ee<Oe.length;){const e=Oe[Ee];Ee++,de(e),Lt(e.$$)}}catch(e){throw Oe.length=0,Ee=0,e}for(de(null),Oe.length=0,Ee=0;Xe.length;)Xe.pop()();for(let e=0;e<Ae.length;e+=1){const r=Ae[e];Ye.has(r)||(Ye.add(r),r())}Ae.length=0}while(Oe.length);for(;ct.length;)ct.pop()();et=!1,Ye.clear(),de(t)}function Lt(t){if(t.fragment!==null){t.update(),$e(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(tt)}}function Dt(t){const e=[],r=[];Ae.forEach(n=>t.indexOf(n)===-1?e.push(n):r.push(n)),r.forEach(n=>n()),Ae=e}const Ue=new Set;let ve;function Qe(){ve={r:0,c:[],p:ve}}function Ze(){ve.r||$e(ve.c),ve=ve.p}function Q(t,e){t&&t.i&&(Ue.delete(t),t.i(e))}function V(t,e,r,n){if(t&&t.o){if(Ue.has(t))return;Ue.add(t),ve.c.push(()=>{Ue.delete(t),n&&(r&&t.d(1),n())}),t.o(e)}else n&&n()}function Mt(t,e){const r=e.token={};function n(i,a,c,l){if(e.token!==r)return;e.resolved=l;let u=e.ctx;c!==void 0&&(u=u.slice(),u[c]=l);const d=i&&(e.current=i)(u);let k=!1;e.block&&(e.blocks?e.blocks.forEach((v,x)=>{x!==a&&v&&(Qe(),V(v,1,1,()=>{e.blocks[x]===v&&(e.blocks[x]=null)}),Ze())}):e.block.d(1),d.c(),Q(d,1),d.m(e.mount(),e.anchor),k=!0),e.block=d,e.blocks&&(e.blocks[a]=d),k&&nt()}if(At(t)){const i=rt();if(t.then(a=>{de(i),n(e.then,1,e.value,a),de(null)},a=>{if(de(i),n(e.catch,2,e.error,a),de(null),!e.hasCatch)throw a}),e.current!==e.pending)return n(e.pending,0),!0}else{if(e.current!==e.then)return n(e.then,1,e.value,t),!0;e.resolved=t}}function Pt(t,e,r){const n=e.slice(),{resolved:i}=t;t.current===t.then&&(n[t.value]=i),t.current===t.catch&&(n[t.error]=i),t.block.p(n,r)}function We(t){return t?.length!==void 0?t:Array.from(t)}function kt(t,e){const r={},n={},i={$$scope:1};let a=t.length;for(;a--;){const c=t[a],l=e[a];if(l){for(const u in c)u in l||(n[u]=1);for(const u in l)i[u]||(r[u]=l[u],i[u]=1);t[a]=l}else for(const u in c)i[u]=1}for(const c in n)c in r||(r[c]=void 0);return r}function Ct(t){return typeof t=="object"&&t!==null?t:{}}function Fe(t){t&&t.c()}function Se(t,e,r){const{fragment:n,after_update:i}=t.$$;n&&n.m(e,r),tt(()=>{const a=t.$$.on_mount.map(mt).filter(yt);t.$$.on_destroy?t.$$.on_destroy.push(...a):$e(a),t.$$.on_mount=[]}),i.forEach(tt)}function Te(t,e){const r=t.$$;r.fragment!==null&&(Dt(r.after_update),$e(r.on_destroy),r.fragment&&r.fragment.d(e),r.on_destroy=r.fragment=null,r.ctx=[])}function Ft(t,e){t.$$.dirty[0]===-1&&(Oe.push(t),It(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Ie(t,e,r,n,i,a,c,l=[-1]){const u=Pe;de(t);const d=t.$$={fragment:null,ctx:[],props:a,update:$,not_equal:i,bound:ot(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(u?u.$$.context:[])),callbacks:ot(),dirty:l,skip_bound:!1,root:e.target||u.$$.root};c&&c(d.root);let k=!1;if(d.ctx=r?r(t,e.props||{},(v,x,...z)=>{const Y=z.length?z[0]:x;return d.ctx&&i(d.ctx[v],d.ctx[v]=Y)&&(!d.skip_bound&&d.bound[v]&&d.bound[v](Y),k&&Ft(t,v)),x}):[],d.update(),k=!0,$e(d.before_update),d.fragment=n?n(d.ctx):!1,e.target){if(e.hydrate){const v=Ht(e.target);d.fragment&&d.fragment.l(v),v.forEach(Z)}else d.fragment&&d.fragment.c();e.intro&&Q(t.$$.fragment),Se(t,e.target,e.anchor),nt()}de(u)}class Le{$$=void 0;$$set=void 0;$destroy(){Te(this,1),this.$destroy=$}$on(e,r){if(!yt(r))return $;const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(r),()=>{const i=n.indexOf(r);i!==-1&&n.splice(i,1)}}$set(e){this.$$set&&!Rt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Nt="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Nt);function qe(t,e){if(!t||!e)return!1;const[r,n]=t,[i,a]=e;return r===i&&n===a}function Bt(t){const e=t.toLocaleUpperCase();if(e==="BACKSPACE"||e==="DELETE")return"delete";const r=/^[A-Z]|[1-9]$/;return e.match(r)?.length?"char":"ignore"}function Et(t){return!!location.hash.slice(1).split("_").find(n=>n===t)}class _e extends Error{constructor(e){super(e),this.name="Utils",Error.captureStackTrace&&Error.captureStackTrace(this,_e),Et("alerterrors")&&this.displayAlert()}displayAlert=()=>{window.alert(this.message)}}function Kt(t){if(!zt(t))return t;let e="";const r=t.split(/\[|\]/);let n=!1;return r.forEach(i=>{n?e+="***":e+=i,n=!n}),e}function zt(t){const e=t.match(/\[/g)?.length,r=t.match(/\[/g)?.length;if(e!==r)throw new _e(`Invalid clue format. L Brackets: ${e}, R Brackets: ${r} for clue "${t}"`);return!!e}const xe=[];function xt(t,e=$){let r;const n=new Set;function i(l){if(we(t,l)&&(t=l,r)){const u=!xe.length;for(const d of n)d[1](),xe.push(d,t);if(u){for(let d=0;d<xe.length;d+=2)xe[d][0](xe[d+1]);xe.length=0}}}function a(l){i(l(t))}function c(l,u=$){const d=[l,u];return n.add(d),n.size===1&&(r=e(i,a)||$),l(t),()=>{n.delete(d),n.size===0&&r&&(r(),r=null)}}return{set:i,update:a,subscribe:c}}const Ne=xt(),Ge=xt();class it{orientation="across";currentHead;selectedCell;static instance;constructor(){this.setOrientation=this.setOrientation.bind(this),this.getOrientation=this.getOrientation.bind(this),this.setCurrentHead=this.setCurrentHead.bind(this),Ge.subscribe(this.setCurrentHead),this.getCurrentHead=this.getCurrentHead.bind(this),this.setSelectedCell=this.setSelectedCell.bind(this),Ne.subscribe(this.setSelectedCell),this.getCurrentCell=this.getCurrentCell.bind(this)}static get(){return this.instance||(this.instance=new it),this.instance}toggleOrientation(){return this.orientation==="across"?this.orientation="down":this.orientation="across",this.orientation}setOrientation(e){this.orientation=e}getOrientation(){return this.orientation}setCurrentHead(e){this.currentHead=e?.head}getCurrentHead(){return this.currentHead}setSelectedCell(e){this.selectedCell=e?.coordinate}getCurrentCell(){return this.selectedCell}}const Me=it.get();function Ut(t){let e,r,n;return{c(){e=ne("div"),r=ne("h2"),n=Je(t[0]),He(e,"class","sticky-header svelte-13xt86h")},m(i,a){G(i,e,a),Re(e,r),Re(r,n)},p(i,[a]){a&1&&wt(n,i[0])},i:$,o:$,d(i){i&&Z(e)}}}function qt(t,e,r){let{answerKey:n}=e,{board:i}=e;const a=new Map;n.forEach(l=>{if(a.has(l.answer))throw new _e(`DUPLICATE ANSWER ${l}`);a.set(l.answer,l.clue)});let c="Click a cell you dummy!";return Ge.subscribe(l=>{if(!l||!l.head)return;const u=l.head,d=Me.getOrientation(),k=i.getAnswer(u,d);if(!k)return;const v=a.get(k);if(!v)throw new _e(`UNKNOWN ANSWER: ${k}. For head ${u}`);r(0,c=Kt(v))}),t.$$set=l=>{"answerKey"in l&&r(1,n=l.answerKey),"board"in l&&r(2,i=l.board)},[c,n,i]}class jt extends Le{constructor(e){super(),Ie(this,e,qt,Ut,we,{answerKey:1,board:2})}}class Wt{input;currentAHead;dHeads=[];nextId=1;answersMap;rows;constructor(e){this.input=e,this.answersMap=new Map,this.rows=this.makeRows(e)}getRows=()=>this.rows;getAnswer=(e,r)=>{const n=this.getAnswersMapKey(e,r);return this.answersMap.get(n)};makeRows=e=>e.map(this.processRow);processRow=(e,r)=>(this.currentAHead=void 0,e.map((i,a)=>{const c=[a,r];return this.getCellType(i)==="boarder"?this.createBoarder(c):this.createCell(c,i)}));createCell=(e,r)=>{const[n,i]=e,a=!this.currentAHead||!this.dHeads[n];if(!this.currentAHead){const c=this.input[n-1]?.[i],l=this.input[n+1]?.[i];this.currentAHead=this.getHead(e,c,l)}if(!this.dHeads[n]){const c=this.input[n]?.[i-1],l=this.input[n]?.[i+1];this.dHeads[n]=this.getHead(e,c,l)}return this.updateAnswersMap(this.currentAHead,r,"across"),this.updateAnswersMap(this.dHeads[n],r,"down"),{type:"cell",answer:r,aHead:this.currentAHead,dHead:this.dHeads[n],coordinate:e,id:a?this.nextId++:void 0}};getAnswersMapKey=(e,r)=>`x${e[0]}y${e[1]}_${r}`;updateAnswersMap=(e,r,n)=>{if(!e)return;const i=this.getAnswersMapKey(e,n);let a=this.answersMap.get(i);a||(a=""),a+=r,this.answersMap.set(i,a)};getHead=(e,r,n)=>{let i="boarder";r&&(i=this.getCellType(r));let a="boarder";if(n&&(a=this.getCellType(n)),!(i==="boarder"&&a==="boarder"))return e};createBoarder=e=>{const[r,n]=e;return this.currentAHead=void 0,this.dHeads[r]=void 0,{type:"boarder",coordinate:e}};getCellType=e=>{if(e===""||e==="xx")return"boarder";if(e.length!==1)throw new _e(`Invalid Cell! ${e}`);return"cell"}}function Jt(t){let e;return{c(){e=ne("input"),e.disabled=!0,He(e,"class","svelte-1j99cx5")},m(r,n){G(r,e,n)},p:$,i:$,o:$,d(r){r&&Z(e)}}}function Qt(t,e,r){let{coordinate:n}=e;return t.$$set=i=>{"coordinate"in i&&r(0,n=i.coordinate)},[n]}class Zt extends Le{constructor(e){super(),Ie(this,e,Qt,Jt,we,{coordinate:0})}}function Gt(t,e){const[r,n]=t;return e==="across"?[r+1,n]:[r,n+1]}function Vt(t,e){const[r,n]=t;return e==="across"?[r-1,n]:[r,n-1]}function Yt(t){let e=Me.getOrientation();const r=t.coordinate,n=Me.getCurrentCell();qe(r,n)&&(e=Me.toggleOrientation());let i;!t.aHead&&!t.dHead?console.error(`Cell ${t.coordinate} has no associated head!`):!t.aHead&&t.dHead?i=t.dHead:!t.dHead&&t.aHead?i=t.aHead:i=e==="across"?t.aHead:t.dHead,Ge.set({head:i,orientation:e}),Ne.set({coordinate:r,clear:!1})}function Xt(t){const{coordinate:e,key:r}=t,n=Bt(r);if(n==="ignore")return;const i=Me.getOrientation();if(n==="delete"){const a=Vt(e,i);Ne.set({coordinate:a,clear:!0})}if(n==="char"){const a=Gt(e,i);Ne.set({coordinate:a,clear:!1})}}function lt(t){let e,r,n,i;return{c(){e=ne("div"),r=Je(t[0]),He(e,"class","badge svelte-1e8c4e5")},m(a,c){G(a,e,c),Re(e,r),n||(i=ze(e,"click",t[6]),n=!0)},p(a,c){c&1&&wt(r,a[0])},d(a){a&&Z(e),n=!1,i()}}}function er(t){let e,r,n,i,a,c=t[0]&&lt(t);return{c(){e=ne("div"),c&&c.c(),r=je(),n=ne("input"),He(n,"class","svelte-1e8c4e5"),ut(n,"should-highlight",t[3]),He(e,"class","container svelte-1e8c4e5")},m(l,u){G(l,e,u),c&&c.m(e,null),Re(e,r),Re(e,n),at(n,t[2]),t[13](n),i||(a=[ze(n,"input",t[12]),ze(n,"keyup",t[4]),ze(n,"click",t[5])],i=!0)},p(l,[u]){l[0]?c?c.p(l,u):(c=lt(l),c.c(),c.m(e,r)):c&&(c.d(1),c=null),u&4&&n.value!==l[2]&&at(n,l[2]),u&8&&ut(n,"should-highlight",l[3])},i:$,o:$,d(l){l&&Z(e),c&&c.d(),t[13](null),i=!1,$e(a)}}}function tr(t,e,r){const n="cell";let{dHead:i=void 0}=e,{aHead:a=void 0}=e,{answer:c}=e,{coordinate:l}=e,{id:u=void 0}=e,d,k=[],v=Et("cheat")?c:"",x=!1;St(()=>{const D=Ne.subscribe(ce=>{ce&&qe(ce.coordinate,l)&&(d.focus(),ce.clear&&r(2,v=""))}),Be=Ge.subscribe(ce=>{if(!ce)return;const{head:me,orientation:ie}=ce;me&&(ie==="across"&&r(3,x=qe(a,me)),ie==="down"&&r(3,x=qe(i,me)))});k.push(D),k.push(Be)}),Tt(()=>{k.forEach(D=>D())});const z=D=>{r(2,v=v.toUpperCase()),v.length>1&&r(2,v=v.slice(-1)),Xt({coordinate:l,key:D.key})},Y=()=>{Yt({aHead:a,dHead:i,coordinate:l})},ke=()=>{d.focus(),Y()};function ue(){v=this.value,r(2,v)}function De(D){Xe[D?"unshift":"push"](()=>{d=D,r(1,d)})}return t.$$set=D=>{"dHead"in D&&r(8,i=D.dHead),"aHead"in D&&r(9,a=D.aHead),"answer"in D&&r(10,c=D.answer),"coordinate"in D&&r(11,l=D.coordinate),"id"in D&&r(0,u=D.id)},[u,d,v,x,z,Y,ke,n,i,a,c,l,ue,De]}class rr extends Le{constructor(e){super(),Ie(this,e,tr,er,we,{type:7,dHead:8,aHead:9,answer:10,coordinate:11,id:0})}get type(){return this.$$.ctx[7]}}function ft(t,e,r){const n=t.slice();return n[1]=e[r],n}function nr(t){let e,r;const n=[t[1]];let i={};for(let a=0;a<n.length;a+=1)i=_t(i,n[a]);return e=new Zt({props:i}),{c(){Fe(e.$$.fragment)},m(a,c){Se(e,a,c),r=!0},p(a,c){const l=c&1?kt(n,[Ct(a[1])]):{};e.$set(l)},i(a){r||(Q(e.$$.fragment,a),r=!0)},o(a){V(e.$$.fragment,a),r=!1},d(a){Te(e,a)}}}function ir(t){let e,r;const n=[t[1]];let i={};for(let a=0;a<n.length;a+=1)i=_t(i,n[a]);return e=new rr({props:i}),{c(){Fe(e.$$.fragment)},m(a,c){Se(e,a,c),r=!0},p(a,c){const l=c&1?kt(n,[Ct(a[1])]):{};e.$set(l)},i(a){r||(Q(e.$$.fragment,a),r=!0)},o(a){V(e.$$.fragment,a),r=!1},d(a){Te(e,a)}}}function dt(t){let e,r,n,i;const a=[ir,nr],c=[];function l(u,d){return u[1].type==="cell"?0:1}return e=l(t),r=c[e]=a[e](t),{c(){r.c(),n=vt()},m(u,d){c[e].m(u,d),G(u,n,d),i=!0},p(u,d){let k=e;e=l(u),e===k?c[e].p(u,d):(Qe(),V(c[k],1,1,()=>{c[k]=null}),Ze(),r=c[e],r?r.p(u,d):(r=c[e]=a[e](u),r.c()),Q(r,1),r.m(n.parentNode,n))},i(u){i||(Q(r),i=!0)},o(u){V(r),i=!1},d(u){u&&Z(n),c[e].d(u)}}}function sr(t){let e,r,n=We(t[0]),i=[];for(let c=0;c<n.length;c+=1)i[c]=dt(ft(t,n,c));const a=c=>V(i[c],1,1,()=>{i[c]=null});return{c(){for(let c=0;c<i.length;c+=1)i[c].c();e=vt()},m(c,l){for(let u=0;u<i.length;u+=1)i[u]&&i[u].m(c,l);G(c,e,l),r=!0},p(c,[l]){if(l&1){n=We(c[0]);let u;for(u=0;u<n.length;u+=1){const d=ft(c,n,u);i[u]?(i[u].p(d,l),Q(i[u],1)):(i[u]=dt(d),i[u].c(),Q(i[u],1),i[u].m(e.parentNode,e))}for(Qe(),u=n.length;u<i.length;u+=1)a(u);Ze()}},i(c){if(!r){for(let l=0;l<n.length;l+=1)Q(i[l]);r=!0}},o(c){i=i.filter(Boolean);for(let l=0;l<i.length;l+=1)V(i[l]);r=!1},d(c){c&&Z(e),bt(i,c)}}}function or(t,e,r){let{tiles:n}=e;return t.$$set=i=>{"tiles"in i&&r(0,n=i.tiles)},[n]}class ar extends Le{constructor(e){super(),Ie(this,e,or,sr,we,{tiles:0})}}function ht(t,e,r){const n=t.slice();return n[2]=e[r],n}function pt(t){let e,r,n,i;return e=new ar({props:{tiles:t[2]}}),{c(){Fe(e.$$.fragment),r=je(),n=ne("br")},m(a,c){Se(e,a,c),G(a,r,c),G(a,n,c),i=!0},p:$,i(a){i||(Q(e.$$.fragment,a),i=!0)},o(a){V(e.$$.fragment,a),i=!1},d(a){a&&(Z(r),Z(n)),Te(e,a)}}}function ur(t){let e,r,n=We(t[0]),i=[];for(let c=0;c<n.length;c+=1)i[c]=pt(ht(t,n,c));const a=c=>V(i[c],1,1,()=>{i[c]=null});return{c(){e=ne("div");for(let c=0;c<i.length;c+=1)i[c].c();He(e,"class","board svelte-c8o6fy")},m(c,l){G(c,e,l);for(let u=0;u<i.length;u+=1)i[u]&&i[u].m(e,null);r=!0},p(c,[l]){if(l&1){n=We(c[0]);let u;for(u=0;u<n.length;u+=1){const d=ht(c,n,u);i[u]?(i[u].p(d,l),Q(i[u],1)):(i[u]=pt(d),i[u].c(),Q(i[u],1),i[u].m(e,null))}for(Qe(),u=n.length;u<i.length;u+=1)a(u);Ze()}},i(c){if(!r){for(let l=0;l<n.length;l+=1)Q(i[l]);r=!0}},o(c){i=i.filter(Boolean);for(let l=0;l<i.length;l+=1)V(i[l]);r=!1},d(c){c&&Z(e),bt(i,c)}}}function cr(t,e,r){let{board:n}=e;const i=n.getRows();return t.$$set=a=>{"board"in a&&r(1,n=a.board)},[i,n]}class lr extends Le{constructor(e){super(),Ie(this,e,cr,ur,we,{board:1})}}var fr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Ot={exports:{}};/* @license
Papa Parse
v5.4.1
https://github.com/mholt/PapaParse
License: MIT
*/(function(t,e){(function(r,n){t.exports=n()})(fr,function r(){var n=typeof self<"u"?self:typeof window<"u"?window:n!==void 0?n:{},i=!n.document&&!!n.postMessage,a=n.IS_PAPA_WORKER||!1,c={},l=0,u={parse:function(o,s){var f=(s=s||{}).dynamicTyping||!1;if(O(f)&&(s.dynamicTypingFunction=f,f={}),s.dynamicTyping=f,s.transform=!!O(s.transform)&&s.transform,s.worker&&u.WORKERS_SUPPORTED){var h=function(){if(!u.WORKERS_SUPPORTED)return!1;var b=(U=n.URL||n.webkitURL||null,I=r.toString(),u.BLOB_URL||(u.BLOB_URL=U.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",I,")();"],{type:"text/javascript"})))),w=new n.Worker(b),U,I;return w.onmessage=D,w.id=l++,c[w.id]=w}();return h.userStep=s.step,h.userChunk=s.chunk,h.userComplete=s.complete,h.userError=s.error,s.step=O(s.step),s.chunk=O(s.chunk),s.complete=O(s.complete),s.error=O(s.error),delete s.worker,void h.postMessage({input:o,config:s,workerId:h.id})}var g=null;return u.NODE_STREAM_INPUT,typeof o=="string"?(o=function(b){return b.charCodeAt(0)===65279?b.slice(1):b}(o),g=s.download?new v(s):new z(s)):o.readable===!0&&O(o.read)&&O(o.on)?g=new Y(s):(n.File&&o instanceof File||o instanceof Object)&&(g=new x(s)),g.stream(o)},unparse:function(o,s){var f=!1,h=!0,g=",",b=`\r
`,w='"',U=w+w,I=!1,_=null,M=!1;(function(){if(typeof s=="object"){if(typeof s.delimiter!="string"||u.BAD_DELIMITERS.filter(function(p){return s.delimiter.indexOf(p)!==-1}).length||(g=s.delimiter),(typeof s.quotes=="boolean"||typeof s.quotes=="function"||Array.isArray(s.quotes))&&(f=s.quotes),typeof s.skipEmptyLines!="boolean"&&typeof s.skipEmptyLines!="string"||(I=s.skipEmptyLines),typeof s.newline=="string"&&(b=s.newline),typeof s.quoteChar=="string"&&(w=s.quoteChar),typeof s.header=="boolean"&&(h=s.header),Array.isArray(s.columns)){if(s.columns.length===0)throw new Error("Option columns is empty");_=s.columns}s.escapeChar!==void 0&&(U=s.escapeChar+w),(typeof s.escapeFormulae=="boolean"||s.escapeFormulae instanceof RegExp)&&(M=s.escapeFormulae instanceof RegExp?s.escapeFormulae:/^[=+\-@\t\r].*$/)}})();var y=new RegExp(ue(w),"g");if(typeof o=="string"&&(o=JSON.parse(o)),Array.isArray(o)){if(!o.length||Array.isArray(o[0]))return se(null,o,I);if(typeof o[0]=="object")return se(_||Object.keys(o[0]),o,I)}else if(typeof o=="object")return typeof o.data=="string"&&(o.data=JSON.parse(o.data)),Array.isArray(o.data)&&(o.fields||(o.fields=o.meta&&o.meta.fields||_),o.fields||(o.fields=Array.isArray(o.data[0])?o.fields:typeof o.data[0]=="object"?Object.keys(o.data[0]):[]),Array.isArray(o.data[0])||typeof o.data[0]=="object"||(o.data=[o.data])),se(o.fields||[],o.data||[],I);throw new Error("Unable to serialize unrecognized input");function se(p,H,W){var L="";typeof p=="string"&&(p=JSON.parse(p)),typeof H=="string"&&(H=JSON.parse(H));var q=Array.isArray(p)&&0<p.length,B=!Array.isArray(H[0]);if(q&&h){for(var K=0;K<p.length;K++)0<K&&(L+=g),L+=j(p[K],K);0<H.length&&(L+=b)}for(var m=0;m<H.length;m++){var C=q?p.length:H[m].length,S=!1,N=q?Object.keys(H[m]).length===0:H[m].length===0;if(W&&!q&&(S=W==="greedy"?H[m].join("").trim()==="":H[m].length===1&&H[m][0].length===0),W==="greedy"&&q){for(var A=[],J=0;J<C;J++){var P=B?p[J]:J;A.push(H[m][P])}S=A.join("").trim()===""}if(!S){for(var R=0;R<C;R++){0<R&&!N&&(L+=g);var oe=q&&B?p[R]:R;L+=j(H[m][oe],R)}m<H.length-1&&(!W||0<C&&!N)&&(L+=b)}}return L}function j(p,H){if(p==null)return"";if(p.constructor===Date)return JSON.stringify(p).slice(1,25);var W=!1;M&&typeof p=="string"&&M.test(p)&&(p="'"+p,W=!0);var L=p.toString().replace(y,U);return(W=W||f===!0||typeof f=="function"&&f(p,H)||Array.isArray(f)&&f[H]||function(q,B){for(var K=0;K<B.length;K++)if(-1<q.indexOf(B[K]))return!0;return!1}(L,u.BAD_DELIMITERS)||-1<L.indexOf(g)||L.charAt(0)===" "||L.charAt(L.length-1)===" ")?w+L+w:L}}};if(u.RECORD_SEP=String.fromCharCode(30),u.UNIT_SEP=String.fromCharCode(31),u.BYTE_ORDER_MARK="\uFEFF",u.BAD_DELIMITERS=["\r",`
`,'"',u.BYTE_ORDER_MARK],u.WORKERS_SUPPORTED=!i&&!!n.Worker,u.NODE_STREAM_INPUT=1,u.LocalChunkSize=10485760,u.RemoteChunkSize=5242880,u.DefaultDelimiter=",",u.Parser=De,u.ParserHandle=ke,u.NetworkStreamer=v,u.FileStreamer=x,u.StringStreamer=z,u.ReadableStreamStreamer=Y,n.jQuery){var d=n.jQuery;d.fn.parse=function(o){var s=o.config||{},f=[];return this.each(function(b){if(!(d(this).prop("tagName").toUpperCase()==="INPUT"&&d(this).attr("type").toLowerCase()==="file"&&n.FileReader)||!this.files||this.files.length===0)return!0;for(var w=0;w<this.files.length;w++)f.push({file:this.files[w],inputElem:this,instanceConfig:d.extend({},s)})}),h(),this;function h(){if(f.length!==0){var b,w,U,I,_=f[0];if(O(o.before)){var M=o.before(_.file,_.inputElem);if(typeof M=="object"){if(M.action==="abort")return b="AbortError",w=_.file,U=_.inputElem,I=M.reason,void(O(o.error)&&o.error({name:b},w,U,I));if(M.action==="skip")return void g();typeof M.config=="object"&&(_.instanceConfig=d.extend(_.instanceConfig,M.config))}else if(M==="skip")return void g()}var y=_.instanceConfig.complete;_.instanceConfig.complete=function(se){O(y)&&y(se,_.file,_.inputElem),g()},u.parse(_.file,_.instanceConfig)}else O(o.complete)&&o.complete()}function g(){f.splice(0,1),h()}}}function k(o){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(s){var f=me(s);f.chunkSize=parseInt(f.chunkSize),s.step||s.chunk||(f.chunkSize=null),this._handle=new ke(f),(this._handle.streamer=this)._config=f}.call(this,o),this.parseChunk=function(s,f){if(this.isFirstChunk&&O(this._config.beforeFirstChunk)){var h=this._config.beforeFirstChunk(s);h!==void 0&&(s=h)}this.isFirstChunk=!1,this._halted=!1;var g=this._partialLine+s;this._partialLine="";var b=this._handle.parse(g,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var w=b.meta.cursor;this._finished||(this._partialLine=g.substring(w-this._baseIndex),this._baseIndex=w),b&&b.data&&(this._rowCount+=b.data.length);var U=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(a)n.postMessage({results:b,workerId:u.WORKER_ID,finished:U});else if(O(this._config.chunk)&&!f){if(this._config.chunk(b,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);b=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(b.data),this._completeResults.errors=this._completeResults.errors.concat(b.errors),this._completeResults.meta=b.meta),this._completed||!U||!O(this._config.complete)||b&&b.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),U||b&&b.meta.paused||this._nextChunk(),b}this._halted=!0},this._sendError=function(s){O(this._config.error)?this._config.error(s):a&&this._config.error&&n.postMessage({workerId:u.WORKER_ID,error:s,finished:!1})}}function v(o){var s;(o=o||{}).chunkSize||(o.chunkSize=u.RemoteChunkSize),k.call(this,o),this._nextChunk=i?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(f){this._input=f,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(s=new XMLHttpRequest,this._config.withCredentials&&(s.withCredentials=this._config.withCredentials),i||(s.onload=ie(this._chunkLoaded,this),s.onerror=ie(this._chunkError,this)),s.open(this._config.downloadRequestBody?"POST":"GET",this._input,!i),this._config.downloadRequestHeaders){var f=this._config.downloadRequestHeaders;for(var h in f)s.setRequestHeader(h,f[h])}if(this._config.chunkSize){var g=this._start+this._config.chunkSize-1;s.setRequestHeader("Range","bytes="+this._start+"-"+g)}try{s.send(this._config.downloadRequestBody)}catch(b){this._chunkError(b.message)}i&&s.status===0&&this._chunkError()}},this._chunkLoaded=function(){s.readyState===4&&(s.status<200||400<=s.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:s.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(f){var h=f.getResponseHeader("Content-Range");return h===null?-1:parseInt(h.substring(h.lastIndexOf("/")+1))}(s),this.parseChunk(s.responseText)))},this._chunkError=function(f){var h=s.statusText||f;this._sendError(new Error(h))}}function x(o){var s,f;(o=o||{}).chunkSize||(o.chunkSize=u.LocalChunkSize),k.call(this,o);var h=typeof FileReader<"u";this.stream=function(g){this._input=g,f=g.slice||g.webkitSlice||g.mozSlice,h?((s=new FileReader).onload=ie(this._chunkLoaded,this),s.onerror=ie(this._chunkError,this)):s=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var g=this._input;if(this._config.chunkSize){var b=Math.min(this._start+this._config.chunkSize,this._input.size);g=f.call(g,this._start,b)}var w=s.readAsText(g,this._config.encoding);h||this._chunkLoaded({target:{result:w}})},this._chunkLoaded=function(g){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(g.target.result)},this._chunkError=function(){this._sendError(s.error)}}function z(o){var s;k.call(this,o=o||{}),this.stream=function(f){return s=f,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var f,h=this._config.chunkSize;return h?(f=s.substring(0,h),s=s.substring(h)):(f=s,s=""),this._finished=!s,this.parseChunk(f)}}}function Y(o){k.call(this,o=o||{});var s=[],f=!0,h=!1;this.pause=function(){k.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){k.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(g){this._input=g,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){h&&s.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),s.length?this.parseChunk(s.shift()):f=!0},this._streamData=ie(function(g){try{s.push(typeof g=="string"?g:g.toString(this._config.encoding)),f&&(f=!1,this._checkIsFinished(),this.parseChunk(s.shift()))}catch(b){this._streamError(b)}},this),this._streamError=ie(function(g){this._streamCleanUp(),this._sendError(g)},this),this._streamEnd=ie(function(){this._streamCleanUp(),h=!0,this._streamData("")},this),this._streamCleanUp=ie(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function ke(o){var s,f,h,g=Math.pow(2,53),b=-g,w=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,U=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,I=this,_=0,M=0,y=!1,se=!1,j=[],p={data:[],errors:[],meta:{}};if(O(o.step)){var H=o.step;o.step=function(m){if(p=m,q())L();else{if(L(),p.data.length===0)return;_+=m.data.length,o.preview&&_>o.preview?f.abort():(p.data=p.data[0],H(p,I))}}}function W(m){return o.skipEmptyLines==="greedy"?m.join("").trim()==="":m.length===1&&m[0].length===0}function L(){return p&&h&&(K("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+u.DefaultDelimiter+"'"),h=!1),o.skipEmptyLines&&(p.data=p.data.filter(function(m){return!W(m)})),q()&&function(){if(!p)return;function m(S,N){O(o.transformHeader)&&(S=o.transformHeader(S,N)),j.push(S)}if(Array.isArray(p.data[0])){for(var C=0;q()&&C<p.data.length;C++)p.data[C].forEach(m);p.data.splice(0,1)}else p.data.forEach(m)}(),function(){if(!p||!o.header&&!o.dynamicTyping&&!o.transform)return p;function m(S,N){var A,J=o.header?{}:[];for(A=0;A<S.length;A++){var P=A,R=S[A];o.header&&(P=A>=j.length?"__parsed_extra":j[A]),o.transform&&(R=o.transform(R,P)),R=B(P,R),P==="__parsed_extra"?(J[P]=J[P]||[],J[P].push(R)):J[P]=R}return o.header&&(A>j.length?K("FieldMismatch","TooManyFields","Too many fields: expected "+j.length+" fields but parsed "+A,M+N):A<j.length&&K("FieldMismatch","TooFewFields","Too few fields: expected "+j.length+" fields but parsed "+A,M+N)),J}var C=1;return!p.data.length||Array.isArray(p.data[0])?(p.data=p.data.map(m),C=p.data.length):p.data=m(p.data,0),o.header&&p.meta&&(p.meta.fields=j),M+=C,p}()}function q(){return o.header&&j.length===0}function B(m,C){return S=m,o.dynamicTypingFunction&&o.dynamicTyping[S]===void 0&&(o.dynamicTyping[S]=o.dynamicTypingFunction(S)),(o.dynamicTyping[S]||o.dynamicTyping)===!0?C==="true"||C==="TRUE"||C!=="false"&&C!=="FALSE"&&(function(N){if(w.test(N)){var A=parseFloat(N);if(b<A&&A<g)return!0}return!1}(C)?parseFloat(C):U.test(C)?new Date(C):C===""?null:C):C;var S}function K(m,C,S,N){var A={type:m,code:C,message:S};N!==void 0&&(A.row=N),p.errors.push(A)}this.parse=function(m,C,S){var N=o.quoteChar||'"';if(o.newline||(o.newline=function(P,R){P=P.substring(0,1048576);var oe=new RegExp(ue(R)+"([^]*?)"+ue(R),"gm"),X=(P=P.replace(oe,"")).split("\r"),ae=P.split(`
`),le=1<ae.length&&ae[0].length<X[0].length;if(X.length===1||le)return`
`;for(var ee=0,T=0;T<X.length;T++)X[T][0]===`
`&&ee++;return ee>=X.length/2?`\r
`:"\r"}(m,N)),h=!1,o.delimiter)O(o.delimiter)&&(o.delimiter=o.delimiter(m),p.meta.delimiter=o.delimiter);else{var A=function(P,R,oe,X,ae){var le,ee,T,F;ae=ae||[",","	","|",";",u.RECORD_SEP,u.UNIT_SEP];for(var ye=0;ye<ae.length;ye++){var E=ae[ye],Ce=0,fe=0,be=0;T=void 0;for(var he=new De({comments:X,delimiter:E,newline:R,preview:10}).parse(P),pe=0;pe<he.data.length;pe++)if(oe&&W(he.data[pe]))be++;else{var ge=he.data[pe].length;fe+=ge,T!==void 0?0<ge&&(Ce+=Math.abs(ge-T),T=ge):T=ge}0<he.data.length&&(fe/=he.data.length-be),(ee===void 0||Ce<=ee)&&(F===void 0||F<fe)&&1.99<fe&&(ee=Ce,le=E,F=fe)}return{successful:!!(o.delimiter=le),bestDelimiter:le}}(m,o.newline,o.skipEmptyLines,o.comments,o.delimitersToGuess);A.successful?o.delimiter=A.bestDelimiter:(h=!0,o.delimiter=u.DefaultDelimiter),p.meta.delimiter=o.delimiter}var J=me(o);return o.preview&&o.header&&J.preview++,s=m,f=new De(J),p=f.parse(s,C,S),L(),y?{meta:{paused:!0}}:p||{meta:{paused:!1}}},this.paused=function(){return y},this.pause=function(){y=!0,f.abort(),s=O(o.chunk)?"":s.substring(f.getCharIndex())},this.resume=function(){I.streamer._halted?(y=!1,I.streamer.parseChunk(s,!0)):setTimeout(I.resume,3)},this.aborted=function(){return se},this.abort=function(){se=!0,f.abort(),p.meta.aborted=!0,O(o.complete)&&o.complete(p),s=""}}function ue(o){return o.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function De(o){var s,f=(o=o||{}).delimiter,h=o.newline,g=o.comments,b=o.step,w=o.preview,U=o.fastMode,I=s=o.quoteChar===void 0||o.quoteChar===null?'"':o.quoteChar;if(o.escapeChar!==void 0&&(I=o.escapeChar),(typeof f!="string"||-1<u.BAD_DELIMITERS.indexOf(f))&&(f=","),g===f)throw new Error("Comment character same as delimiter");g===!0?g="#":(typeof g!="string"||-1<u.BAD_DELIMITERS.indexOf(g))&&(g=!1),h!==`
`&&h!=="\r"&&h!==`\r
`&&(h=`
`);var _=0,M=!1;this.parse=function(y,se,j){if(typeof y!="string")throw new Error("Input must be a string");var p=y.length,H=f.length,W=h.length,L=g.length,q=O(b),B=[],K=[],m=[],C=_=0;if(!y)return te();if(o.header&&!se){var S=y.split(h)[0].split(f),N=[],A={},J=!1;for(var P in S){var R=S[P];O(o.transformHeader)&&(R=o.transformHeader(R,P));var oe=R,X=A[R]||0;for(0<X&&(J=!0,oe=R+"_"+X),A[R]=X+1;N.includes(oe);)oe=oe+"_"+X;N.push(oe)}if(J){var ae=y.split(h);ae[0]=N.join(f),y=ae.join(h)}}if(U||U!==!1&&y.indexOf(s)===-1){for(var le=y.split(h),ee=0;ee<le.length;ee++){if(m=le[ee],_+=m.length,ee!==le.length-1)_+=h.length;else if(j)return te();if(!g||m.substring(0,L)!==g){if(q){if(B=[],be(m.split(f)),Ke(),M)return te()}else be(m.split(f));if(w&&w<=ee)return B=B.slice(0,w),te(!0)}}return te()}for(var T=y.indexOf(f,_),F=y.indexOf(h,_),ye=new RegExp(ue(I)+ue(s),"g"),E=y.indexOf(s,_);;)if(y[_]!==s)if(g&&m.length===0&&y.substring(_,_+L)===g){if(F===-1)return te();_=F+W,F=y.indexOf(h,_),T=y.indexOf(f,_)}else if(T!==-1&&(T<F||F===-1))m.push(y.substring(_,T)),_=T+H,T=y.indexOf(f,_);else{if(F===-1)break;if(m.push(y.substring(_,F)),ge(F+W),q&&(Ke(),M))return te();if(w&&B.length>=w)return te(!0)}else for(E=_,_++;;){if((E=y.indexOf(s,E+1))===-1)return j||K.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:B.length,index:_}),pe();if(E===p-1)return pe(y.substring(_,E).replace(ye,s));if(s!==I||y[E+1]!==I){if(s===I||E===0||y[E-1]!==I){T!==-1&&T<E+1&&(T=y.indexOf(f,E+1)),F!==-1&&F<E+1&&(F=y.indexOf(h,E+1));var Ce=he(F===-1?T:Math.min(T,F));if(y.substr(E+1+Ce,H)===f){m.push(y.substring(_,E).replace(ye,s)),y[_=E+1+Ce+H]!==s&&(E=y.indexOf(s,_)),T=y.indexOf(f,_),F=y.indexOf(h,_);break}var fe=he(F);if(y.substring(E+1+fe,E+1+fe+W)===h){if(m.push(y.substring(_,E).replace(ye,s)),ge(E+1+fe+W),T=y.indexOf(f,_),E=y.indexOf(s,_),q&&(Ke(),M))return te();if(w&&B.length>=w)return te(!0);break}K.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:B.length,index:_}),E++}}else E++}return pe();function be(re){B.push(re),C=_}function he(re){var st=0;if(re!==-1){var Ve=y.substring(E+1,re);Ve&&Ve.trim()===""&&(st=Ve.length)}return st}function pe(re){return j||(re===void 0&&(re=y.substring(_)),m.push(re),_=p,be(m),q&&Ke()),te()}function ge(re){_=re,be(m),m=[],F=y.indexOf(h,_)}function te(re){return{data:B,errors:K,meta:{delimiter:f,linebreak:h,aborted:M,truncated:!!re,cursor:C+(se||0)}}}function Ke(){b(te()),B=[],K=[]}},this.abort=function(){M=!0},this.getCharIndex=function(){return _}}function D(o){var s=o.data,f=c[s.workerId],h=!1;if(s.error)f.userError(s.error,s.file);else if(s.results&&s.results.data){var g={abort:function(){h=!0,Be(s.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:ce,resume:ce};if(O(f.userStep)){for(var b=0;b<s.results.data.length&&(f.userStep({data:s.results.data[b],errors:s.results.errors,meta:s.results.meta},g),!h);b++);delete s.results}else O(f.userChunk)&&(f.userChunk(s.results,g,s.file),delete s.results)}s.finished&&!h&&Be(s.workerId,s.results)}function Be(o,s){var f=c[o];O(f.userComplete)&&f.userComplete(s),f.terminate(),delete c[o]}function ce(){throw new Error("Not implemented.")}function me(o){if(typeof o!="object"||o===null)return o;var s=Array.isArray(o)?[]:{};for(var f in o)s[f]=me(o[f]);return s}function ie(o,s){return function(){o.apply(s,arguments)}}function O(o){return typeof o=="function"}return a&&(n.onmessage=function(o){var s=o.data;if(u.WORKER_ID===void 0&&s&&(u.WORKER_ID=s.workerId),typeof s.input=="string")n.postMessage({workerId:u.WORKER_ID,results:u.parse(s.input,s.config),finished:!0});else if(n.File&&s.input instanceof File||s.input instanceof Object){var f=u.parse(s.input,s.config);f&&n.postMessage({workerId:u.WORKER_ID,results:f,finished:!0})}}),(v.prototype=Object.create(k.prototype)).constructor=v,(x.prototype=Object.create(k.prototype)).constructor=x,(z.prototype=Object.create(z.prototype)).constructor=z,(Y.prototype=Object.create(k.prototype)).constructor=Y,u})})(Ot);var dr=Ot.exports;class gt{csv=[];path;isRead=!1;areHeadersPresent=!1;validator;constructor(e,r,n){this.path=e,this.areHeadersPresent=!!n,r&&(this.validator=i=>{const a=r(i);if(a!==!0)throw new _e(`Invalid cell in ${this.path}. ${a}: ${JSON.stringify(i)}`)})}ingest=async()=>{if(this.isRead)return;const r=await(await fetch(this.path)).text();dr.parse(r,{header:this.areHeadersPresent,complete:this.onParse,delimitersToGuess:["|","	"],transform:this.trimCell,transformHeader:this.trimCell})};trimCell=e=>e.trim();onParse=e=>{console.log(`Finished parsing ${this.path}`);const r=e.errors.filter(n=>n.code!=="UndetectableDelimiter");if(r.length)throw console.error(r),new _e("Parse Error");this.validator&&e.data.map(this.validator),this.csv=e.data};getCsv=()=>this.csv}function hr(t){return{c:$,m:$,p:$,i:$,o:$,d:$}}function pr(t){let e,r,n,i,a,c;return e=new jt({props:{answerKey:t[0].getCsv(),board:t[1]}}),a=new lr({props:{board:t[1]}}),{c(){Fe(e.$$.fragment),r=je(),n=ne("br"),i=je(),Fe(a.$$.fragment)},m(l,u){Se(e,l,u),G(l,r,u),G(l,n,u),G(l,i,u),Se(a,l,u),c=!0},p(l,u){const d={};u&1&&(d.answerKey=l[0].getCsv()),u&2&&(d.board=l[1]),e.$set(d);const k={};u&2&&(k.board=l[1]),a.$set(k)},i(l){c||(Q(e.$$.fragment,l),Q(a.$$.fragment,l),c=!0)},o(l){V(e.$$.fragment,l),V(a.$$.fragment,l),c=!1},d(l){l&&(Z(r),Z(n),Z(i)),Te(e,l),Te(a,l)}}}function gr(t){let e;return{c(){e=ne("p"),e.textContent="Loading..."},m(r,n){G(r,e,n)},p:$,i:$,o:$,d(r){r&&Z(e)}}}function _r(t){let e,r,n,i={ctx:t,current:null,token:null,hasCatch:!1,pending:gr,then:pr,catch:hr,value:8,blocks:[,,,]};return Mt(t[2],i),{c(){e=ne("main"),r=ne("div"),i.block.c()},m(a,c){G(a,e,c),Re(e,r),i.block.m(r,i.anchor=null),i.mount=()=>r,i.anchor=null,n=!0},p(a,[c]){t=a,Pt(i,t,c)},i(a){n||(Q(i.block),n=!0)},o(a){for(let c=0;c<3;c+=1){const l=i.blocks[c];V(l)}n=!1},d(a){a&&Z(e),i.block.d(),i.token=null,i=null}}}const mr="/board.csv",yr="/answerKey.csv";function br(t,e,r){let n,i;const a=v=>{if(!Array.isArray(v))return"Data is not an array!";let x;return v.forEach(z=>{if(x)return;if(typeof z!="string"){x=`${JSON.stringify(z)} is not a string!`;return}const Y=z==="xx",ke=z==="",ue=z.length===1;Y||ke||ue||(x=`${JSON.stringify(z)} is not a cell or border!`)}),x||!0},c=v=>{const x=JSON.stringify(v);return typeof v!="object"?x+" is not an object!":v?"clue"in v?"answer"in v?v.answer.match(/[a-zA-Z]+/)?!0:x+" does not format answer correctly!":x+" does not have an answer!":x+" does not have a clue!":x+" is falsy!"};n=new gt(mr,a,!1);const l=n.ingest();i=new gt(yr,c,!0);const u=i.ingest(),d=Promise.all([l,u]);let k;return l.then(()=>{const v=n.getCsv();r(1,k=new Wt(v))}),[i,k,d]}class vr extends Le{constructor(e){super(),Ie(this,e,br,_r,we,{})}}new vr({target:document.getElementById("app")});