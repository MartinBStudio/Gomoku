(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=o(i);fetch(i.href,r)}})();window.Vaadin=window.Vaadin||{};window.Vaadin.featureFlags=window.Vaadin.featureFlags||{};window.Vaadin.featureFlags.exampleFeatureFlag=!1;window.Vaadin.featureFlags.collaborationEngineBackend=!1;window.Vaadin.featureFlags.sideNavComponent=!0;const Mi="modulepreload",Vi=function(t,e){return new URL(t,e).href},on={},E=function(e,o,n){if(!o||o.length===0)return e();const i=document.getElementsByTagName("link");return Promise.all(o.map(r=>{if(r=Vi(r,n),r in on)return;on[r]=!0;const s=r.endsWith(".css"),l=s?'[rel="stylesheet"]':"";if(!!n)for(let c=i.length-1;c>=0;c--){const m=i[c];if(m.href===r&&(!s||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${l}`))return;const d=document.createElement("link");if(d.rel=s?"stylesheet":Mi,s||(d.as="script",d.crossOrigin=""),d.href=r,document.head.appendChild(d),s)return new Promise((c,m)=>{d.addEventListener("load",c),d.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>e())};function xt(t){return t=t||[],Array.isArray(t)?t:[t]}function Y(t){return`[Vaadin.Router] ${t}`}function zi(t){if(typeof t!="object")return String(t);const e=Object.prototype.toString.call(t).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(t)}`:e}const St="module",Et="nomodule",wo=[St,Et];function nn(t){if(!t.match(/.+\.[m]?js$/))throw new Error(Y(`Unsupported type for bundle "${t}": .js or .mjs expected.`))}function Qn(t){if(!t||!K(t.path))throw new Error(Y('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=t.bundle,o=["component","redirect","bundle"];if(!ge(t.action)&&!Array.isArray(t.children)&&!ge(t.children)&&!Ct(e)&&!o.some(n=>K(t[n])))throw new Error(Y(`Expected route config "${t.path}" to include either "${o.join('", "')}" or "action" function but none found.`));if(e)if(K(e))nn(e);else if(wo.some(n=>n in e))wo.forEach(n=>n in e&&nn(e[n]));else throw new Error(Y('Expected route bundle to include either "'+Et+'" or "'+St+'" keys, or both'));t.redirect&&["bundle","component"].forEach(n=>{n in t&&console.warn(Y(`Route config "${t.path}" has both "redirect" and "${n}" properties, and "redirect" will always override the latter. Did you mean to only use "${n}"?`))})}function rn(t){xt(t).forEach(e=>Qn(e))}function sn(t,e){let o=document.head.querySelector('script[src="'+t+'"][async]');return o||(o=document.createElement("script"),o.setAttribute("src",t),e===St?o.setAttribute("type",St):e===Et&&o.setAttribute(Et,""),o.async=!0),new Promise((n,i)=>{o.onreadystatechange=o.onload=r=>{o.__dynamicImportLoaded=!0,n(r)},o.onerror=r=>{o.parentNode&&o.parentNode.removeChild(o),i(r)},o.parentNode===null?document.head.appendChild(o):o.__dynamicImportLoaded&&n()})}function Di(t){return K(t)?sn(t):Promise.race(wo.filter(e=>e in t).map(e=>sn(t[e],e)))}function Be(t,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${t}`,{cancelable:t==="go",detail:e}))}function Ct(t){return typeof t=="object"&&!!t}function ge(t){return typeof t=="function"}function K(t){return typeof t=="string"}function Zn(t){const e=new Error(Y(`Page not found (${t.pathname})`));return e.context=t,e.code=404,e}const Ae=new class{};function Ui(t){const e=t.port,o=t.protocol,r=o==="http:"&&e==="80"||o==="https:"&&e==="443"?t.hostname:t.host;return`${o}//${r}`}function an(t){if(t.defaultPrevented||t.button!==0||t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)return;let e=t.target;const o=t.composedPath?t.composedPath():t.path||[];for(let l=0;l<o.length;l++){const a=o[l];if(a.nodeName&&a.nodeName.toLowerCase()==="a"){e=a;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||Ui(e))!==window.location.origin)return;const{pathname:i,search:r,hash:s}=e;Be("go",{pathname:i,search:r,hash:s})&&(t.preventDefault(),t&&t.type==="click"&&window.scrollTo(0,0))}const ji={activate(){window.document.addEventListener("click",an)},inactivate(){window.document.removeEventListener("click",an)}},Fi=/Trident/.test(navigator.userAgent);Fi&&!ge(window.PopStateEvent)&&(window.PopStateEvent=function(t,e){e=e||{};var o=document.createEvent("Event");return o.initEvent(t,!!e.bubbles,!!e.cancelable),o.state=e.state||null,o},window.PopStateEvent.prototype=window.Event.prototype);function ln(t){if(t.state==="vaadin-router-ignore")return;const{pathname:e,search:o,hash:n}=window.location;Be("go",{pathname:e,search:o,hash:n})}const Bi={activate(){window.addEventListener("popstate",ln)},inactivate(){window.removeEventListener("popstate",ln)}};var De=ri,Hi=Po,qi=Yi,Wi=oi,Gi=ii,ei="/",ti="./",Ki=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function Po(t,e){for(var o=[],n=0,i=0,r="",s=e&&e.delimiter||ei,l=e&&e.delimiters||ti,a=!1,d;(d=Ki.exec(t))!==null;){var c=d[0],m=d[1],h=d.index;if(r+=t.slice(i,h),i=h+c.length,m){r+=m[1],a=!0;continue}var v="",re=t[i],se=d[2],te=d[3],jt=d[4],B=d[5];if(!a&&r.length){var X=r.length-1;l.indexOf(r[X])>-1&&(v=r[X],r=r.slice(0,X))}r&&(o.push(r),r="",a=!1);var Se=v!==""&&re!==void 0&&re!==v,Ee=B==="+"||B==="*",Ft=B==="?"||B==="*",oe=v||s,it=te||jt;o.push({name:se||n++,prefix:v,delimiter:oe,optional:Ft,repeat:Ee,partial:Se,pattern:it?Ji(it):"[^"+ae(oe)+"]+?"})}return(r||i<t.length)&&o.push(r+t.substr(i)),o}function Yi(t,e){return oi(Po(t,e))}function oi(t){for(var e=new Array(t.length),o=0;o<t.length;o++)typeof t[o]=="object"&&(e[o]=new RegExp("^(?:"+t[o].pattern+")$"));return function(n,i){for(var r="",s=i&&i.encode||encodeURIComponent,l=0;l<t.length;l++){var a=t[l];if(typeof a=="string"){r+=a;continue}var d=n?n[a.name]:void 0,c;if(Array.isArray(d)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but got array');if(d.length===0){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var m=0;m<d.length;m++){if(c=s(d[m],a),!e[l].test(c))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'"');r+=(m===0?a.prefix:a.delimiter)+c}continue}if(typeof d=="string"||typeof d=="number"||typeof d=="boolean"){if(c=s(String(d),a),!e[l].test(c))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but got "'+c+'"');r+=a.prefix+c;continue}if(a.optional){a.partial&&(r+=a.prefix);continue}throw new TypeError('Expected "'+a.name+'" to be '+(a.repeat?"an array":"a string"))}return r}}function ae(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function Ji(t){return t.replace(/([=!:$/()])/g,"\\$1")}function ni(t){return t&&t.sensitive?"":"i"}function Xi(t,e){if(!e)return t;var o=t.source.match(/\((?!\?)/g);if(o)for(var n=0;n<o.length;n++)e.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return t}function Qi(t,e,o){for(var n=[],i=0;i<t.length;i++)n.push(ri(t[i],e,o).source);return new RegExp("(?:"+n.join("|")+")",ni(o))}function Zi(t,e,o){return ii(Po(t,o),e,o)}function ii(t,e,o){o=o||{};for(var n=o.strict,i=o.start!==!1,r=o.end!==!1,s=ae(o.delimiter||ei),l=o.delimiters||ti,a=[].concat(o.endsWith||[]).map(ae).concat("$").join("|"),d=i?"^":"",c=t.length===0,m=0;m<t.length;m++){var h=t[m];if(typeof h=="string")d+=ae(h),c=m===t.length-1&&l.indexOf(h[h.length-1])>-1;else{var v=h.repeat?"(?:"+h.pattern+")(?:"+ae(h.delimiter)+"(?:"+h.pattern+"))*":h.pattern;e&&e.push(h),h.optional?h.partial?d+=ae(h.prefix)+"("+v+")?":d+="(?:"+ae(h.prefix)+"("+v+"))?":d+=ae(h.prefix)+"("+v+")"}}return r?(n||(d+="(?:"+s+")?"),d+=a==="$"?"$":"(?="+a+")"):(n||(d+="(?:"+s+"(?="+a+"))?"),c||(d+="(?="+s+"|"+a+")")),new RegExp(d,ni(o))}function ri(t,e,o){return t instanceof RegExp?Xi(t,e):Array.isArray(t)?Qi(t,e,o):Zi(t,e,o)}De.parse=Hi;De.compile=qi;De.tokensToFunction=Wi;De.tokensToRegExp=Gi;const{hasOwnProperty:er}=Object.prototype,xo=new Map;xo.set("|false",{keys:[],pattern:/(?:)/});function dn(t){try{return decodeURIComponent(t)}catch{return t}}function tr(t,e,o,n,i){o=!!o;const r=`${t}|${o}`;let s=xo.get(r);if(!s){const d=[];s={keys:d,pattern:De(t,d,{end:o,strict:t===""})},xo.set(r,s)}const l=s.pattern.exec(e);if(!l)return null;const a=Object.assign({},i);for(let d=1;d<l.length;d++){const c=s.keys[d-1],m=c.name,h=l[d];(h!==void 0||!er.call(a,m))&&(c.repeat?a[m]=h?h.split(c.delimiter).map(dn):[]:a[m]=h&&dn(h))}return{path:l[0],keys:(n||[]).concat(s.keys),params:a}}function si(t,e,o,n,i){let r,s,l=0,a=t.path||"";return a.charAt(0)==="/"&&(o&&(a=a.substr(1)),o=!0),{next(d){if(t===d)return{done:!0};const c=t.__children=t.__children||t.children;if(!r&&(r=tr(a,e,!c,n,i),r))return{done:!1,value:{route:t,keys:r.keys,params:r.params,path:r.path}};if(r&&c)for(;l<c.length;){if(!s){const h=c[l];h.parent=t;let v=r.path.length;v>0&&e.charAt(v)==="/"&&(v+=1),s=si(h,e.substr(v),o,r.keys,r.params)}const m=s.next(d);if(!m.done)return{done:!1,value:m.value};s=null,l++}return{done:!0}}}}function or(t){if(ge(t.route.action))return t.route.action(t)}function nr(t,e){let o=e;for(;o;)if(o=o.parent,o===t)return!0;return!1}function ir(t){let e=`Path '${t.pathname}' is not properly resolved due to an error.`;const o=(t.route||{}).path;return o&&(e+=` Resolution had failed on route: '${o}'`),e}function rr(t,e){const{route:o,path:n}=e;if(o&&!o.__synthetic){const i={path:n,route:o};if(!t.chain)t.chain=[];else if(o.parent){let r=t.chain.length;for(;r--&&t.chain[r].route&&t.chain[r].route!==o.parent;)t.chain.pop()}t.chain.push(i)}}class qe{constructor(e,o={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=o.baseUrl||"",this.errorHandler=o.errorHandler,this.resolveRoute=o.resolveRoute||or,this.context=Object.assign({resolver:this},o.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){rn(e);const o=[...xt(e)];this.root.__children=o}addRoutes(e){return rn(e),this.root.__children.push(...xt(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const o=Object.assign({},this.context,K(e)?{pathname:e}:e),n=si(this.root,this.__normalizePathname(o.pathname),this.baseUrl),i=this.resolveRoute;let r=null,s=null,l=o;function a(d,c=r.value.route,m){const h=m===null&&r.value.route;return r=s||n.next(h),s=null,!d&&(r.done||!nr(c,r.value.route))?(s=r,Promise.resolve(Ae)):r.done?Promise.reject(Zn(o)):(l=Object.assign(l?{chain:l.chain?l.chain.slice(0):[]}:{},o,r.value),rr(l,r.value),Promise.resolve(i(l)).then(v=>v!=null&&v!==Ae?(l.result=v.result||v,l):a(d,c,v)))}return o.next=a,Promise.resolve().then(()=>a(!0,this.root)).catch(d=>{const c=ir(l);if(d?console.warn(c):d=new Error(c),d.context=d.context||l,d instanceof DOMException||(d.code=d.code||500),this.errorHandler)return l.result=this.errorHandler(d),l;throw d})}static __createUrl(e,o){return new URL(e,o)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const o=this.__effectiveBaseUrl,n=this.constructor.__createUrl(e,o).href;if(n.slice(0,o.length)===o)return n.slice(o.length)}}qe.pathToRegexp=De;const{pathToRegexp:cn}=qe,hn=new Map;function ai(t,e,o){const n=e.name||e.component;if(n&&(t.has(n)?t.get(n).push(e):t.set(n,[e])),Array.isArray(o))for(let i=0;i<o.length;i++){const r=o[i];r.parent=e,ai(t,r,r.__children||r.children)}}function un(t,e){const o=t.get(e);if(o&&o.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return o&&o[0]}function pn(t){let e=t.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function sr(t,e={}){if(!(t instanceof qe))throw new TypeError("An instance of Resolver is expected");const o=new Map;return(n,i)=>{let r=un(o,n);if(!r&&(o.clear(),ai(o,t.root,t.root.__children),r=un(o,n),!r))throw new Error(`Route "${n}" not found`);let s=hn.get(r.fullPath);if(!s){let a=pn(r),d=r.parent;for(;d;){const v=pn(d);v&&(a=v.replace(/\/$/,"")+"/"+a.replace(/^\//,"")),d=d.parent}const c=cn.parse(a),m=cn.tokensToFunction(c),h=Object.create(null);for(let v=0;v<c.length;v++)K(c[v])||(h[c[v].name]=!0);s={toPath:m,keys:h},hn.set(a,s),r.fullPath=a}let l=s.toPath(i,e)||"/";if(e.stringifyQueryParams&&i){const a={},d=Object.keys(i);for(let m=0;m<d.length;m++){const h=d[m];s.keys[h]||(a[h]=i[h])}const c=e.stringifyQueryParams(a);c&&(l+=c.charAt(0)==="?"?c:`?${c}`)}return l}}let mn=[];function ar(t){mn.forEach(e=>e.inactivate()),t.forEach(e=>e.activate()),mn=t}const lr=t=>{const e=getComputedStyle(t).getPropertyValue("animation-name");return e&&e!=="none"},dr=(t,e)=>{const o=()=>{t.removeEventListener("animationend",o),e()};t.addEventListener("animationend",o)};function vn(t,e){return t.classList.add(e),new Promise(o=>{if(lr(t)){const n=t.getBoundingClientRect(),i=`height: ${n.bottom-n.top}px; width: ${n.right-n.left}px`;t.setAttribute("style",`position: absolute; ${i}`),dr(t,()=>{t.classList.remove(e),t.removeAttribute("style"),o()})}else t.classList.remove(e),o()})}const cr=256;function Wt(t){return t!=null}function hr(t){const e=Object.assign({},t);return delete e.next,e}function W({pathname:t="",search:e="",hash:o="",chain:n=[],params:i={},redirectFrom:r,resolver:s},l){const a=n.map(d=>d.route);return{baseUrl:s&&s.baseUrl||"",pathname:t,search:e,hash:o,routes:a,route:l||a.length&&a[a.length-1]||null,params:i,redirectFrom:r,getUrl:(d={})=>ft(le.pathToRegexp.compile(li(a))(Object.assign({},i,d)),s)}}function fn(t,e){const o=Object.assign({},t.params);return{redirect:{pathname:e,from:t.pathname,params:o}}}function ur(t,e){e.location=W(t);const o=t.chain.map(n=>n.route).indexOf(t.route);return t.chain[o].element=e,e}function vt(t,e,o){if(ge(t))return t.apply(o,e)}function gn(t,e,o){return n=>{if(n&&(n.cancel||n.redirect))return n;if(o)return vt(o[t],e,o)}}function pr(t,e){if(!Array.isArray(t)&&!Ct(t))throw new Error(Y(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${t}`));e.__children=[];const o=xt(t);for(let n=0;n<o.length;n++)Qn(o[n]),e.__children.push(o[n])}function dt(t){if(t&&t.length){const e=t[0].parentNode;for(let o=0;o<t.length;o++)e.removeChild(t[o])}}function ft(t,e){const o=e.__effectiveBaseUrl;return o?e.constructor.__createUrl(t.replace(/^\//,""),o).pathname:t}function li(t){return t.map(e=>e.path).reduce((e,o)=>o.length?e.replace(/\/$/,"")+"/"+o.replace(/^\//,""):e,"")}class le extends qe{constructor(e,o){const n=document.head.querySelector("base"),i=n&&n.getAttribute("href");super([],Object.assign({baseUrl:i&&qe.__createUrl(i,document.URL).pathname.replace(/[^\/]*$/,"")},o)),this.resolveRoute=s=>this.__resolveRoute(s);const r=le.NavigationTrigger;le.setTriggers.apply(le,Object.keys(r).map(s=>r[s])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=W({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const o=e.route;let n=Promise.resolve();ge(o.children)&&(n=n.then(()=>o.children(hr(e))).then(r=>{!Wt(r)&&!ge(o.children)&&(r=o.children),pr(r,o)}));const i={redirect:r=>fn(e,r),component:r=>{const s=document.createElement(r);return this.__createdByRouter.set(s,!0),s}};return n.then(()=>{if(this.__isLatestRender(e))return vt(o.action,[e,i],o)}).then(r=>{if(Wt(r)&&(r instanceof HTMLElement||r.redirect||r===Ae))return r;if(K(o.redirect))return i.redirect(o.redirect);if(o.bundle)return Di(o.bundle).then(()=>{},()=>{throw new Error(Y(`Bundle not found: ${o.bundle}. Check if the file name is correct`))})}).then(r=>{if(Wt(r))return r;if(K(o.component))return i.component(o.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,o=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),o||this.__onNavigationEvent(),this.ready}render(e,o){const n=++this.__lastStartedRenderId,i=Object.assign({search:"",hash:""},K(e)?{pathname:e}:e,{__renderId:n});return this.ready=this.resolve(i).then(r=>this.__fullyResolveChain(r)).then(r=>{if(this.__isLatestRender(r)){const s=this.__previousContext;if(r===s)return this.__updateBrowserHistory(s,!0),this.location;if(this.location=W(r),o&&this.__updateBrowserHistory(r,n===1),Be("location-changed",{router:this,location:this.location}),r.__skipAttach)return this.__copyUnchangedElements(r,s),this.__previousContext=r,this.location;this.__addAppearingContent(r,s);const l=this.__animateIfNeeded(r);return this.__runOnAfterEnterCallbacks(r),this.__runOnAfterLeaveCallbacks(r,s),l.then(()=>{if(this.__isLatestRender(r))return this.__removeDisappearingContent(),this.__previousContext=r,this.location})}}).catch(r=>{if(n===this.__lastStartedRenderId)throw o&&this.__updateBrowserHistory(i),dt(this.__outlet&&this.__outlet.children),this.location=W(Object.assign(i,{resolver:this})),Be("error",Object.assign({router:this,error:r},i)),r}),this.ready}__fullyResolveChain(e,o=e){return this.__findComponentContextAfterAllRedirects(o).then(n=>{const r=n!==o?n:e,l=ft(li(n.chain),n.resolver)===n.pathname,a=(d,c=d.route,m)=>d.next(void 0,c,m).then(h=>h===null||h===Ae?l?d:c.parent!==null?a(d,c.parent,h):h:h);return a(n).then(d=>{if(d===null||d===Ae)throw Zn(r);return d&&d!==Ae&&d!==n?this.__fullyResolveChain(r,d):this.__amendWithOnBeforeCallbacks(n)})})}__findComponentContextAfterAllRedirects(e){const o=e.result;return o instanceof HTMLElement?(ur(e,o),Promise.resolve(e)):o.redirect?this.__redirect(o.redirect,e.__redirectCount,e.__renderId).then(n=>this.__findComponentContextAfterAllRedirects(n)):o instanceof Error?Promise.reject(o):Promise.reject(new Error(Y(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${zi(o)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(o=>o===this.__previousContext||o===e?o:this.__fullyResolveChain(o))}__runOnBeforeCallbacks(e){const o=this.__previousContext||{},n=o.chain||[],i=e.chain;let r=Promise.resolve();const s=()=>({cancel:!0}),l=a=>fn(e,a);if(e.__divergedChainIndex=0,e.__skipAttach=!1,n.length){for(let a=0;a<Math.min(n.length,i.length)&&!(n[a].route!==i[a].route||n[a].path!==i[a].path&&n[a].element!==i[a].element||!this.__isReusableElement(n[a].element,i[a].element));a=++e.__divergedChainIndex);if(e.__skipAttach=i.length===n.length&&e.__divergedChainIndex==i.length&&this.__isReusableElement(e.result,o.result),e.__skipAttach){for(let a=i.length-1;a>=0;a--)r=this.__runOnBeforeLeaveCallbacks(r,e,{prevent:s},n[a]);for(let a=0;a<i.length;a++)r=this.__runOnBeforeEnterCallbacks(r,e,{prevent:s,redirect:l},i[a]),n[a].element.location=W(e,n[a].route)}else for(let a=n.length-1;a>=e.__divergedChainIndex;a--)r=this.__runOnBeforeLeaveCallbacks(r,e,{prevent:s},n[a])}if(!e.__skipAttach)for(let a=0;a<i.length;a++)a<e.__divergedChainIndex?a<n.length&&n[a].element&&(n[a].element.location=W(e,n[a].route)):(r=this.__runOnBeforeEnterCallbacks(r,e,{prevent:s,redirect:l},i[a]),i[a].element&&(i[a].element.location=W(e,i[a].route)));return r.then(a=>{if(a){if(a.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(a.redirect)return this.__redirect(a.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,o,n,i){const r=W(o);return e.then(s=>{if(this.__isLatestRender(o))return gn("onBeforeLeave",[r,n,this],i.element)(s)}).then(s=>{if(!(s||{}).redirect)return s})}__runOnBeforeEnterCallbacks(e,o,n,i){const r=W(o,i.route);return e.then(s=>{if(this.__isLatestRender(o))return gn("onBeforeEnter",[r,n,this],i.element)(s)})}__isReusableElement(e,o){return e&&o?this.__createdByRouter.get(e)&&this.__createdByRouter.get(o)?e.localName===o.localName:e===o:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,o,n){if(o>cr)throw new Error(Y(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(o||0)+1,__renderId:n})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(Y(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:o="",hash:n=""},i){if(window.location.pathname!==e||window.location.search!==o||window.location.hash!==n){const r=i?"replaceState":"pushState";window.history[r](null,document.title,e+o+n),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,o){let n=this.__outlet;for(let i=0;i<e.__divergedChainIndex;i++){const r=o&&o.chain[i].element;if(r)if(r.parentNode===n)e.chain[i].element=r,n=r;else break}return n}__addAppearingContent(e,o){this.__ensureOutlet(),this.__removeAppearingContent();const n=this.__copyUnchangedElements(e,o);this.__appearingContent=[],this.__disappearingContent=Array.from(n.children).filter(r=>this.__addedByRouter.get(r)&&r!==e.result);let i=n;for(let r=e.__divergedChainIndex;r<e.chain.length;r++){const s=e.chain[r].element;s&&(i.appendChild(s),this.__addedByRouter.set(s,!0),i===n&&this.__appearingContent.push(s),i=s)}}__removeDisappearingContent(){this.__disappearingContent&&dt(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(dt(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,o){if(o)for(let n=o.chain.length-1;n>=e.__divergedChainIndex&&this.__isLatestRender(e);n--){const i=o.chain[n].element;if(i)try{const r=W(e);vt(i.onAfterLeave,[r,{},o.resolver],i)}finally{this.__disappearingContent.indexOf(i)>-1&&dt(i.children)}}}__runOnAfterEnterCallbacks(e){for(let o=e.__divergedChainIndex;o<e.chain.length&&this.__isLatestRender(e);o++){const n=e.chain[o].element||{},i=W(e,e.chain[o].route);vt(n.onAfterEnter,[i,{},e.resolver],n)}}__animateIfNeeded(e){const o=(this.__disappearingContent||[])[0],n=(this.__appearingContent||[])[0],i=[],r=e.chain;let s;for(let l=r.length;l>0;l--)if(r[l-1].route.animate){s=r[l-1].route.animate;break}if(o&&n&&s){const l=Ct(s)&&s.leave||"leaving",a=Ct(s)&&s.enter||"entering";i.push(vn(o,l)),i.push(vn(n,a))}return Promise.all(i).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:o,search:n,hash:i}=e?e.detail:window.location;K(this.__normalizePathname(o))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:o,search:n,hash:i},!0))}static setTriggers(...e){ar(e)}urlForName(e,o){return this.__urlForName||(this.__urlForName=sr(this)),ft(this.__urlForName(e,o),this)}urlForPath(e,o){return ft(le.pathToRegexp.compile(e)(o),this)}static go(e){const{pathname:o,search:n,hash:i}=K(e)?this.__createUrl(e,"http://a"):e;return Be("go",{pathname:o,search:n,hash:i})}}const mr=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,gt=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function vr(){function t(){return!0}return di(t)}function fr(){try{return gr()?!0:yr()?gt?!br():!vr():!1}catch{return!1}}function gr(){return localStorage.getItem("vaadin.developmentmode.force")}function yr(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function br(){return!!(gt&&Object.keys(gt).map(e=>gt[e]).filter(e=>e.productionMode).length>0)}function di(t,e){if(typeof t!="function")return;const o=mr.exec(t.toString());if(o)try{t=new Function(o[1])}catch(n){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",n)}return t(e)}window.Vaadin=window.Vaadin||{};const yn=function(t,e){if(window.Vaadin.developmentMode)return di(t,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=fr());function _r(){}const wr=function(){if(typeof yn=="function")return yn(_r)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.4"});wr();le.NavigationTrigger={POPSTATE:Bi,CLICK:ji};var Gt,$;(function(t){t.CONNECTED="connected",t.LOADING="loading",t.RECONNECTING="reconnecting",t.CONNECTION_LOST="connection-lost"})($||($={}));class xr{constructor(e){this.stateChangeListeners=new Set,this.loadingCount=0,this.connectionState=e,this.serviceWorkerMessageListener=this.serviceWorkerMessageListener.bind(this),navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",this.serviceWorkerMessageListener),navigator.serviceWorker.ready.then(o=>{var n;(n=o==null?void 0:o.active)===null||n===void 0||n.postMessage({method:"Vaadin.ServiceWorker.isConnectionLost",id:"Vaadin.ServiceWorker.isConnectionLost"})}))}addStateChangeListener(e){this.stateChangeListeners.add(e)}removeStateChangeListener(e){this.stateChangeListeners.delete(e)}loadingStarted(){this.state=$.LOADING,this.loadingCount+=1}loadingFinished(){this.decreaseLoadingCount($.CONNECTED)}loadingFailed(){this.decreaseLoadingCount($.CONNECTION_LOST)}decreaseLoadingCount(e){this.loadingCount>0&&(this.loadingCount-=1,this.loadingCount===0&&(this.state=e))}get state(){return this.connectionState}set state(e){if(e!==this.connectionState){const o=this.connectionState;this.connectionState=e,this.loadingCount=0;for(const n of this.stateChangeListeners)n(o,this.connectionState)}}get online(){return this.connectionState===$.CONNECTED||this.connectionState===$.LOADING}get offline(){return!this.online}serviceWorkerMessageListener(e){typeof e.data=="object"&&e.data.id==="Vaadin.ServiceWorker.isConnectionLost"&&(e.data.result===!0&&(this.state=$.CONNECTION_LOST),navigator.serviceWorker.removeEventListener("message",this.serviceWorkerMessageListener))}}const Sr=t=>!!(t==="localhost"||t==="[::1]"||t.match(/^127\.\d+\.\d+\.\d+$/)),ct=window;if(!(!((Gt=ct.Vaadin)===null||Gt===void 0)&&Gt.connectionState)){let t;Sr(window.location.hostname)?t=!0:t=navigator.onLine,ct.Vaadin=ct.Vaadin||{},ct.Vaadin.connectionState=new xr(t?$.CONNECTED:$.CONNECTION_LOST)}function j(t,e,o,n){var i=arguments.length,r=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,o):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,o,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(r=(i<3?s(r):i>3?s(e,o,r):s(e,o))||r);return i>3&&r&&Object.defineProperty(e,o,r),r}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Er=!1,yt=window,Ao=yt.ShadowRoot&&(yt.ShadyCSS===void 0||yt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Io=Symbol(),bn=new WeakMap;class Ro{constructor(e,o,n){if(this._$cssResult$=!0,n!==Io)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this._strings=o}get styleSheet(){let e=this._styleSheet;const o=this._strings;if(Ao&&e===void 0){const n=o!==void 0&&o.length===1;n&&(e=bn.get(o)),e===void 0&&((this._styleSheet=e=new CSSStyleSheet).replaceSync(this.cssText),n&&bn.set(o,e))}return e}toString(){return this.cssText}}const Cr=t=>{if(t._$cssResult$===!0)return t.cssText;if(typeof t=="number")return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)},ci=t=>new Ro(typeof t=="string"?t:String(t),void 0,Io),w=(t,...e)=>{const o=t.length===1?t[0]:e.reduce((n,i,r)=>n+Cr(i)+t[r+1],t[0]);return new Ro(o,t,Io)},kr=(t,e)=>{Ao?t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet):e.forEach(o=>{const n=document.createElement("style"),i=yt.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=o.cssText,t.appendChild(n)})},$r=t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return ci(e)},_n=Ao||Er?t=>t:t=>t instanceof CSSStyleSheet?$r(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Kt,Yt,Jt,hi;const Z=window;let ui,de;const wn=Z.trustedTypes,Tr=wn?wn.emptyScript:"",bt=Z.reactiveElementPolyfillSupportDevMode;{const t=(Kt=Z.litIssuedWarnings)!==null&&Kt!==void 0?Kt:Z.litIssuedWarnings=new Set;de=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))},de("dev-mode","Lit is in dev mode. Not recommended for production!"),!((Yt=Z.ShadyDOM)===null||Yt===void 0)&&Yt.inUse&&bt===void 0&&de("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded."),ui=e=>({then:(o,n)=>{de("request-update-promise",`The \`requestUpdate\` method should no longer return a Promise but does so on \`${e}\`. Use \`updateComplete\` instead.`),o!==void 0&&o(!1)}})}const Xt=t=>{Z.emitLitDebugLogEvents&&Z.dispatchEvent(new CustomEvent("lit-debug",{detail:t}))},pi=(t,e)=>t,So={toAttribute(t,e){switch(e){case Boolean:t=t?Tr:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t);break}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}break}return o}},mi=(t,e)=>e!==t&&(e===e||t===t),Qt={attribute:!0,type:String,converter:So,reflect:!1,hasChanged:mi},Eo="finalized";class ee extends HTMLElement{constructor(){super(),this.__instanceProperties=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this._initialize()}static addInitializer(e){var o;this.finalize(),((o=this._initializers)!==null&&o!==void 0?o:this._initializers=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((o,n)=>{const i=this.__attributeNameForProperty(n,o);i!==void 0&&(this.__attributeToPropertyMap.set(i,n),e.push(i))}),e}static createProperty(e,o=Qt){var n;if(o.state&&(o.attribute=!1),this.finalize(),this.elementProperties.set(e,o),!o.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():`__${e}`,r=this.getPropertyDescriptor(e,i,o);r!==void 0&&(Object.defineProperty(this.prototype,e,r),this.hasOwnProperty("__reactivePropertyKeys")||(this.__reactivePropertyKeys=new Set((n=this.__reactivePropertyKeys)!==null&&n!==void 0?n:[])),this.__reactivePropertyKeys.add(e))}}static getPropertyDescriptor(e,o,n){return{get(){return this[o]},set(i){const r=this[e];this[o]=i,this.requestUpdate(e,r,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Qt}static finalize(){if(this.hasOwnProperty(Eo))return!1;this[Eo]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e._initializers!==void 0&&(this._initializers=[...e._initializers]),this.elementProperties=new Map(e.elementProperties),this.__attributeToPropertyMap=new Map,this.hasOwnProperty(pi("properties"))){const o=this.properties,n=[...Object.getOwnPropertyNames(o),...Object.getOwnPropertySymbols(o)];for(const i of n)this.createProperty(i,o[i])}this.elementStyles=this.finalizeStyles(this.styles);{const o=(n,i=!1)=>{this.prototype.hasOwnProperty(n)&&de(i?"renamed-api":"removed-api",`\`${n}\` is implemented on class ${this.name}. It has been ${i?"renamed":"removed"} in this version of LitElement.`)};o("initialize"),o("requestUpdateInternal"),o("_getUpdateComplete",!0)}return!0}static finalizeStyles(e){const o=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const i of n)o.unshift(_n(i))}else e!==void 0&&o.push(_n(e));return o}static __attributeNameForProperty(e,o){const n=o.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}_initialize(){var e;this.__updatePromise=new Promise(o=>this.enableUpdating=o),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),(e=this.constructor._initializers)===null||e===void 0||e.forEach(o=>o(this))}addController(e){var o,n;((o=this.__controllers)!==null&&o!==void 0?o:this.__controllers=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((n=e.hostConnected)===null||n===void 0||n.call(e))}removeController(e){var o;(o=this.__controllers)===null||o===void 0||o.splice(this.__controllers.indexOf(e)>>>0,1)}__saveInstanceProperties(){this.constructor.elementProperties.forEach((e,o)=>{this.hasOwnProperty(o)&&(this.__instanceProperties.set(o,this[o]),delete this[o])})}createRenderRoot(){var e;const o=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return kr(o,this.constructor.elementStyles),o}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this.__controllers)===null||e===void 0||e.forEach(o=>{var n;return(n=o.hostConnected)===null||n===void 0?void 0:n.call(o)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this.__controllers)===null||e===void 0||e.forEach(o=>{var n;return(n=o.hostDisconnected)===null||n===void 0?void 0:n.call(o)})}attributeChangedCallback(e,o,n){this._$attributeToProperty(e,n)}__propertyToAttribute(e,o,n=Qt){var i;const r=this.constructor.__attributeNameForProperty(e,n);if(r!==void 0&&n.reflect===!0){const l=(((i=n.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?n.converter:So).toAttribute(o,n.type);this.constructor.enabledWarnings.indexOf("migration")>=0&&l===void 0&&de("undefined-attribute-value",`The attribute value for the ${e} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`),this.__reflectingProperty=e,l==null?this.removeAttribute(r):this.setAttribute(r,l),this.__reflectingProperty=null}}_$attributeToProperty(e,o){var n;const i=this.constructor,r=i.__attributeToPropertyMap.get(e);if(r!==void 0&&this.__reflectingProperty!==r){const s=i.getPropertyOptions(r),l=typeof s.converter=="function"?{fromAttribute:s.converter}:((n=s.converter)===null||n===void 0?void 0:n.fromAttribute)!==void 0?s.converter:So;this.__reflectingProperty=r,this[r]=l.fromAttribute(o,s.type),this.__reflectingProperty=null}}requestUpdate(e,o,n){let i=!0;return e!==void 0&&(n=n||this.constructor.getPropertyOptions(e),(n.hasChanged||mi)(this[e],o)?(this._$changedProperties.has(e)||this._$changedProperties.set(e,o),n.reflect===!0&&this.__reflectingProperty!==e&&(this.__reflectingProperties===void 0&&(this.__reflectingProperties=new Map),this.__reflectingProperties.set(e,n))):i=!1),!this.isUpdatePending&&i&&(this.__updatePromise=this.__enqueueUpdate()),ui(this.localName)}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch(o){Promise.reject(o)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e,o;if(!this.isUpdatePending)return;if(Xt==null||Xt({kind:"update"}),!this.hasUpdated){const r=[];if((e=this.constructor.__reactivePropertyKeys)===null||e===void 0||e.forEach(s=>{var l;this.hasOwnProperty(s)&&!(!((l=this.__instanceProperties)===null||l===void 0)&&l.has(s))&&r.push(s)}),r.length)throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${r.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}this.__instanceProperties&&(this.__instanceProperties.forEach((r,s)=>this[s]=r),this.__instanceProperties=void 0);let n=!1;const i=this._$changedProperties;try{n=this.shouldUpdate(i),n?(this.willUpdate(i),(o=this.__controllers)===null||o===void 0||o.forEach(r=>{var s;return(s=r.hostUpdate)===null||s===void 0?void 0:s.call(r)}),this.update(i)):this.__markUpdated()}catch(r){throw n=!1,this.__markUpdated(),r}n&&this._$didUpdate(i)}willUpdate(e){}_$didUpdate(e){var o;(o=this.__controllers)===null||o===void 0||o.forEach(n=>{var i;return(i=n.hostUpdated)===null||i===void 0?void 0:i.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e),this.isUpdatePending&&this.constructor.enabledWarnings.indexOf("change-in-update")>=0&&de("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(e){return!0}update(e){this.__reflectingProperties!==void 0&&(this.__reflectingProperties.forEach((o,n)=>this.__propertyToAttribute(n,this[n],o)),this.__reflectingProperties=void 0),this.__markUpdated()}updated(e){}firstUpdated(e){}}hi=Eo;ee[hi]=!0;ee.elementProperties=new Map;ee.elementStyles=[];ee.shadowRootOptions={mode:"open"};bt==null||bt({ReactiveElement:ee});{ee.enabledWarnings=["change-in-update"];const t=function(e){e.hasOwnProperty(pi("enabledWarnings"))||(e.enabledWarnings=e.enabledWarnings.slice())};ee.enableWarning=function(e){t(this),this.enabledWarnings.indexOf(e)<0&&this.enabledWarnings.push(e)},ee.disableWarning=function(e){t(this);const o=this.enabledWarnings.indexOf(e);o>=0&&this.enabledWarnings.splice(o,1)}}((Jt=Z.reactiveElementVersions)!==null&&Jt!==void 0?Jt:Z.reactiveElementVersions=[]).push("1.6.2");Z.reactiveElementVersions.length>1&&de("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Zt,eo,to,oo;const U=window,g=t=>{U.emitLitDebugLogEvents&&U.dispatchEvent(new CustomEvent("lit-debug",{detail:t}))};let Nr=0,kt;(Zt=U.litIssuedWarnings)!==null&&Zt!==void 0||(U.litIssuedWarnings=new Set),kt=(t,e)=>{e+=t?` See https://lit.dev/msg/${t} for more information.`:"",U.litIssuedWarnings.has(e)||(console.warn(e),U.litIssuedWarnings.add(e))},kt("dev-mode","Lit is in dev mode. Not recommended for production!");const H=!((eo=U.ShadyDOM)===null||eo===void 0)&&eo.inUse&&((to=U.ShadyDOM)===null||to===void 0?void 0:to.noPatch)===!0?U.ShadyDOM.wrap:t=>t,Oe=U.trustedTypes,xn=Oe?Oe.createPolicy("lit-html",{createHTML:t=>t}):void 0,Pr=t=>t,Vt=(t,e,o)=>Pr,Ar=t=>{if(_e!==Vt)throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");_e=t},Ir=()=>{_e=Vt},Co=(t,e,o)=>_e(t,e,o),ko="$lit$",ne=`lit$${String(Math.random()).slice(9)}$`,vi="?"+ne,Rr=`<${vi}>`,ye=document,We=()=>ye.createComment(""),Ge=t=>t===null||typeof t!="object"&&typeof t!="function",fi=Array.isArray,Or=t=>fi(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",no=`[ 	
\f\r]`,Lr=`[^ 	
\f\r"'\`<>=]`,Mr=`[^\\s"'>=/]`,Ue=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Sn=1,io=2,Vr=3,En=/-->/g,Cn=/>/g,me=new RegExp(`>|${no}(?:(${Mr}+)(${no}*=${no}*(?:${Lr}|("|')|))|$)`,"g"),zr=0,kn=1,Dr=2,$n=3,ro=/'/g,so=/"/g,gi=/^(?:script|style|textarea|title)$/i,Ur=1,$t=2,Oo=1,Tt=2,jr=3,Fr=4,Br=5,Lo=6,Hr=7,yi=t=>(e,...o)=>(e.some(n=>n===void 0)&&console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`),{_$litType$:t,strings:e,values:o}),f=yi(Ur),Ne=yi($t),be=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),Tn=new WeakMap,fe=ye.createTreeWalker(ye,129,null,!1);let _e=Vt;function bi(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw")){let o="invalid template strings array";throw o=`
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g,`
`),new Error(o)}return xn!==void 0?xn.createHTML(e):e}const qr=(t,e)=>{const o=t.length-1,n=[];let i=e===$t?"<svg>":"",r,s=Ue;for(let a=0;a<o;a++){const d=t[a];let c=-1,m,h=0,v;for(;h<d.length&&(s.lastIndex=h,v=s.exec(d),v!==null);)if(h=s.lastIndex,s===Ue){if(v[Sn]==="!--")s=En;else if(v[Sn]!==void 0)s=Cn;else if(v[io]!==void 0)gi.test(v[io])&&(r=new RegExp(`</${v[io]}`,"g")),s=me;else if(v[Vr]!==void 0)throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else s===me?v[zr]===">"?(s=r??Ue,c=-1):v[kn]===void 0?c=-2:(c=s.lastIndex-v[Dr].length,m=v[kn],s=v[$n]===void 0?me:v[$n]==='"'?so:ro):s===so||s===ro?s=me:s===En||s===Cn?s=Ue:(s=me,r=void 0);console.assert(c===-1||s===me||s===ro||s===so,"unexpected parse state B");const re=s===me&&t[a+1].startsWith("/>")?" ":"";i+=s===Ue?d+Rr:c>=0?(n.push(m),d.slice(0,c)+ko+d.slice(c)+ne+re):d+ne+(c===-2?(n.push(void 0),a):re)}const l=i+(t[o]||"<?>")+(e===$t?"</svg>":"");return[bi(t,l),n]};class Ke{constructor({strings:e,["_$litType$"]:o},n){this.parts=[];let i,r=0,s=0;const l=e.length-1,a=this.parts,[d,c]=qr(e,o);if(this.el=Ke.createElement(d,n),fe.currentNode=this.el.content,o===$t){const m=this.el.content,h=m.firstChild;h.remove(),m.append(...h.childNodes)}for(;(i=fe.nextNode())!==null&&a.length<l;){if(i.nodeType===1){{const m=i.localName;if(/^(?:textarea|template)$/i.test(m)&&i.innerHTML.includes(ne)){const h=`Expressions are not supported inside \`${m}\` elements. See https://lit.dev/msg/expression-in-${m} for more information.`;if(m==="template")throw new Error(h);kt("",h)}}if(i.hasAttributes()){const m=[];for(const h of i.getAttributeNames())if(h.endsWith(ko)||h.startsWith(ne)){const v=c[s++];if(m.push(h),v!==void 0){const se=i.getAttribute(v.toLowerCase()+ko).split(ne),te=/([.?@])?(.*)/.exec(v);a.push({type:Oo,index:r,name:te[2],strings:se,ctor:te[1]==="."?Gr:te[1]==="?"?Yr:te[1]==="@"?Jr:zt})}else a.push({type:Lo,index:r})}for(const h of m)i.removeAttribute(h)}if(gi.test(i.tagName)){const m=i.textContent.split(ne),h=m.length-1;if(h>0){i.textContent=Oe?Oe.emptyScript:"";for(let v=0;v<h;v++)i.append(m[v],We()),fe.nextNode(),a.push({type:Tt,index:++r});i.append(m[h],We())}}}else if(i.nodeType===8)if(i.data===vi)a.push({type:Tt,index:r});else{let h=-1;for(;(h=i.data.indexOf(ne,h+1))!==-1;)a.push({type:Hr,index:r}),h+=ne.length-1}r++}g==null||g({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:e})}static createElement(e,o){const n=ye.createElement("template");return n.innerHTML=e,n}}function Le(t,e,o=t,n){var i,r,s,l;if(e===be)return e;let a=n!==void 0?(i=o.__directives)===null||i===void 0?void 0:i[n]:o.__directive;const d=Ge(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==d&&((r=a==null?void 0:a._$notifyDirectiveConnectionChanged)===null||r===void 0||r.call(a,!1),d===void 0?a=void 0:(a=new d(t),a._$initialize(t,o,n)),n!==void 0?((s=(l=o).__directives)!==null&&s!==void 0?s:l.__directives=[])[n]=a:o.__directive=a),a!==void 0&&(e=Le(t,a._$resolve(t,e.values),a,n)),e}class Wr{constructor(e,o){this._$parts=[],this._$disconnectableChildren=void 0,this._$template=e,this._$parent=o}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(e){var o;const{el:{content:n},parts:i}=this._$template,r=((o=e==null?void 0:e.creationScope)!==null&&o!==void 0?o:ye).importNode(n,!0);fe.currentNode=r;let s=fe.nextNode(),l=0,a=0,d=i[0];for(;d!==void 0;){if(l===d.index){let c;d.type===Tt?c=new tt(s,s.nextSibling,this,e):d.type===Oo?c=new d.ctor(s,d.name,d.strings,this,e):d.type===Lo&&(c=new Xr(s,this,e)),this._$parts.push(c),d=i[++a]}l!==(d==null?void 0:d.index)&&(s=fe.nextNode(),l++)}return fe.currentNode=ye,r}_update(e){let o=0;for(const n of this._$parts)n!==void 0&&(g==null||g({kind:"set part",part:n,value:e[o],valueIndex:o,values:e,templateInstance:this}),n.strings!==void 0?(n._$setValue(e,n,o),o+=n.strings.length-2):n._$setValue(e[o])),o++}}class tt{constructor(e,o,n,i){var r;this.type=Tt,this._$committedValue=k,this._$disconnectableChildren=void 0,this._$startNode=e,this._$endNode=o,this._$parent=n,this.options=i,this.__isConnected=(r=i==null?void 0:i.isConnected)!==null&&r!==void 0?r:!0,this._textSanitizer=void 0}get _$isConnected(){var e,o;return(o=(e=this._$parent)===null||e===void 0?void 0:e._$isConnected)!==null&&o!==void 0?o:this.__isConnected}get parentNode(){let e=H(this._$startNode).parentNode;const o=this._$parent;return o!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=o.parentNode),e}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(e,o=this){var n;if(this.parentNode===null)throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(e=Le(this,e,o),Ge(e))e===k||e==null||e===""?(this._$committedValue!==k&&(g==null||g({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear()),this._$committedValue=k):e!==this._$committedValue&&e!==be&&this._commitText(e);else if(e._$litType$!==void 0)this._commitTemplateResult(e);else if(e.nodeType!==void 0){if(((n=this.options)===null||n===void 0?void 0:n.host)===e){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",e,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(e)}else Or(e)?this._commitIterable(e):this._commitText(e)}_insert(e){return H(H(this._$startNode).parentNode).insertBefore(e,this._$endNode)}_commitNode(e){var o;if(this._$committedValue!==e){if(this._$clear(),_e!==Vt){const n=(o=this._$startNode.parentNode)===null||o===void 0?void 0:o.nodeName;if(n==="STYLE"||n==="SCRIPT"){let i="Forbidden";throw n==="STYLE"?i="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and make do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.":i="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.",new Error(i)}}g==null||g({kind:"commit node",start:this._$startNode,parent:this._$parent,value:e,options:this.options}),this._$committedValue=this._insert(e)}}_commitText(e){if(this._$committedValue!==k&&Ge(this._$committedValue)){const o=H(this._$startNode).nextSibling;this._textSanitizer===void 0&&(this._textSanitizer=Co(o,"data","property")),e=this._textSanitizer(e),g==null||g({kind:"commit text",node:o,value:e,options:this.options}),o.data=e}else{const o=ye.createTextNode("");this._commitNode(o),this._textSanitizer===void 0&&(this._textSanitizer=Co(o,"data","property")),e=this._textSanitizer(e),g==null||g({kind:"commit text",node:o,value:e,options:this.options}),o.data=e}this._$committedValue=e}_commitTemplateResult(e){var o;const{values:n,["_$litType$"]:i}=e,r=typeof i=="number"?this._$getTemplate(e):(i.el===void 0&&(i.el=Ke.createElement(bi(i.h,i.h[0]),this.options)),i);if(((o=this._$committedValue)===null||o===void 0?void 0:o._$template)===r)g==null||g({kind:"template updating",template:r,instance:this._$committedValue,parts:this._$committedValue._$parts,options:this.options,values:n}),this._$committedValue._update(n);else{const s=new Wr(r,this),l=s._clone(this.options);g==null||g({kind:"template instantiated",template:r,instance:s,parts:s._$parts,options:this.options,fragment:l,values:n}),s._update(n),g==null||g({kind:"template instantiated and updated",template:r,instance:s,parts:s._$parts,options:this.options,fragment:l,values:n}),this._commitNode(l),this._$committedValue=s}}_$getTemplate(e){let o=Tn.get(e.strings);return o===void 0&&Tn.set(e.strings,o=new Ke(e)),o}_commitIterable(e){fi(this._$committedValue)||(this._$committedValue=[],this._$clear());const o=this._$committedValue;let n=0,i;for(const r of e)n===o.length?o.push(i=new tt(this._insert(We()),this._insert(We()),this,this.options)):i=o[n],i._$setValue(r),n++;n<o.length&&(this._$clear(i&&H(i._$endNode).nextSibling,n),o.length=n)}_$clear(e=H(this._$startNode).nextSibling,o){var n;for((n=this._$notifyConnectionChanged)===null||n===void 0||n.call(this,!1,!0,o);e&&e!==this._$endNode;){const i=H(e).nextSibling;H(e).remove(),e=i}}setConnected(e){var o;if(this._$parent===void 0)this.__isConnected=e,(o=this._$notifyConnectionChanged)===null||o===void 0||o.call(this,e);else throw new Error("part.setConnected() may only be called on a RootPart returned from render().")}}class zt{constructor(e,o,n,i,r){this.type=Oo,this._$committedValue=k,this._$disconnectableChildren=void 0,this.element=e,this.name=o,this._$parent=i,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$committedValue=new Array(n.length-1).fill(new String),this.strings=n):this._$committedValue=k,this._sanitizer=void 0}get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e,o=this,n,i){const r=this.strings;let s=!1;if(r===void 0)e=Le(this,e,o,0),s=!Ge(e)||e!==this._$committedValue&&e!==be,s&&(this._$committedValue=e);else{const l=e;e=r[0];let a,d;for(a=0;a<r.length-1;a++)d=Le(this,l[n+a],o,a),d===be&&(d=this._$committedValue[a]),s||(s=!Ge(d)||d!==this._$committedValue[a]),d===k?e=k:e!==k&&(e+=(d??"")+r[a+1]),this._$committedValue[a]=d}s&&!i&&this._commitValue(e)}_commitValue(e){e===k?H(this.element).removeAttribute(this.name):(this._sanitizer===void 0&&(this._sanitizer=_e(this.element,this.name,"attribute")),e=this._sanitizer(e??""),g==null||g({kind:"commit attribute",element:this.element,name:this.name,value:e,options:this.options}),H(this.element).setAttribute(this.name,e??""))}}class Gr extends zt{constructor(){super(...arguments),this.type=jr}_commitValue(e){this._sanitizer===void 0&&(this._sanitizer=_e(this.element,this.name,"property")),e=this._sanitizer(e),g==null||g({kind:"commit property",element:this.element,name:this.name,value:e,options:this.options}),this.element[this.name]=e===k?void 0:e}}const Kr=Oe?Oe.emptyScript:"";class Yr extends zt{constructor(){super(...arguments),this.type=Fr}_commitValue(e){g==null||g({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(e&&e!==k),options:this.options}),e&&e!==k?H(this.element).setAttribute(this.name,Kr):H(this.element).removeAttribute(this.name)}}class Jr extends zt{constructor(e,o,n,i,r){if(super(e,o,n,i,r),this.type=Br,this.strings!==void 0)throw new Error(`A \`<${e.localName}>\` has a \`@${o}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(e,o=this){var n;if(e=(n=Le(this,e,o,0))!==null&&n!==void 0?n:k,e===be)return;const i=this._$committedValue,r=e===k&&i!==k||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==k&&(i===k||r);g==null||g({kind:"commit event listener",element:this.element,name:this.name,value:e,options:this.options,removeListener:r,addListener:s,oldListener:i}),r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$committedValue=e}handleEvent(e){var o,n;typeof this._$committedValue=="function"?this._$committedValue.call((n=(o=this.options)===null||o===void 0?void 0:o.host)!==null&&n!==void 0?n:this.element,e):this._$committedValue.handleEvent(e)}}class Xr{constructor(e,o,n){this.element=e,this.type=Lo,this._$disconnectableChildren=void 0,this._$parent=o,this.options=n}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e){g==null||g({kind:"commit to element binding",element:this.element,value:e,options:this.options}),Le(this,e)}}const ao=U.litHtmlPolyfillSupportDevMode;ao==null||ao(Ke,tt);((oo=U.litHtmlVersions)!==null&&oo!==void 0?oo:U.litHtmlVersions=[]).push("2.7.5");U.litHtmlVersions.length>1&&kt("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");const Ie=(t,e,o)=>{var n,i;if(e==null)throw new TypeError(`The container to render into may not be ${e}`);const r=Nr++,s=(n=o==null?void 0:o.renderBefore)!==null&&n!==void 0?n:e;let l=s._$litPart$;if(g==null||g({kind:"begin render",id:r,value:t,container:e,options:o,part:l}),l===void 0){const a=(i=o==null?void 0:o.renderBefore)!==null&&i!==void 0?i:null;s._$litPart$=l=new tt(e.insertBefore(We(),a),a,void 0,o??{})}return l._$setValue(t),g==null||g({kind:"end render",id:r,value:t,container:e,options:o,part:l}),l};Ie.setSanitizer=Ar,Ie.createSanitizer=Co,Ie._testOnlyClearSanitizerFactoryDoNotCallOrElse=Ir;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var lo,co,ho;let Mo;{const t=(lo=globalThis.litIssuedWarnings)!==null&&lo!==void 0?lo:globalThis.litIssuedWarnings=new Set;Mo=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))}}class A extends ee{constructor(){super(...arguments),this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){var e,o;const n=super.createRenderRoot();return(e=(o=this.renderOptions).renderBefore)!==null&&e!==void 0||(o.renderBefore=n.firstChild),n}update(e){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.__childPart=Ie(o,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this.__childPart)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.__childPart)===null||e===void 0||e.setConnected(!1)}render(){return be}}A.finalized=!0;A._$litElement$=!0;(co=globalThis.litElementHydrateSupport)===null||co===void 0||co.call(globalThis,{LitElement:A});const uo=globalThis.litElementPolyfillSupportDevMode;uo==null||uo({LitElement:A});A.finalize=function(){if(!ee.finalize.call(this))return!1;const e=(o,n,i=!1)=>{if(o.hasOwnProperty(n)){const r=(typeof o=="function"?o:o.constructor).name;Mo(i?"renamed-api":"removed-api",`\`${n}\` is implemented on class ${r}. It has been ${i?"renamed":"removed"} in this version of LitElement.`)}};return e(this,"render"),e(this,"getStyles",!0),e(this.prototype,"adoptStyles"),!0};((ho=globalThis.litElementVersions)!==null&&ho!==void 0?ho:globalThis.litElementVersions=[]).push("3.3.2");globalThis.litElementVersions.length>1&&Mo("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qr=(t,e)=>(customElements.define(t,e),e),Zr=(t,e)=>{const{kind:o,elements:n}=e;return{kind:o,elements:n,finisher(i){customElements.define(t,i)}}},F=t=>e=>typeof e=="function"?Qr(t,e):Zr(t,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const es=(t,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(o){o.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(o){o.createProperty(e.key,t)}},ts=(t,e,o)=>{e.constructor.createProperty(o,t)};function y(t){return(e,o)=>o!==void 0?ts(t,e,o):es(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function T(t){return y({...t,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const os=({finisher:t,descriptor:e})=>(o,n)=>{var i;if(n!==void 0){const r=o.constructor;e!==void 0&&Object.defineProperty(o,n,e(n)),t==null||t(r,n)}else{const r=(i=o.originalKey)!==null&&i!==void 0?i:o.key,s=e!=null?{kind:"method",placement:"prototype",key:r,descriptor:e(o.key)}:{...o,key:r};return t!=null&&(s.finisher=function(l){t(l,r)}),s}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ot(t,e){return os({descriptor:o=>{const n={get(){var i,r;return(r=(i=this.renderRoot)===null||i===void 0?void 0:i.querySelector(t))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0};if(e){const i=typeof o=="symbol"?Symbol():`__${o}`;n.get=function(){var r,s;return this[i]===void 0&&(this[i]=(s=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(t))!==null&&s!==void 0?s:null),this[i]}}return n}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var po;const ns=window;((po=ns.HTMLSlotElement)===null||po===void 0?void 0:po.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const is={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},rs=t=>(...e)=>({_$litDirective$:t,values:e});class ss{constructor(e){}get _$isConnected(){return this._$parent._$isConnected}_$initialize(e,o,n){this.__part=e,this._$parent=o,this.__attributeIndex=n}_$resolve(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class as extends ss{constructor(e){var o;if(super(e),e.type!==is.ATTRIBUTE||e.name!=="class"||((o=e.strings)===null||o===void 0?void 0:o.length)>2)throw new Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(o=>e[o]).join(" ")+" "}update(e,[o]){var n,i;if(this._previousClasses===void 0){this._previousClasses=new Set,e.strings!==void 0&&(this._staticClasses=new Set(e.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in o)o[s]&&!(!((n=this._staticClasses)===null||n===void 0)&&n.has(s))&&this._previousClasses.add(s);return this.render(o)}const r=e.element.classList;this._previousClasses.forEach(s=>{s in o||(r.remove(s),this._previousClasses.delete(s))});for(const s in o){const l=!!o[s];l!==this._previousClasses.has(s)&&!(!((i=this._staticClasses)===null||i===void 0)&&i.has(s))&&(l?(r.add(s),this._previousClasses.add(s)):(r.remove(s),this._previousClasses.delete(s)))}return be}}const Vo=rs(as),mo="css-loading-indicator";var G;(function(t){t.IDLE="",t.FIRST="first",t.SECOND="second",t.THIRD="third"})(G||(G={}));class I extends A{constructor(){super(),this.firstDelay=450,this.secondDelay=1500,this.thirdDelay=5e3,this.expandedDuration=2e3,this.onlineText="Online",this.offlineText="Connection lost",this.reconnectingText="Connection lost, trying to reconnect...",this.offline=!1,this.reconnecting=!1,this.expanded=!1,this.loading=!1,this.loadingBarState=G.IDLE,this.applyDefaultThemeState=!0,this.firstTimeout=0,this.secondTimeout=0,this.thirdTimeout=0,this.expandedTimeout=0,this.lastMessageState=$.CONNECTED,this.connectionStateListener=()=>{this.expanded=this.updateConnectionState(),this.expandedTimeout=this.timeoutFor(this.expandedTimeout,this.expanded,()=>{this.expanded=!1},this.expandedDuration)}}static create(){var e,o;const n=window;return!((e=n.Vaadin)===null||e===void 0)&&e.connectionIndicator||(n.Vaadin=n.Vaadin||{},n.Vaadin.connectionIndicator=document.createElement("vaadin-connection-indicator"),document.body.appendChild(n.Vaadin.connectionIndicator)),(o=n.Vaadin)===null||o===void 0?void 0:o.connectionIndicator}render(){return f`
      <div class="v-loading-indicator ${this.loadingBarState}" style=${this.getLoadingBarStyle()}></div>

      <div
        class="v-status-message ${Vo({active:this.reconnecting})}"
      >
        <span class="text"> ${this.renderMessage()} </span>
      </div>
    `}connectedCallback(){var e;super.connectedCallback();const o=window;!((e=o.Vaadin)===null||e===void 0)&&e.connectionState&&(this.connectionStateStore=o.Vaadin.connectionState,this.connectionStateStore.addStateChangeListener(this.connectionStateListener),this.updateConnectionState()),this.updateTheme()}disconnectedCallback(){super.disconnectedCallback(),this.connectionStateStore&&this.connectionStateStore.removeStateChangeListener(this.connectionStateListener),this.updateTheme()}get applyDefaultTheme(){return this.applyDefaultThemeState}set applyDefaultTheme(e){e!==this.applyDefaultThemeState&&(this.applyDefaultThemeState=e,this.updateTheme())}createRenderRoot(){return this}updateConnectionState(){var e;const o=(e=this.connectionStateStore)===null||e===void 0?void 0:e.state;return this.offline=o===$.CONNECTION_LOST,this.reconnecting=o===$.RECONNECTING,this.updateLoading(o===$.LOADING),this.loading?!1:o!==this.lastMessageState?(this.lastMessageState=o,!0):!1}updateLoading(e){this.loading=e,this.loadingBarState=G.IDLE,this.firstTimeout=this.timeoutFor(this.firstTimeout,e,()=>{this.loadingBarState=G.FIRST},this.firstDelay),this.secondTimeout=this.timeoutFor(this.secondTimeout,e,()=>{this.loadingBarState=G.SECOND},this.secondDelay),this.thirdTimeout=this.timeoutFor(this.thirdTimeout,e,()=>{this.loadingBarState=G.THIRD},this.thirdDelay)}renderMessage(){return this.reconnecting?this.reconnectingText:this.offline?this.offlineText:this.onlineText}updateTheme(){if(this.applyDefaultThemeState&&this.isConnected){if(!document.getElementById(mo)){const e=document.createElement("style");e.id=mo,e.textContent=this.getDefaultStyle(),document.head.appendChild(e)}}else{const e=document.getElementById(mo);e&&document.head.removeChild(e)}}getDefaultStyle(){return`
      @keyframes v-progress-start {
        0% {
          width: 0%;
        }
        100% {
          width: 50%;
        }
      }
      @keyframes v-progress-delay {
        0% {
          width: 50%;
        }
        100% {
          width: 90%;
        }
      }
      @keyframes v-progress-wait {
        0% {
          width: 90%;
          height: 4px;
        }
        3% {
          width: 91%;
          height: 7px;
        }
        100% {
          width: 96%;
          height: 7px;
        }
      }
      @keyframes v-progress-wait-pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.1;
        }
        100% {
          opacity: 1;
        }
      }
      .v-loading-indicator,
      .v-status-message {
        position: fixed;
        z-index: 251;
        left: 0;
        right: auto;
        top: 0;
        background-color: var(--lumo-primary-color, var(--material-primary-color, blue));
        transition: none;
      }
      .v-loading-indicator {
        width: 50%;
        height: 4px;
        opacity: 1;
        pointer-events: none;
        animation: v-progress-start 1000ms 200ms both;
      }
      .v-loading-indicator[style*='none'] {
        display: block !important;
        width: 100%;
        opacity: 0;
        animation: none;
        transition: opacity 500ms 300ms, width 300ms;
      }
      .v-loading-indicator.second {
        width: 90%;
        animation: v-progress-delay 3.8s forwards;
      }
      .v-loading-indicator.third {
        width: 96%;
        animation: v-progress-wait 5s forwards, v-progress-wait-pulse 1s 4s infinite backwards;
      }

      vaadin-connection-indicator[offline] .v-loading-indicator,
      vaadin-connection-indicator[reconnecting] .v-loading-indicator {
        display: none;
      }

      .v-status-message {
        opacity: 0;
        width: 100%;
        max-height: var(--status-height-collapsed, 8px);
        overflow: hidden;
        background-color: var(--status-bg-color-online, var(--lumo-primary-color, var(--material-primary-color, blue)));
        color: var(
          --status-text-color-online,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        transition: all 0.5s;
        padding: 0 0.5em;
      }

      vaadin-connection-indicator[offline] .v-status-message,
      vaadin-connection-indicator[reconnecting] .v-status-message {
        opacity: 1;
        background-color: var(--status-bg-color-offline, var(--lumo-shade, #333));
        color: var(
          --status-text-color-offline,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        background-image: repeating-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0) 10px,
          rgba(255, 255, 255, 0.1) 10px,
          rgba(255, 255, 255, 0.1) 20px
        );
      }

      vaadin-connection-indicator[reconnecting] .v-status-message {
        animation: show-reconnecting-status 2s;
      }

      vaadin-connection-indicator[offline] .v-status-message:hover,
      vaadin-connection-indicator[reconnecting] .v-status-message:hover,
      vaadin-connection-indicator[expanded] .v-status-message {
        max-height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[expanded] .v-status-message {
        opacity: 1;
      }

      .v-status-message span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[reconnecting] .v-status-message span::before {
        content: '';
        width: 1em;
        height: 1em;
        border-top: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-left: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-right: 2px solid transparent;
        border-bottom: 2px solid transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: v-spin 0.4s linear infinite;
        margin: 0 0.5em;
      }

      @keyframes v-spin {
        100% {
          transform: rotate(360deg);
        }
      }
    `}getLoadingBarStyle(){switch(this.loadingBarState){case G.IDLE:return"display: none";case G.FIRST:case G.SECOND:case G.THIRD:return"display: block";default:return""}}timeoutFor(e,o,n,i){return e!==0&&window.clearTimeout(e),o?window.setTimeout(n,i):0}static get instance(){return I.create()}}j([y({type:Number})],I.prototype,"firstDelay",void 0);j([y({type:Number})],I.prototype,"secondDelay",void 0);j([y({type:Number})],I.prototype,"thirdDelay",void 0);j([y({type:Number})],I.prototype,"expandedDuration",void 0);j([y({type:String})],I.prototype,"onlineText",void 0);j([y({type:String})],I.prototype,"offlineText",void 0);j([y({type:String})],I.prototype,"reconnectingText",void 0);j([y({type:Boolean,reflect:!0})],I.prototype,"offline",void 0);j([y({type:Boolean,reflect:!0})],I.prototype,"reconnecting",void 0);j([y({type:Boolean,reflect:!0})],I.prototype,"expanded",void 0);j([y({type:Boolean,reflect:!0})],I.prototype,"loading",void 0);j([y({type:String})],I.prototype,"loadingBarState",void 0);j([y({type:Boolean})],I.prototype,"applyDefaultTheme",null);customElements.get("vaadin-connection-indicator")===void 0&&customElements.define("vaadin-connection-indicator",I);I.instance;const Ye=window;Ye.Vaadin=Ye.Vaadin||{};Ye.Vaadin.registrations=Ye.Vaadin.registrations||[];Ye.Vaadin.registrations.push({is:"@vaadin/common-frontend",version:"0.0.18"});class Nn extends Error{}const je=window.document.body,x=window;class ls{constructor(e){this.response=void 0,this.pathname="",this.isActive=!1,this.baseRegex=/^\//,this.navigation="",je.$=je.$||[],this.config=e||{},x.Vaadin=x.Vaadin||{},x.Vaadin.Flow=x.Vaadin.Flow||{},x.Vaadin.Flow.clients={TypeScript:{isActive:()=>this.isActive}};const o=document.head.querySelector("base");this.baseRegex=new RegExp(`^${(document.baseURI||o&&o.href||"/").replace(/^https?:\/\/[^/]+/i,"")}`),this.appShellTitle=document.title,this.addConnectionIndicator()}get serverSideRoutes(){return[{path:"(.*)",action:this.action}]}loadingStarted(){this.isActive=!0,x.Vaadin.connectionState.loadingStarted()}loadingFinished(){this.isActive=!1,x.Vaadin.connectionState.loadingFinished(),!x.Vaadin.listener&&(x.Vaadin.listener={},document.addEventListener("click",e=>{e.target&&(e.target.hasAttribute("router-link")?this.navigation="link":e.composedPath().some(o=>o.nodeName==="A")&&(this.navigation="client"))},{capture:!0}))}get action(){return async e=>{if(this.pathname=e.pathname,x.Vaadin.connectionState.online)try{await this.flowInit()}catch(o){if(o instanceof Nn)return x.Vaadin.connectionState.state=$.CONNECTION_LOST,this.offlineStubAction();throw o}else return this.offlineStubAction();return this.container.onBeforeEnter=(o,n)=>this.flowNavigate(o,n),this.container.onBeforeLeave=(o,n)=>this.flowLeave(o,n),this.container}}async flowLeave(e,o){const{connectionState:n}=x.Vaadin;return this.pathname===e.pathname||!this.isFlowClientLoaded()||n.offline?Promise.resolve({}):new Promise(i=>{this.loadingStarted(),this.container.serverConnected=r=>{i(o&&r?o.prevent():{}),this.loadingFinished()},je.$server.leaveNavigation(this.getFlowRoutePath(e),this.getFlowRouteQuery(e))})}async flowNavigate(e,o){return this.response?new Promise(n=>{this.loadingStarted(),this.container.serverConnected=(i,r)=>{o&&i?n(o.prevent()):o&&o.redirect&&r?n(o.redirect(r.pathname)):(this.container.style.display="",n(this.container)),this.loadingFinished()},je.$server.connectClient(this.getFlowRoutePath(e),this.getFlowRouteQuery(e),this.appShellTitle,history.state,this.navigation),this.navigation="history"}):Promise.resolve(this.container)}getFlowRoutePath(e){return decodeURIComponent(e.pathname).replace(this.baseRegex,"")}getFlowRouteQuery(e){return e.search&&e.search.substring(1)||""}async flowInit(){if(!this.isFlowClientLoaded()){this.loadingStarted(),this.response=await this.flowInitUi();const{pushScript:e,appConfig:o}=this.response;typeof e=="string"&&await this.loadScript(e);const{appId:n}=o;await(await E(()=>import("./FlowBootstrap-feff2646.js"),[],import.meta.url)).init(this.response),typeof this.config.imports=="function"&&(this.injectAppIdScript(n),await this.config.imports());const r=`flow-container-${n.toLowerCase()}`,s=document.querySelector(r);s?this.container=s:(this.container=document.createElement(r),this.container.id=n),je.$[n]=this.container;const l=await E(()=>import("./FlowClient-d5d5e377.js"),[],import.meta.url);await this.flowInitClient(l),this.loadingFinished()}return this.container&&!this.container.isConnected&&(this.container.style.display="none",document.body.appendChild(this.container)),this.response}async loadScript(e){return new Promise((o,n)=>{const i=document.createElement("script");i.onload=()=>o(),i.onerror=n,i.src=e,document.body.appendChild(i)})}injectAppIdScript(e){const o=e.substring(0,e.lastIndexOf("-")),n=document.createElement("script");n.type="module",n.setAttribute("data-app-id",o),document.body.append(n)}async flowInitClient(e){return e.init(),new Promise(o=>{const n=setInterval(()=>{Object.keys(x.Vaadin.Flow.clients).filter(r=>r!=="TypeScript").reduce((r,s)=>r||x.Vaadin.Flow.clients[s].isActive(),!1)||(clearInterval(n),o())},5)})}async flowInitUi(){const e=x.Vaadin&&x.Vaadin.TypeScript&&x.Vaadin.TypeScript.initial;return e?(x.Vaadin.TypeScript.initial=void 0,Promise.resolve(e)):new Promise((o,n)=>{const r=new XMLHttpRequest,s=`?v-r=init&location=${encodeURIComponent(this.getFlowRoutePath(location))}&query=${encodeURIComponent(this.getFlowRouteQuery(location))}`;r.open("GET",s),r.onerror=()=>n(new Nn(`Invalid server response when initializing Flow UI.
        ${r.status}
        ${r.responseText}`)),r.onload=()=>{const l=r.getResponseHeader("content-type");l&&l.indexOf("application/json")!==-1?o(JSON.parse(r.responseText)):r.onerror()},r.send()})}addConnectionIndicator(){I.create(),x.addEventListener("online",()=>{if(!this.isFlowClientLoaded()){x.Vaadin.connectionState.state=$.RECONNECTING;const e=new XMLHttpRequest;e.open("HEAD","sw.js"),e.onload=()=>{x.Vaadin.connectionState.state=$.CONNECTED},e.onerror=()=>{x.Vaadin.connectionState.state=$.CONNECTION_LOST},setTimeout(()=>e.send(),50)}}),x.addEventListener("offline",()=>{this.isFlowClientLoaded()||(x.Vaadin.connectionState.state=$.CONNECTION_LOST)})}async offlineStubAction(){const e=document.createElement("iframe"),o="./offline-stub.html";e.setAttribute("src",o),e.setAttribute("style","width: 100%; height: 100%; border: 0"),this.response=void 0;let n;const i=()=>{n!==void 0&&(x.Vaadin.connectionState.removeStateChangeListener(n),n=void 0)};return e.onBeforeEnter=(r,s,l)=>{n=()=>{x.Vaadin.connectionState.online&&(i(),l.render(r,!1))},x.Vaadin.connectionState.addStateChangeListener(n)},e.onBeforeLeave=(r,s,l)=>{i()},e}isFlowClientLoaded(){return this.response!==void 0}}const{serverSideRoutes:ds}=new ls({imports:()=>E(()=>import("./generated-flow-imports-a6bb28c7.js"),[],import.meta.url)}),cs=[...ds],hs=new le(document.querySelector("#outlet"));hs.setRoutes(cs);(function(){if(typeof document>"u"||"adoptedStyleSheets"in document)return;var t="ShadyCSS"in window&&!ShadyCSS.nativeShadow,e=document.implementation.createHTMLDocument(""),o=new WeakMap,n=typeof DOMException=="object"?Error:DOMException,i=Object.defineProperty,r=Array.prototype.forEach,s=/@import.+?;?$/gm;function l(u){var p=u.replace(s,"");return p!==u&&console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),p.trim()}function a(u){return"isConnected"in u?u.isConnected:document.contains(u)}function d(u){return u.filter(function(p,b){return u.indexOf(p)===b})}function c(u,p){return u.filter(function(b){return p.indexOf(b)===-1})}function m(u){u.parentNode.removeChild(u)}function h(u){return u.shadowRoot||o.get(u)}var v=["addRule","deleteRule","insertRule","removeRule"],re=CSSStyleSheet,se=re.prototype;se.replace=function(){return Promise.reject(new n("Can't call replace on non-constructed CSSStyleSheets."))},se.replaceSync=function(){throw new n("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")};function te(u){return typeof u=="object"?Ce.isPrototypeOf(u)||se.isPrototypeOf(u):!1}function jt(u){return typeof u=="object"?se.isPrototypeOf(u):!1}var B=new WeakMap,X=new WeakMap,Se=new WeakMap,Ee=new WeakMap;function Ft(u,p){var b=document.createElement("style");return Se.get(u).set(p,b),X.get(u).push(p),b}function oe(u,p){return Se.get(u).get(p)}function it(u,p){Se.get(u).delete(p),X.set(u,X.get(u).filter(function(b){return b!==p}))}function Yo(u,p){requestAnimationFrame(function(){p.textContent=B.get(u).textContent,Ee.get(u).forEach(function(b){return p.sheet[b.method].apply(p.sheet,b.args)})})}function rt(u){if(!B.has(u))throw new TypeError("Illegal invocation")}function Bt(){var u=this,p=document.createElement("style");e.body.appendChild(p),B.set(u,p),X.set(u,[]),Se.set(u,new WeakMap),Ee.set(u,[])}var Ce=Bt.prototype;Ce.replace=function(p){try{return this.replaceSync(p),Promise.resolve(this)}catch(b){return Promise.reject(b)}},Ce.replaceSync=function(p){if(rt(this),typeof p=="string"){var b=this;B.get(b).textContent=l(p),Ee.set(b,[]),X.get(b).forEach(function(L){L.isConnected()&&Yo(b,oe(b,L))})}},i(Ce,"cssRules",{configurable:!0,enumerable:!0,get:function(){return rt(this),B.get(this).sheet.cssRules}}),i(Ce,"media",{configurable:!0,enumerable:!0,get:function(){return rt(this),B.get(this).sheet.media}}),v.forEach(function(u){Ce[u]=function(){var p=this;rt(p);var b=arguments;Ee.get(p).push({method:u,args:b}),X.get(p).forEach(function(z){if(z.isConnected()){var R=oe(p,z).sheet;R[u].apply(R,b)}});var L=B.get(p).sheet;return L[u].apply(L,b)}}),i(Bt,Symbol.hasInstance,{configurable:!0,value:te});var Jo={childList:!0,subtree:!0},Xo=new WeakMap;function ke(u){var p=Xo.get(u);return p||(p=new en(u),Xo.set(u,p)),p}function Qo(u){i(u.prototype,"adoptedStyleSheets",{configurable:!0,enumerable:!0,get:function(){return ke(this).sheets},set:function(p){ke(this).update(p)}})}function Ht(u,p){for(var b=document.createNodeIterator(u,NodeFilter.SHOW_ELEMENT,function(z){return h(z)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT},null,!1),L=void 0;L=b.nextNode();)p(h(L))}var st=new WeakMap,$e=new WeakMap,at=new WeakMap;function Oi(u,p){return p instanceof HTMLStyleElement&&$e.get(u).some(function(b){return oe(b,u)})}function Zo(u){var p=st.get(u);return p instanceof Document?p.body:p}function qt(u){var p=document.createDocumentFragment(),b=$e.get(u),L=at.get(u),z=Zo(u);L.disconnect(),b.forEach(function(R){p.appendChild(oe(R,u)||Ft(R,u))}),z.insertBefore(p,null),L.observe(z,Jo),b.forEach(function(R){Yo(R,oe(R,u))})}function en(u){var p=this;p.sheets=[],st.set(p,u),$e.set(p,[]),at.set(p,new MutationObserver(function(b,L){if(!document){L.disconnect();return}b.forEach(function(z){t||r.call(z.addedNodes,function(R){R instanceof Element&&Ht(R,function(Te){ke(Te).connect()})}),r.call(z.removedNodes,function(R){R instanceof Element&&(Oi(p,R)&&qt(p),t||Ht(R,function(Te){ke(Te).disconnect()}))})})}))}if(en.prototype={isConnected:function(){var u=st.get(this);return u instanceof Document?u.readyState!=="loading":a(u.host)},connect:function(){var u=Zo(this);at.get(this).observe(u,Jo),$e.get(this).length>0&&qt(this),Ht(u,function(p){ke(p).connect()})},disconnect:function(){at.get(this).disconnect()},update:function(u){var p=this,b=st.get(p)===document?"Document":"ShadowRoot";if(!Array.isArray(u))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+b+": Iterator getter is not callable.");if(!u.every(te))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+b+": Failed to convert value to 'CSSStyleSheet'");if(u.some(jt))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+b+": Can't adopt non-constructed stylesheets");p.sheets=u;var L=$e.get(p),z=d(u),R=c(L,z);R.forEach(function(Te){m(oe(Te,p)),it(Te,p)}),$e.set(p,z),p.isConnected()&&z.length>0&&qt(p)}},window.CSSStyleSheet=Bt,Qo(Document),"ShadowRoot"in window){Qo(ShadowRoot);var tn=Element.prototype,Li=tn.attachShadow;tn.attachShadow=function(p){var b=Li.call(this,p);return p.mode==="closed"&&o.set(this,b),b}}var lt=ke(document);lt.isConnected()?lt.connect():document.addEventListener("DOMContentLoaded",lt.connect.bind(lt))})();/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _i=Symbol.for(""),us=t=>{if((t==null?void 0:t.r)===_i)return t==null?void 0:t._$litStatic$},ps=t=>{if(t._$litStatic$!==void 0)return t._$litStatic$;throw new Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)},ht=(t,...e)=>({_$litStatic$:e.reduce((o,n,i)=>o+ps(n)+t[i+1],t[0]),r:_i}),Pn=new Map,ms=t=>(e,...o)=>{const n=o.length;let i,r;const s=[],l=[];let a=0,d=!1,c;for(;a<n;){for(c=e[a];a<n&&(r=o[a],(i=us(r))!==void 0);)c+=i+e[++a],d=!0;a!==n&&l.push(r),s.push(c),a++}if(a===n&&s.push(e[n]),d){const m=s.join("$$lit$$");e=Pn.get(m),e===void 0&&(s.raw=s,Pn.set(m,e=s)),o=l}return t(e,...o)},vs=ms(f),fs="modulepreload",gs=function(t){return"/"+t},An={},S=function(t,e,o){if(!e||e.length===0)return t();const n=document.getElementsByTagName("link");return Promise.all(e.map(i=>{if(i=gs(i),i in An)return;An[i]=!0;const r=i.endsWith(".css"),s=r?'[rel="stylesheet"]':"";if(o)for(let a=n.length-1;a>=0;a--){const d=n[a];if(d.href===i&&(!r||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${s}`))return;const l=document.createElement("link");if(l.rel=r?"stylesheet":fs,r||(l.as="script",l.crossOrigin=""),l.href=i,document.head.appendChild(l),r)return new Promise((a,d)=>{l.addEventListener("load",a),l.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>t())};function ys(t){var e;const o=[];for(;t&&t.parentNode;){const n=bs(t);if(n.nodeId!==-1){if((e=n.element)!=null&&e.tagName.startsWith("FLOW-CONTAINER-"))break;o.push(n)}t=t.parentElement?t.parentElement:t.parentNode.host}return o.reverse()}function bs(t){const e=window.Vaadin;if(e&&e.Flow){const{clients:o}=e.Flow,n=Object.keys(o);for(const i of n){const r=o[i];if(r.getNodeId){const s=r.getNodeId(t);if(s>=0)return{nodeId:s,uiId:r.getUIId(),element:t}}}}return{nodeId:-1,uiId:-1,element:void 0}}function _s(t,e){if(t.contains(e))return!0;let o=e;const n=e.ownerDocument;for(;o&&o!==n&&o!==t;)o=o.parentNode||(o instanceof ShadowRoot?o.host:null);return o===t}const ws=(t,e)=>{const o=t[e];return o?typeof o=="function"?o():Promise.resolve(o):new Promise((n,i)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(i.bind(null,new Error("Unknown variable dynamic import: "+e)))})};var P=(t=>(t.text="text",t.checkbox="checkbox",t.range="range",t.color="color",t))(P||{});const J={lumoSize:["--lumo-size-xs","--lumo-size-s","--lumo-size-m","--lumo-size-l","--lumo-size-xl"],lumoSpace:["--lumo-space-xs","--lumo-space-s","--lumo-space-m","--lumo-space-l","--lumo-space-xl"],lumoBorderRadius:["0","--lumo-border-radius-m","--lumo-border-radius-l"],lumoFontSize:["--lumo-font-size-xxs","--lumo-font-size-xs","--lumo-font-size-s","--lumo-font-size-m","--lumo-font-size-l","--lumo-font-size-xl","--lumo-font-size-xxl","--lumo-font-size-xxxl"],lumoTextColor:["--lumo-header-text-color","--lumo-body-text-color","--lumo-secondary-text-color","--lumo-tertiary-text-color","--lumo-disabled-text-color","--lumo-primary-text-color","--lumo-error-text-color","--lumo-success-text-color"],basicBorderSize:["0px","1px","2px","3px"]},xs=Object.freeze(Object.defineProperty({__proto__:null,presets:J},Symbol.toStringTag,{value:"Module"})),Fe={textColor:{propertyName:"color",displayName:"Text color",editorType:P.color,presets:J.lumoTextColor},fontSize:{propertyName:"font-size",displayName:"Font size",editorType:P.range,presets:J.lumoFontSize,icon:"font"},fontWeight:{propertyName:"font-weight",displayName:"Bold",editorType:P.checkbox,checkedValue:"bold"},fontStyle:{propertyName:"font-style",displayName:"Italic",editorType:P.checkbox,checkedValue:"italic"}},Pe={backgroundColor:{propertyName:"background-color",displayName:"Background color",editorType:P.color},borderColor:{propertyName:"border-color",displayName:"Border color",editorType:P.color},borderWidth:{propertyName:"border-width",displayName:"Border width",editorType:P.range,presets:J.basicBorderSize,icon:"square"},borderRadius:{propertyName:"border-radius",displayName:"Border radius",editorType:P.range,presets:J.lumoBorderRadius,icon:"square"},padding:{propertyName:"padding",displayName:"Padding",editorType:P.range,presets:J.lumoSpace,icon:"square"},gap:{propertyName:"gap",displayName:"Spacing",editorType:P.range,presets:J.lumoSpace,icon:"square"}},Ss={height:{propertyName:"height",displayName:"Size",editorType:P.range,presets:J.lumoSize,icon:"square"},paddingInline:{propertyName:"padding-inline",displayName:"Padding",editorType:P.range,presets:J.lumoSpace,icon:"square"}},Es={iconColor:{propertyName:"color",displayName:"Icon color",editorType:P.color,presets:J.lumoTextColor},iconSize:{propertyName:"font-size",displayName:"Icon size",editorType:P.range,presets:J.lumoFontSize,icon:"font"}},Cs=Object.freeze(Object.defineProperty({__proto__:null,fieldProperties:Ss,iconProperties:Es,shapeProperties:Pe,textProperties:Fe},Symbol.toStringTag,{value:"Module"}));function wi(t){const e=t.charAt(0).toUpperCase()+t.slice(1);return{tagName:t,displayName:e,elements:[{selector:t,displayName:"Element",properties:[Pe.backgroundColor,Pe.borderColor,Pe.borderWidth,Pe.borderRadius,Pe.padding,Fe.textColor,Fe.fontSize,Fe.fontWeight,Fe.fontStyle]}]}}const ks=Object.freeze(Object.defineProperty({__proto__:null,createGenericMetadata:wi},Symbol.toStringTag,{value:"Module"})),$s=t=>ws(Object.assign({"./components/defaults.ts":()=>S(()=>Promise.resolve().then(()=>Cs),void 0),"./components/generic.ts":()=>S(()=>Promise.resolve().then(()=>ks),void 0),"./components/presets.ts":()=>S(()=>Promise.resolve().then(()=>xs),void 0),"./components/vaadin-app-layout.ts":()=>S(()=>E(()=>import("./vaadin-app-layout-37492a04-b4103d98.js"),[],import.meta.url),[]),"./components/vaadin-avatar.ts":()=>S(()=>E(()=>import("./vaadin-avatar-7047be31-9d32c59f.js"),[],import.meta.url),[]),"./components/vaadin-big-decimal-field.ts":()=>S(()=>E(()=>import("./vaadin-big-decimal-field-b42c1de1-0a0f6ff2.js"),["./vaadin-big-decimal-field-b42c1de1-0a0f6ff2.js","./vaadin-text-field-e82c445d-6d62bc11.js"],import.meta.url),["assets/vaadin-big-decimal-field-b42c1de1.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-button.ts":()=>S(()=>E(()=>import("./vaadin-button-79ad9d5f-ecc951ce.js"),[],import.meta.url),[]),"./components/vaadin-checkbox-group.ts":()=>S(()=>E(()=>import("./vaadin-checkbox-group-a9a9e85d-a7f0e2b3.js"),["./vaadin-checkbox-group-a9a9e85d-a7f0e2b3.js","./vaadin-text-field-e82c445d-6d62bc11.js","./vaadin-checkbox-13797fc9-f3559576.js"],import.meta.url),["assets/vaadin-checkbox-group-a9a9e85d.js","assets/vaadin-text-field-e82c445d.js","assets/vaadin-checkbox-13797fc9.js"]),"./components/vaadin-checkbox.ts":()=>S(()=>E(()=>import("./vaadin-checkbox-13797fc9-f3559576.js"),[],import.meta.url),[]),"./components/vaadin-combo-box.ts":()=>S(()=>E(()=>import("./vaadin-combo-box-9046f78f-6cbab571.js"),["./vaadin-combo-box-9046f78f-6cbab571.js","./vaadin-text-field-e82c445d-6d62bc11.js"],import.meta.url),["assets/vaadin-combo-box-9046f78f.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-email-field.ts":()=>S(()=>E(()=>import("./vaadin-email-field-da851bcb-e68b4424.js"),["./vaadin-email-field-da851bcb-e68b4424.js","./vaadin-text-field-e82c445d-6d62bc11.js"],import.meta.url),["assets/vaadin-email-field-da851bcb.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-horizontal-layout.ts":()=>S(()=>E(()=>import("./vaadin-horizontal-layout-f7b1ab51-e5114b61.js"),[],import.meta.url),[]),"./components/vaadin-integer-field.ts":()=>S(()=>E(()=>import("./vaadin-integer-field-6e2954cf-6fa194e8.js"),["./vaadin-integer-field-6e2954cf-6fa194e8.js","./vaadin-text-field-e82c445d-6d62bc11.js"],import.meta.url),["assets/vaadin-integer-field-6e2954cf.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-menu-bar.ts":()=>S(()=>E(()=>import("./vaadin-menu-bar-be33385c-da246bb7.js"),[],import.meta.url),[]),"./components/vaadin-number-field.ts":()=>S(()=>E(()=>import("./vaadin-number-field-31df11f5-49ca92ea.js"),["./vaadin-number-field-31df11f5-49ca92ea.js","./vaadin-text-field-e82c445d-6d62bc11.js"],import.meta.url),["assets/vaadin-number-field-31df11f5.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-password-field.ts":()=>S(()=>E(()=>import("./vaadin-password-field-49ffb113-7fbf50d6.js"),["./vaadin-password-field-49ffb113-7fbf50d6.js","./vaadin-text-field-e82c445d-6d62bc11.js"],import.meta.url),["assets/vaadin-password-field-49ffb113.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-progress-bar.ts":()=>S(()=>E(()=>import("./vaadin-progress-bar-3b53bb70-89951685.js"),[],import.meta.url),[]),"./components/vaadin-radio-group.ts":()=>S(()=>E(()=>import("./vaadin-radio-group-4a6e2cf4-0e7bedd6.js"),["./vaadin-radio-group-4a6e2cf4-0e7bedd6.js","./vaadin-text-field-e82c445d-6d62bc11.js"],import.meta.url),["assets/vaadin-radio-group-4a6e2cf4.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-scroller.ts":()=>S(()=>E(()=>import("./vaadin-scroller-35e68818-756cfe3b.js"),[],import.meta.url),[]),"./components/vaadin-select.ts":()=>S(()=>E(()=>import("./vaadin-select-5d6ab45b-55478a93.js"),["./vaadin-select-5d6ab45b-55478a93.js","./vaadin-text-field-e82c445d-6d62bc11.js"],import.meta.url),["assets/vaadin-select-5d6ab45b.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-split-layout.ts":()=>S(()=>E(()=>import("./vaadin-split-layout-10c9713b-81dc98be.js"),[],import.meta.url),[]),"./components/vaadin-text-area.ts":()=>S(()=>E(()=>import("./vaadin-text-area-41c5f60c-dc3da13b.js"),["./vaadin-text-area-41c5f60c-dc3da13b.js","./vaadin-text-field-e82c445d-6d62bc11.js"],import.meta.url),["assets/vaadin-text-area-41c5f60c.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-text-field.ts":()=>S(()=>E(()=>import("./vaadin-text-field-e82c445d-6d62bc11.js"),[],import.meta.url),[]),"./components/vaadin-time-picker.ts":()=>S(()=>E(()=>import("./vaadin-time-picker-2fa5314f-5064e1a6.js"),["./vaadin-time-picker-2fa5314f-5064e1a6.js","./vaadin-text-field-e82c445d-6d62bc11.js"],import.meta.url),["assets/vaadin-time-picker-2fa5314f.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-vertical-layout.ts":()=>S(()=>E(()=>import("./vaadin-vertical-layout-ff73c403-df5cd0ec.js"),[],import.meta.url),[]),"./components/vaadin-virtual-list.ts":()=>S(()=>E(()=>import("./vaadin-virtual-list-62d4499a-63477cc9.js"),[],import.meta.url),[])}),`./components/${t}.ts`);class Ts{constructor(e=$s){this.loader=e,this.metadata={}}async getMetadata(e){var o;const n=(o=e.element)==null?void 0:o.localName;if(!n)return null;if(!n.startsWith("vaadin-"))return wi(n);let i=this.metadata[n];if(i)return i;try{i=(await this.loader(n)).default,this.metadata[n]=i}catch{console.warn(`Failed to load metadata for component: ${n}`)}return i||null}}const Ns=new Ts,_t={crosshair:Ne`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
   <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
   <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
   <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
   <path d="M9 12l6 0"></path>
   <path d="M12 9l0 6"></path>
</svg>`,square:Ne`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
</svg>`,font:Ne`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 20l3 0"></path>
   <path d="M14 20l7 0"></path>
   <path d="M6.9 15l6.9 0"></path>
   <path d="M10.2 6.3l5.8 13.7"></path>
   <path d="M5 20l6 -16l2 0l7 16"></path>
</svg>`,undo:Ne`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1"></path>
</svg>`,redo:Ne`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M15 13l4 -4l-4 -4m4 4h-11a4 4 0 0 0 0 8h1"></path>
</svg>`,cross:Ne`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M18 6l-12 12"></path>
   <path d="M6 6l12 12"></path>
</svg>`};var Je=(t=>(t.disabled="disabled",t.enabled="enabled",t.missing_theme="missing_theme",t))(Je||{}),D=(t=>(t.local="local",t.global="global",t))(D||{});function vo(t,e){return`${t}|${e}`}class ce{constructor(e){this._properties={},this._metadata=e}get metadata(){return this._metadata}get properties(){return Object.values(this._properties)}getPropertyValue(e,o){return this._properties[vo(e,o)]||null}updatePropertyValue(e,o,n,i){if(!n){delete this._properties[vo(e,o)];return}let r=this.getPropertyValue(e,o);r?(r.value=n,r.modified=i||!1):(r={elementSelector:e,propertyName:o,value:n,modified:i||!1},this._properties[vo(e,o)]=r)}addPropertyValues(e){e.forEach(o=>{this.updatePropertyValue(o.elementSelector,o.propertyName,o.value,o.modified)})}getPropertyValuesForElement(e){return this.properties.filter(o=>o.elementSelector===e)}static combine(...e){if(e.length<2)throw new Error("Must provide at least two themes");const o=new ce(e[0].metadata);return e.forEach(n=>o.addPropertyValues(n.properties)),o}static fromServerRules(e,o,n){const i=new ce(e);return e.elements.forEach(r=>{const s=Me(r,o),l=n.find(a=>a.selector===s);l&&r.properties.forEach(a=>{const d=l.properties[a.propertyName];d&&i.updatePropertyValue(r.selector,a.propertyName,d,!0)})}),i}}function Me(t,e){const o=t.selector;if(e.themeScope==="global")return o;if(!e.localClassName)throw new Error("Can not build local scoped selector without instance class name");const n=o.match(/^[\w\d-_]+/),i=n&&n[0];if(!i)throw new Error(`Selector does not start with a tag name: ${o}`);return`${i}.${e.localClassName}${o.substring(i.length,o.length)}`}function Ps(t,e,o,n){const i=Me(t,e),r={[o]:n};return o==="border-width"&&(parseInt(n)>0?r["border-style"]="solid":r["border-style"]=""),{selector:i,properties:r}}function As(t){const e=Object.entries(t.properties).map(([o,n])=>`${o}: ${n};`).join(" ");return`${t.selector} { ${e} }`}let ut,In="";function zo(t){ut||(ut=new CSSStyleSheet,document.adoptedStyleSheets=[...document.adoptedStyleSheets,ut]),In+=t.cssText,ut.replaceSync(In)}const xi=w`
  .editor-row {
    display: flex;
    align-items: baseline;
    padding: var(--theme-editor-section-horizontal-padding);
    gap: 10px;
  }

  .editor-row > .label {
    flex: 0 0 auto;
    width: 120px;
  }

  .editor-row > .editor {
    flex: 1 1 0;
  }
`,Rn="__vaadin-theme-editor-measure-element",On=/((::before)|(::after))$/,Ln=/::part\(([\w\d_-]+)\)$/;zo(w`
  .__vaadin-theme-editor-measure-element {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
  }
`);async function Is(t){const e=new ce(t),o=document.createElement(t.tagName);o.classList.add(Rn),document.body.append(o),t.setupElement&&await t.setupElement(o);const n={themeScope:D.local,localClassName:Rn};try{t.elements.forEach(i=>{Mn(o,i,n,!0);let r=Me(i,n);const s=r.match(On);r=r.replace(On,"");const l=r.match(Ln),a=r.replace(Ln,"");let d=document.querySelector(a);if(d&&l){const h=`[part~="${l[1]}"]`;d=d.shadowRoot.querySelector(h)}if(!d)return;d.style.transition="none";const c=s?s[1]:null,m=getComputedStyle(d,c);i.properties.forEach(h=>{const v=m.getPropertyValue(h.propertyName)||h.defaultValue||"";e.updatePropertyValue(i.selector,h.propertyName,v)}),Mn(o,i,n,!1)})}finally{try{t.cleanupElement&&await t.cleanupElement(o)}finally{o.remove()}}return e}function Mn(t,e,o,n){if(e.stateAttribute){if(e.stateElementSelector){const i=Me({...e,selector:e.stateElementSelector},o);t=document.querySelector(i)}t&&(n?t.setAttribute(e.stateAttribute,""):t.removeAttribute(e.stateAttribute))}}function Vn(t){return t.trim()}function Rs(t){const e=t.element;if(!e)return null;const o=e.querySelector("label");if(o&&o.textContent)return Vn(o.textContent);const n=e.textContent;return n?Vn(n):null}class Os{constructor(){this._localClassNameMap=new Map}get stylesheet(){return this.ensureStylesheet(),this._stylesheet}add(e){this.ensureStylesheet(),this._stylesheet.replaceSync(e)}clear(){this.ensureStylesheet(),this._stylesheet.replaceSync("")}previewLocalClassName(e,o){if(!e)return;const n=this._localClassNameMap.get(e);n&&(e.classList.remove(n),e.overlayClass=null),o?(e.classList.add(o),e.overlayClass=o,this._localClassNameMap.set(e,o)):this._localClassNameMap.delete(e)}ensureStylesheet(){this._stylesheet||(this._stylesheet=new CSSStyleSheet,this._stylesheet.replaceSync(""),document.adoptedStyleSheets=[...document.adoptedStyleSheets,this._stylesheet])}}const ve=new Os;class Ls{constructor(e){this.pendingRequests={},this.requestCounter=0,this.globalUiId=this.getGlobalUiId(),this.wrappedConnection=e;const o=this.wrappedConnection.onMessage;this.wrappedConnection.onMessage=n=>{n.command==="themeEditorResponse"?this.handleResponse(n.data):o.call(this.wrappedConnection,n)}}sendRequest(e,o){const n=(this.requestCounter++).toString(),i=o.uiId??this.globalUiId;return new Promise((r,s)=>{this.wrappedConnection.send(e,{...o,requestId:n,uiId:i}),this.pendingRequests[n]={resolve:r,reject:s}})}handleResponse(e){const o=this.pendingRequests[e.requestId];if(!o){console.warn("Received response for unknown request");return}delete this.pendingRequests[e.requestId],e.code==="ok"?o.resolve(e):o.reject(e)}loadComponentMetadata(e){return this.sendRequest("themeEditorComponentMetadata",{nodeId:e.nodeId})}setLocalClassName(e,o){return this.sendRequest("themeEditorLocalClassName",{nodeId:e.nodeId,className:o})}setCssRules(e){return this.sendRequest("themeEditorRules",{rules:e})}loadRules(e){return this.sendRequest("themeEditorLoadRules",{selectors:e})}markAsUsed(){return this.sendRequest("themeEditorMarkAsUsed",{})}undo(e){return this.sendRequest("themeEditorHistory",{undo:e})}redo(e){return this.sendRequest("themeEditorHistory",{redo:e})}openCss(e){return this.sendRequest("themeEditorOpenCss",{selector:e})}getGlobalUiId(){const e=window.Vaadin;if(e&&e.Flow){const{clients:o}=e.Flow,n=Object.keys(o);for(const i of n){const r=o[i];if(r.getNodeId)return r.getUIId()}}return-1}}const O={index:-1,entries:[]};class Ms{constructor(e){this.api=e}get allowUndo(){return O.index>=0}get allowRedo(){return O.index<O.entries.length-1}get allowedActions(){return{allowUndo:this.allowUndo,allowRedo:this.allowRedo}}push(e,o,n){const i={requestId:e,execute:o,rollback:n};if(O.index++,O.entries=O.entries.slice(0,O.index),O.entries.push(i),o)try{o()}catch(r){console.error("Execute history entry failed",r)}return this.allowedActions}async undo(){if(!this.allowUndo)return this.allowedActions;const e=O.entries[O.index];O.index--;try{await this.api.undo(e.requestId),e.rollback&&e.rollback()}catch(o){console.error("Undo failed",o)}return this.allowedActions}async redo(){if(!this.allowRedo)return this.allowedActions;O.index++;const e=O.entries[O.index];try{await this.api.redo(e.requestId),e.execute&&e.execute()}catch(o){console.error("Redo failed",o)}return this.allowedActions}static clear(){O.entries=[],O.index=-1}}var Vs=Object.defineProperty,zs=Object.getOwnPropertyDescriptor,ue=(t,e,o,n)=>{for(var i=n>1?void 0:n?zs(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&Vs(e,o,i),i};class Ds extends CustomEvent{constructor(e,o,n){super("theme-property-value-change",{bubbles:!0,composed:!0,detail:{element:e,property:o,value:n}})}}class q extends A{constructor(){super(...arguments),this.value=""}static get styles(){return[xi,w`
        :host {
          display: block;
        }

        .editor-row .label .modified {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: orange;
          border-radius: 3px;
          margin-left: 3px;
        }
      `]}update(e){super.update(e),(e.has("propertyMetadata")||e.has("theme"))&&this.updateValueFromTheme()}render(){var e;return f`
      <div class="editor-row">
        <div class="label">
          ${this.propertyMetadata.displayName}
          ${(e=this.propertyValue)!=null&&e.modified?f`<span class="modified"></span>`:null}
        </div>
        <div class="editor">${this.renderEditor()}</div>
      </div>
    `}updateValueFromTheme(){var e;this.propertyValue=this.theme.getPropertyValue(this.elementMetadata.selector,this.propertyMetadata.propertyName),this.value=((e=this.propertyValue)==null?void 0:e.value)||""}dispatchChange(e){this.dispatchEvent(new Ds(this.elementMetadata,this.propertyMetadata,e))}}ue([y({})],q.prototype,"elementMetadata",2);ue([y({})],q.prototype,"propertyMetadata",2);ue([y({})],q.prototype,"theme",2);ue([T()],q.prototype,"propertyValue",2);ue([T()],q.prototype,"value",2);class Nt{constructor(e){if(this._values=[],this._rawValues={},e){const o=e.propertyName,n=e.presets??[];this._values=(n||[]).map(r=>r.startsWith("--")?`var(${r})`:r);const i=document.createElement("div");i.style.borderStyle="solid",i.style.visibility="hidden",document.body.append(i);try{this._values.forEach(r=>{i.style.setProperty(o,r);const s=getComputedStyle(i);this._rawValues[r]=s.getPropertyValue(o).trim()})}finally{i.remove()}}}get values(){return this._values}get rawValues(){return this._rawValues}tryMapToRawValue(e){return this._rawValues[e]??e}tryMapToPreset(e){return this.findPreset(e)??e}findPreset(e){const o=e&&e.trim();return this.values.find(n=>this._rawValues[n]===o)}}class zn extends CustomEvent{constructor(e){super("change",{detail:{value:e}})}}let Pt=class extends A{constructor(){super(...arguments),this.value="",this.showClearButton=!1}static get styles(){return w`
      :host {
        display: inline-block;
        width: 100%;
        position: relative;
      }

      input {
        width: 100%;
        box-sizing: border-box;
        padding: 0.25rem 0.375rem;
        color: inherit;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.25rem;
        border: none;
      }

      button {
        display: none;
        position: absolute;
        right: 4px;
        top: 4px;
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      button svg {
        width: 16px;
        height: 16px;
      }

      button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      :host(.show-clear-button) input {
        padding-right: 20px;
      }

      :host(.show-clear-button) button {
        display: block;
      }
    `}update(t){super.update(t),t.has("showClearButton")&&(this.showClearButton?this.classList.add("show-clear-button"):this.classList.remove("show-clear-button"))}render(){return f`
      <input class="input" .value=${this.value} @change=${this.handleInputChange} />
      <button @click=${this.handleClearClick}>${_t.cross}</button>
    `}handleInputChange(t){const e=t.target;this.dispatchEvent(new zn(e.value))}handleClearClick(){this.dispatchEvent(new zn(""))}};ue([y({})],Pt.prototype,"value",2);ue([y({})],Pt.prototype,"showClearButton",2);Pt=ue([F("vaadin-dev-tools-theme-text-input")],Pt);var Us=Object.defineProperty,js=Object.getOwnPropertyDescriptor,Dt=(t,e,o,n)=>{for(var i=n>1?void 0:n?js(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&Us(e,o,i),i};class Fs extends CustomEvent{constructor(e){super("class-name-change",{detail:{value:e}})}}let Xe=class extends A{constructor(){super(...arguments),this.editedClassName="",this.invalid=!1}static get styles(){return[xi,w`
        .editor-row {
          padding-top: 0;
        }

        .editor-row .editor .error {
          display: inline-block;
          color: var(--dev-tools-red-color);
          margin-top: 4px;
        }
      `]}update(t){super.update(t),t.has("className")&&(this.editedClassName=this.className,this.invalid=!1)}render(){return f` <div class="editor-row local-class-name">
      <div class="label">CSS class name</div>
      <div class="editor">
        <vaadin-dev-tools-theme-text-input
          type="text"
          .value=${this.editedClassName}
          @change=${this.handleInputChange}
        ></vaadin-dev-tools-theme-text-input>
        ${this.invalid?f`<br /><span class="error">Please enter a valid CSS class name</span>`:null}
      </div>
    </div>`}handleInputChange(t){this.editedClassName=t.detail.value;const e=/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;this.invalid=!this.editedClassName.match(e),!this.invalid&&this.editedClassName!==this.className&&this.dispatchEvent(new Fs(this.editedClassName))}};Dt([y({})],Xe.prototype,"className",2);Dt([T()],Xe.prototype,"editedClassName",2);Dt([T()],Xe.prototype,"invalid",2);Xe=Dt([F("vaadin-dev-tools-theme-class-name-editor")],Xe);var Bs=Object.defineProperty,Hs=Object.getOwnPropertyDescriptor,Ut=(t,e,o,n)=>{for(var i=n>1?void 0:n?Hs(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&Bs(e,o,i),i};class qs extends CustomEvent{constructor(e){super("scope-change",{detail:{value:e}})}}zo(w`
  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] {
    --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
    z-index: 100000 !important;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector']::part(overlay) {
    background: #333;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item {
    color: rgba(255, 255, 255, 0.8);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(content) {
    font-size: 13px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item .title {
    color: rgba(255, 255, 255, 0.95);
    font-weight: bold;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark) {
    margin: 6px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark)::before {
    color: rgba(255, 255, 255, 0.95);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`);let Qe=class extends A{constructor(){super(...arguments),this.value=D.local}static get styles(){return w`
      vaadin-select {
        --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
        width: 100px;
      }

      vaadin-select::part(input-field) {
        background: rgba(0, 0, 0, 0.2);
      }

      vaadin-select vaadin-select-value-button,
      vaadin-select::part(toggle-button) {
        color: var(--dev-tools-text-color);
      }

      vaadin-select:hover vaadin-select-value-button,
      vaadin-select:hover::part(toggle-button) {
        color: var(--dev-tools-text-color-emphasis);
      }

      vaadin-select vaadin-select-item {
        font-size: 13px;
      }
    `}update(t){var e;super.update(t),t.has("metadata")&&((e=this.select)==null||e.requestContentUpdate())}render(){return f` <vaadin-select
      theme="small vaadin-dev-tools-theme-scope-selector"
      .value=${this.value}
      .renderer=${this.selectRenderer.bind(this)}
      @value-changed=${this.handleValueChange}
    ></vaadin-select>`}selectRenderer(t){var e;const o=((e=this.metadata)==null?void 0:e.displayName)||"Component",n=`${o}s`;Ie(f`
        <vaadin-list-box>
          <vaadin-item value=${D.local} label="Local">
            <span class="title">Local</span>
            <br />
            <span>Edit styles for this ${o}</span>
          </vaadin-item>
          <vaadin-item value=${D.global} label="Global">
            <span class="title">Global</span>
            <br />
            <span>Edit styles for all ${n}</span>
          </vaadin-item>
        </vaadin-list-box>
      `,t)}handleValueChange(t){const e=t.detail.value;e!==this.value&&this.dispatchEvent(new qs(e))}};Ut([y({})],Qe.prototype,"value",2);Ut([y({})],Qe.prototype,"metadata",2);Ut([ot("vaadin-select")],Qe.prototype,"select",2);Qe=Ut([F("vaadin-dev-tools-theme-scope-selector")],Qe);var Ws=Object.defineProperty,Gs=Object.getOwnPropertyDescriptor,Ks=(t,e,o,n)=>{for(var i=n>1?void 0:n?Gs(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&Ws(e,o,i),i};let Dn=class extends q{static get styles(){return[q.styles,w`
        .editor-row {
          align-items: center;
        }
      `]}handleInputChange(t){const e=t.target.checked?this.propertyMetadata.checkedValue:"";this.dispatchChange(e||"")}renderEditor(){const t=this.value===this.propertyMetadata.checkedValue;return f` <input type="checkbox" .checked=${t} @change=${this.handleInputChange} /> `}};Dn=Ks([F("vaadin-dev-tools-theme-checkbox-property-editor")],Dn);var Ys=Object.defineProperty,Js=Object.getOwnPropertyDescriptor,Xs=(t,e,o,n)=>{for(var i=n>1?void 0:n?Js(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&Ys(e,o,i),i};let Un=class extends q{handleInputChange(t){this.dispatchChange(t.detail.value)}renderEditor(){var t;return f`
      <vaadin-dev-tools-theme-text-input
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleInputChange}
      ></vaadin-dev-tools-theme-text-input>
    `}};Un=Xs([F("vaadin-dev-tools-theme-text-property-editor")],Un);var Qs=Object.defineProperty,Zs=Object.getOwnPropertyDescriptor,Do=(t,e,o,n)=>{for(var i=n>1?void 0:n?Zs(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&Qs(e,o,i),i};let At=class extends q{constructor(){super(...arguments),this.selectedPresetIndex=-1,this.presets=new Nt}static get styles(){return[q.styles,w`
        :host {
          --preset-count: 3;
          --slider-bg: #fff;
          --slider-border: #333;
        }

        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .editor-row .input {
          flex: 0 0 auto;
          width: 80px;
        }

        .slider-wrapper {
          flex: 1 1 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .icon {
          width: 20px;
          height: 20px;
          color: #aaa;
        }

        .icon.prefix > svg {
          transform: scale(0.75);
        }

        .slider {
          flex: 1 1 0;
          -webkit-appearance: none;
          background: linear-gradient(to right, #666, #666 2px, transparent 2px);
          background-size: calc((100% - 13px) / (var(--preset-count) - 1)) 8px;
          background-position: 5px 50%;
          background-repeat: repeat-x;
        }

        .slider::-webkit-slider-runnable-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-moz-range-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .custom-value {
          opacity: 0.5;
        }

        .custom-value:hover,
        .custom-value:focus-within {
          opacity: 1;
        }

        .custom-value:not(:hover, :focus-within) {
          --slider-bg: #333;
          --slider-border: #666;
        }
      `]}update(t){t.has("propertyMetadata")&&(this.presets=new Nt(this.propertyMetadata)),super.update(t)}renderEditor(){var t;const e={"slider-wrapper":!0,"custom-value":this.selectedPresetIndex<0},o=this.presets.values.length;return f`
      <div class=${Vo(e)}>
        ${null}
        <input
          type="range"
          class="slider"
          style="--preset-count: ${o}"
          step="1"
          min="0"
          .max=${(o-1).toString()}
          .value=${this.selectedPresetIndex}
          @input=${this.handleSliderInput}
          @change=${this.handleSliderChange}
        />
        ${null}
      </div>
      <vaadin-dev-tools-theme-text-input
        class="input"
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleValueChange}
      ></vaadin-dev-tools-theme-text-input>
    `}handleSliderInput(t){const e=t.target,o=parseInt(e.value),n=this.presets.values[o];this.selectedPresetIndex=o,this.value=this.presets.rawValues[n]}handleSliderChange(){this.dispatchChange(this.value)}handleValueChange(t){this.value=t.detail.value,this.updateSliderValue(),this.dispatchChange(this.value)}dispatchChange(t){const e=this.presets.tryMapToPreset(t);super.dispatchChange(e)}updateValueFromTheme(){var t;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((t=this.propertyValue)==null?void 0:t.value)||""),this.updateSliderValue()}updateSliderValue(){const t=this.presets.findPreset(this.value);this.selectedPresetIndex=t?this.presets.values.indexOf(t):-1}};Do([T()],At.prototype,"selectedPresetIndex",2);Do([T()],At.prototype,"presets",2);At=Do([F("vaadin-dev-tools-theme-range-property-editor")],At);const Ve=(t,e=0,o=1)=>t>o?o:t<e?e:t,V=(t,e=0,o=Math.pow(10,e))=>Math.round(o*t)/o,Si=({h:t,s:e,v:o,a:n})=>{const i=(200-e)*o/100;return{h:V(t),s:V(i>0&&i<200?e*o/100/(i<=100?i:200-i)*100:0),l:V(i/2),a:V(n,2)}},$o=t=>{const{h:e,s:o,l:n}=Si(t);return`hsl(${e}, ${o}%, ${n}%)`},fo=t=>{const{h:e,s:o,l:n,a:i}=Si(t);return`hsla(${e}, ${o}%, ${n}%, ${i})`},ea=({h:t,s:e,v:o,a:n})=>{t=t/360*6,e=e/100,o=o/100;const i=Math.floor(t),r=o*(1-e),s=o*(1-(t-i)*e),l=o*(1-(1-t+i)*e),a=i%6;return{r:V([o,s,r,r,l,o][a]*255),g:V([l,o,o,s,r,r][a]*255),b:V([r,r,l,o,o,s][a]*255),a:V(n,2)}},ta=t=>{const{r:e,g:o,b:n,a:i}=ea(t);return`rgba(${e}, ${o}, ${n}, ${i})`},oa=t=>{const e=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(t);return e?na({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)}):{h:0,s:0,v:0,a:1}},na=({r:t,g:e,b:o,a:n})=>{const i=Math.max(t,e,o),r=i-Math.min(t,e,o),s=r?i===t?(e-o)/r:i===e?2+(o-t)/r:4+(t-e)/r:0;return{h:V(60*(s<0?s+6:s)),s:V(i?r/i*100:0),v:V(i/255*100),a:n}},ia=(t,e)=>{if(t===e)return!0;for(const o in t)if(t[o]!==e[o])return!1;return!0},ra=(t,e)=>t.replace(/\s/g,"")===e.replace(/\s/g,""),jn={},Ei=t=>{let e=jn[t];return e||(e=document.createElement("template"),e.innerHTML=t,jn[t]=e),e},Uo=(t,e,o)=>{t.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:o}))};let Re=!1;const To=t=>"touches"in t,sa=t=>Re&&!To(t)?!1:(Re||(Re=To(t)),!0),Fn=(t,e)=>{const o=To(e)?e.touches[0]:e,n=t.el.getBoundingClientRect();Uo(t.el,"move",t.getMove({x:Ve((o.pageX-(n.left+window.pageXOffset))/n.width),y:Ve((o.pageY-(n.top+window.pageYOffset))/n.height)}))},aa=(t,e)=>{const o=e.keyCode;o>40||t.xy&&o<37||o<33||(e.preventDefault(),Uo(t.el,"move",t.getMove({x:o===39?.01:o===37?-.01:o===34?.05:o===33?-.05:o===35?1:o===36?-1:0,y:o===40?.01:o===38?-.01:0},!0)))};class jo{constructor(e,o,n,i){const r=Ei(`<div role="slider" tabindex="0" part="${o}" ${n}><div part="${o}-pointer"></div></div>`);e.appendChild(r.content.cloneNode(!0));const s=e.querySelector(`[part=${o}]`);s.addEventListener("mousedown",this),s.addEventListener("touchstart",this),s.addEventListener("keydown",this),this.el=s,this.xy=i,this.nodes=[s.firstChild,s]}set dragging(e){const o=e?document.addEventListener:document.removeEventListener;o(Re?"touchmove":"mousemove",this),o(Re?"touchend":"mouseup",this)}handleEvent(e){switch(e.type){case"mousedown":case"touchstart":if(e.preventDefault(),!sa(e)||!Re&&e.button!=0)return;this.el.focus(),Fn(this,e),this.dragging=!0;break;case"mousemove":case"touchmove":e.preventDefault(),Fn(this,e);break;case"mouseup":case"touchend":this.dragging=!1;break;case"keydown":aa(this,e);break}}style(e){e.forEach((o,n)=>{for(const i in o)this.nodes[n].style.setProperty(i,o[i])})}}class la extends jo{constructor(e){super(e,"hue",'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"',!1)}update({h:e}){this.h=e,this.style([{left:`${e/360*100}%`,color:$o({h:e,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuenow",`${V(e)}`)}getMove(e,o){return{h:o?Ve(this.h+e.x*360,0,360):360*e.x}}}class da extends jo{constructor(e){super(e,"saturation",'aria-label="Color"',!0)}update(e){this.hsva=e,this.style([{top:`${100-e.v}%`,left:`${e.s}%`,color:$o(e)},{"background-color":$o({h:e.h,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuetext",`Saturation ${V(e.s)}%, Brightness ${V(e.v)}%`)}getMove(e,o){return{s:o?Ve(this.hsva.s+e.x*100,0,100):e.x*100,v:o?Ve(this.hsva.v-e.y*100,0,100):Math.round(100-e.y*100)}}}const ca=':host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;display:flex;place-content:center center;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{content:"";width:100%;height:100%;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}',ha="[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}",ua="[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}",pt=Symbol("same"),go=Symbol("color"),Bn=Symbol("hsva"),yo=Symbol("update"),Hn=Symbol("parts"),It=Symbol("css"),Rt=Symbol("sliders");let pa=class extends HTMLElement{static get observedAttributes(){return["color"]}get[It](){return[ca,ha,ua]}get[Rt](){return[da,la]}get color(){return this[go]}set color(t){if(!this[pt](t)){const e=this.colorModel.toHsva(t);this[yo](e),this[go]=t}}constructor(){super();const t=Ei(`<style>${this[It].join("")}</style>`),e=this.attachShadow({mode:"open"});e.appendChild(t.content.cloneNode(!0)),e.addEventListener("move",this),this[Hn]=this[Rt].map(o=>new o(e))}connectedCallback(){if(this.hasOwnProperty("color")){const t=this.color;delete this.color,this.color=t}else this.color||(this.color=this.colorModel.defaultColor)}attributeChangedCallback(t,e,o){const n=this.colorModel.fromAttr(o);this[pt](n)||(this.color=n)}handleEvent(t){const e=this[Bn],o={...e,...t.detail};this[yo](o);let n;!ia(o,e)&&!this[pt](n=this.colorModel.fromHsva(o))&&(this[go]=n,Uo(this,"color-changed",{value:n}))}[pt](t){return this.color&&this.colorModel.equal(t,this.color)}[yo](t){this[Bn]=t,this[Hn].forEach(e=>e.update(t))}};class ma extends jo{constructor(e){super(e,"alpha",'aria-label="Alpha" aria-valuemin="0" aria-valuemax="1"',!1)}update(e){this.hsva=e;const o=fo({...e,a:0}),n=fo({...e,a:1}),i=e.a*100;this.style([{left:`${i}%`,color:fo(e)},{"--gradient":`linear-gradient(90deg, ${o}, ${n}`}]);const r=V(i);this.el.setAttribute("aria-valuenow",`${r}`),this.el.setAttribute("aria-valuetext",`${r}%`)}getMove(e,o){return{a:o?Ve(this.hsva.a+e.x):e.x}}}const va=`[part=alpha]{flex:0 0 24px}[part=alpha]::after{display:block;content:"";position:absolute;top:0;left:0;right:0;bottom:0;border-radius:inherit;background-image:var(--gradient);box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part^=alpha]{background-color:#fff;background-image:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')}[part=alpha-pointer]{top:50%}`;class fa extends pa{get[It](){return[...super[It],va]}get[Rt](){return[...super[Rt],ma]}}const ga={defaultColor:"rgba(0, 0, 0, 1)",toHsva:oa,fromHsva:ta,equal:ra,fromAttr:t=>t};class ya extends fa{get colorModel(){return ga}}/**
* @license
* Copyright (c) 2017 - 2023 Vaadin Ltd.
* This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/function ba(t){const e=[];for(;t;){if(t.nodeType===Node.DOCUMENT_NODE){e.push(t);break}if(t.nodeType===Node.DOCUMENT_FRAGMENT_NODE){e.push(t),t=t.host;continue}if(t.assignedSlot){t=t.assignedSlot;continue}t=t.parentNode}return e}const bo={start:"top",end:"bottom"},_o={start:"left",end:"right"},qn=new ResizeObserver(t=>{setTimeout(()=>{t.forEach(e=>{e.target.__overlay&&e.target.__overlay._updatePosition()})})}),_a=t=>class extends t{static get properties(){return{positionTarget:{type:Object,value:null},horizontalAlign:{type:String,value:"start"},verticalAlign:{type:String,value:"top"},noHorizontalOverlap:{type:Boolean,value:!1},noVerticalOverlap:{type:Boolean,value:!1},requiredVerticalSpace:{type:Number,value:0}}}static get observers(){return["__positionSettingsChanged(horizontalAlign, verticalAlign, noHorizontalOverlap, noVerticalOverlap, requiredVerticalSpace)","__overlayOpenedChanged(opened, positionTarget)"]}constructor(){super(),this.__onScroll=this.__onScroll.bind(this),this._updatePosition=this._updatePosition.bind(this)}connectedCallback(){super.connectedCallback(),this.opened&&this.__addUpdatePositionEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.__removeUpdatePositionEventListeners()}__addUpdatePositionEventListeners(){window.addEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes=ba(this.positionTarget),this.__positionTargetAncestorRootNodes.forEach(e=>{e.addEventListener("scroll",this.__onScroll,!0)})}__removeUpdatePositionEventListeners(){window.removeEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes&&(this.__positionTargetAncestorRootNodes.forEach(e=>{e.removeEventListener("scroll",this.__onScroll,!0)}),this.__positionTargetAncestorRootNodes=null)}__overlayOpenedChanged(e,o){if(this.__removeUpdatePositionEventListeners(),o&&(o.__overlay=null,qn.unobserve(o),e&&(this.__addUpdatePositionEventListeners(),o.__overlay=this,qn.observe(o))),e){const n=getComputedStyle(this);this.__margins||(this.__margins={},["top","bottom","left","right"].forEach(i=>{this.__margins[i]=parseInt(n[i],10)})),this.setAttribute("dir",n.direction),this._updatePosition(),requestAnimationFrame(()=>this._updatePosition())}}__positionSettingsChanged(){this._updatePosition()}__onScroll(e){this.contains(e.target)||this._updatePosition()}_updatePosition(){if(!this.positionTarget||!this.opened)return;const e=this.positionTarget.getBoundingClientRect(),o=this.__shouldAlignStartVertically(e);this.style.justifyContent=o?"flex-start":"flex-end";const n=this.__isRTL,i=this.__shouldAlignStartHorizontally(e,n),r=!n&&i||n&&!i;this.style.alignItems=r?"flex-start":"flex-end";const s=this.getBoundingClientRect(),l=this.__calculatePositionInOneDimension(e,s,this.noVerticalOverlap,bo,this,o),a=this.__calculatePositionInOneDimension(e,s,this.noHorizontalOverlap,_o,this,i);Object.assign(this.style,l,a),this.toggleAttribute("bottom-aligned",!o),this.toggleAttribute("top-aligned",o),this.toggleAttribute("end-aligned",!r),this.toggleAttribute("start-aligned",r)}__shouldAlignStartHorizontally(e,o){const n=Math.max(this.__oldContentWidth||0,this.$.overlay.offsetWidth);this.__oldContentWidth=this.$.overlay.offsetWidth;const i=Math.min(window.innerWidth,document.documentElement.clientWidth),r=!o&&this.horizontalAlign==="start"||o&&this.horizontalAlign==="end";return this.__shouldAlignStart(e,n,i,this.__margins,r,this.noHorizontalOverlap,_o)}__shouldAlignStartVertically(e){const o=this.requiredVerticalSpace||Math.max(this.__oldContentHeight||0,this.$.overlay.offsetHeight);this.__oldContentHeight=this.$.overlay.offsetHeight;const n=Math.min(window.innerHeight,document.documentElement.clientHeight),i=this.verticalAlign==="top";return this.__shouldAlignStart(e,o,n,this.__margins,i,this.noVerticalOverlap,bo)}__shouldAlignStart(e,o,n,i,r,s,l){const a=n-e[s?l.end:l.start]-i[l.end],d=e[s?l.start:l.end]-i[l.start],c=r?a:d,m=c>(r?d:a)||c>o;return r===m}__adjustBottomProperty(e,o,n){let i;if(e===o.end){if(o.end===bo.end){const r=Math.min(window.innerHeight,document.documentElement.clientHeight);if(n>r&&this.__oldViewportHeight){const s=this.__oldViewportHeight-r;i=n-s}this.__oldViewportHeight=r}if(o.end===_o.end){const r=Math.min(window.innerWidth,document.documentElement.clientWidth);if(n>r&&this.__oldViewportWidth){const s=this.__oldViewportWidth-r;i=n-s}this.__oldViewportWidth=r}}return i}__calculatePositionInOneDimension(e,o,n,i,r,s){const l=s?i.start:i.end,a=s?i.end:i.start,d=parseFloat(r.style[l]||getComputedStyle(r)[l]),c=this.__adjustBottomProperty(l,i,d),m=o[s?i.start:i.end]-e[n===s?i.end:i.start],h=c?`${c}px`:`${d+m*(s?-1:1)}px`;return{[l]:h,[a]:""}}};var wa=Object.defineProperty,xa=Object.getOwnPropertyDescriptor,we=(t,e,o,n)=>{for(var i=n>1?void 0:n?xa(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&wa(e,o,i),i};class Sa extends CustomEvent{constructor(e){super("color-picker-change",{detail:{value:e}})}}const Ci=w`
  :host {
    --preview-size: 24px;
    --preview-color: rgba(0, 0, 0, 0);
  }

  .preview {
    --preview-bg-size: calc(var(--preview-size) / 2);
    --preview-bg-pos: calc(var(--preview-size) / 4);

    width: var(--preview-size);
    height: var(--preview-size);
    padding: 0;
    position: relative;
    overflow: hidden;
    background: none;
    border: solid 2px #888;
    border-radius: 4px;
    box-sizing: content-box;
  }

  .preview::before,
  .preview::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .preview::before {
    content: '';
    background: white;
    background-image: linear-gradient(45deg, #666 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #666 75%), linear-gradient(45deg, transparent 75%, #666 75%),
      linear-gradient(45deg, #666 25%, transparent 25%);
    background-size: var(--preview-bg-size) var(--preview-bg-size);
    background-position: 0 0, 0 0, calc(var(--preview-bg-pos) * -1) calc(var(--preview-bg-pos) * -1),
      var(--preview-bg-pos) var(--preview-bg-pos);
  }

  .preview::after {
    content: '';
    background-color: var(--preview-color);
  }
`;let Ze=class extends A{constructor(){super(...arguments),this.commitValue=!1}static get styles(){return[Ci,w`
        #toggle {
          display: block;
        }
      `]}update(t){super.update(t),t.has("value")&&this.overlay&&this.overlay.requestContentUpdate()}firstUpdated(){this.overlay=document.createElement("vaadin-dev-tools-color-picker-overlay"),this.overlay.renderer=this.renderOverlayContent.bind(this),this.overlay.owner=this,this.overlay.positionTarget=this.toggle,this.overlay.noVerticalOverlap=!0,this.overlay.addEventListener("vaadin-overlay-escape-press",this.handleOverlayEscape.bind(this)),this.overlay.addEventListener("vaadin-overlay-close",this.handleOverlayClose.bind(this)),this.append(this.overlay)}render(){const t=this.value||"rgba(0, 0, 0, 0)";return f` <button
      id="toggle"
      class="preview"
      style="--preview-color: ${t}"
      @click=${this.open}
    ></button>`}open(){this.commitValue=!1,this.overlay.opened=!0,this.overlay.style.zIndex="1000000";const t=this.overlay.shadowRoot.querySelector('[part="overlay"]');t.style.background="#333"}renderOverlayContent(t){const e=getComputedStyle(this.toggle,"::after").getPropertyValue("background-color");Ie(f` <div>
        <vaadin-dev-tools-color-picker-overlay-content
          .value=${e}
          .presets=${this.presets}
          @color-changed=${this.handleColorChange.bind(this)}
        ></vaadin-dev-tools-color-picker-overlay-content>
      </div>`,t)}handleColorChange(t){this.commitValue=!0,this.dispatchEvent(new Sa(t.detail.value)),t.detail.close&&(this.overlay.opened=!1,this.handleOverlayClose())}handleOverlayEscape(){this.commitValue=!1}handleOverlayClose(){const t=this.commitValue?"color-picker-commit":"color-picker-cancel";this.dispatchEvent(new CustomEvent(t))}};we([y({})],Ze.prototype,"value",2);we([y({})],Ze.prototype,"presets",2);we([ot("#toggle")],Ze.prototype,"toggle",2);Ze=we([F("vaadin-dev-tools-color-picker")],Ze);let Ot=class extends A{static get styles(){return[Ci,w`
        :host {
          display: block;
          padding: 12px;
        }

        .picker::part(saturation),
        .picker::part(hue) {
          margin-bottom: 10px;
        }

        .picker::part(hue),
        .picker::part(alpha) {
          flex: 0 0 20px;
        }

        .picker::part(saturation),
        .picker::part(hue),
        .picker::part(alpha) {
          border-radius: 3px;
        }

        .picker::part(saturation-pointer),
        .picker::part(hue-pointer),
        .picker::part(alpha-pointer) {
          width: 20px;
          height: 20px;
        }

        .swatches {
          display: grid;
          grid-template-columns: repeat(6, var(--preview-size));
          grid-column-gap: 10px;
          grid-row-gap: 6px;
          margin-top: 16px;
        }
      `]}render(){return f` <div>
      <vaadin-dev-tools-rgba-string-color-picker
        class="picker"
        .color=${this.value}
        @color-changed=${this.handlePickerChange}
      ></vaadin-dev-tools-rgba-string-color-picker>
      ${this.renderSwatches()}
    </div>`}renderSwatches(){if(!this.presets||this.presets.length===0)return;const t=this.presets.map(e=>f` <button
        class="preview"
        style="--preview-color: ${e}"
        @click=${()=>this.selectPreset(e)}
      ></button>`);return f` <div class="swatches">${t}</div>`}handlePickerChange(t){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:t.detail.value}}))}selectPreset(t){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:t,close:!0}}))}};we([y({})],Ot.prototype,"value",2);we([y({})],Ot.prototype,"presets",2);Ot=we([F("vaadin-dev-tools-color-picker-overlay-content")],Ot);customElements.whenDefined("vaadin-overlay").then(()=>{const t=customElements.get("vaadin-overlay");class e extends _a(t){}customElements.define("vaadin-dev-tools-color-picker-overlay",e)});customElements.define("vaadin-dev-tools-rgba-string-color-picker",ya);var Ea=Object.defineProperty,Ca=Object.getOwnPropertyDescriptor,ka=(t,e,o,n)=>{for(var i=n>1?void 0:n?Ca(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&Ea(e,o,i),i};let Wn=class extends q{constructor(){super(...arguments),this.presets=new Nt}static get styles(){return[q.styles,w`
        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `]}update(t){t.has("propertyMetadata")&&(this.presets=new Nt(this.propertyMetadata)),super.update(t)}renderEditor(){var t;return f`
      <vaadin-dev-tools-color-picker
        .value=${this.value}
        .presets=${this.presets.values}
        @color-picker-change=${this.handleColorPickerChange}
        @color-picker-commit=${this.handleColorPickerCommit}
        @color-picker-cancel=${this.handleColorPickerCancel}
      ></vaadin-dev-tools-color-picker>
      <vaadin-dev-tools-theme-text-input
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleInputChange}
      ></vaadin-dev-tools-theme-text-input>
    `}handleInputChange(t){this.value=t.detail.value,this.dispatchChange(this.value)}handleColorPickerChange(t){this.value=t.detail.value}handleColorPickerCommit(){this.dispatchChange(this.value)}handleColorPickerCancel(){this.updateValueFromTheme()}dispatchChange(t){const e=this.presets.tryMapToPreset(t);super.dispatchChange(e)}updateValueFromTheme(){var t;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((t=this.propertyValue)==null?void 0:t.value)||"")}};Wn=ka([F("vaadin-dev-tools-theme-color-property-editor")],Wn);var $a=Object.defineProperty,Ta=Object.getOwnPropertyDescriptor,Fo=(t,e,o,n)=>{for(var i=n>1?void 0:n?Ta(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&$a(e,o,i),i};class Na extends CustomEvent{constructor(e){super("open-css",{detail:{element:e}})}}let Lt=class extends A{static get styles(){return w`
      .section .header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding: 0.4rem var(--theme-editor-section-horizontal-padding);
        color: var(--dev-tools-text-color-emphasis);
        background-color: rgba(0, 0, 0, 0.2);
      }

      .section .property-list .property-editor:not(:last-child) {
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .section .header .open-css {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        background-color: rgba(255, 255, 255, 0.12);
        color: var(--dev-tools-text-color);
        font-weight: 600;
        padding: 0.25rem 0.375rem;
        border-radius: 0.25rem;
      }

      .section .header .open-css:hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}render(){const t=this.metadata.elements.map(e=>this.renderSection(e));return f` <div>${t}</div> `}renderSection(t){const e=t.properties.map(o=>this.renderPropertyEditor(t,o));return f`
      <div class="section" data-testid=${t==null?void 0:t.displayName}>
        <div class="header">
          <span> ${t.displayName} </span>
          <button class="open-css" @click=${()=>this.handleOpenCss(t)}>Edit CSS</button>
        </div>
        <div class="property-list">${e}</div>
      </div>
    `}handleOpenCss(t){this.dispatchEvent(new Na(t))}renderPropertyEditor(t,e){let o;switch(e.editorType){case P.checkbox:o=ht`vaadin-dev-tools-theme-checkbox-property-editor`;break;case P.range:o=ht`vaadin-dev-tools-theme-range-property-editor`;break;case P.color:o=ht`vaadin-dev-tools-theme-color-property-editor`;break;default:o=ht`vaadin-dev-tools-theme-text-property-editor`}return vs` <${o}
          class="property-editor"
          .elementMetadata=${t}
          .propertyMetadata=${e}
          .theme=${this.theme}
          data-testid=${e.propertyName}
        >
        </${o}>`}};Fo([y({})],Lt.prototype,"metadata",2);Fo([y({})],Lt.prototype,"theme",2);Lt=Fo([F("vaadin-dev-tools-theme-property-list")],Lt);var Pa=Object.defineProperty,Aa=Object.getOwnPropertyDescriptor,Ia=(t,e,o,n)=>{for(var i=n>1?void 0:n?Aa(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&Pa(e,o,i),i};let Mt=class extends A{render(){return f`<div
      tabindex="-1"
      @mousemove=${this.onMouseMove}
      @click=${this.onClick}
      @keydown=${this.onKeyDown}
    ></div>`}onClick(t){const e=this.getTargetElement(t);this.dispatchEvent(new CustomEvent("shim-click",{detail:{target:e}}))}onMouseMove(t){const e=this.getTargetElement(t);this.dispatchEvent(new CustomEvent("shim-mousemove",{detail:{target:e}}))}onKeyDown(t){this.dispatchEvent(new CustomEvent("shim-keydown",{detail:{originalEvent:t}}))}getTargetElement(t){this.style.display="none";const e=document.elementFromPoint(t.clientX,t.clientY);return this.style.display="",e}};Mt.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0};Mt.styles=[w`
      div {
        pointer-events: auto;
        background: rgba(255, 255, 255, 0);
        position: fixed;
        inset: 0px;
        z-index: 1000000;
      }
    `];Mt=Ia([F("vaadin-dev-tools-shim")],Mt);const ki=w`
  .popup {
    width: auto;
    position: fixed;
    background-color: var(--dev-tools-background-color-active-blurred);
    color: var(--dev-tools-text-color-primary);
    padding: 0.1875rem 0.75rem 0.1875rem 1rem;
    background-clip: padding-box;
    border-radius: var(--dev-tools-border-radius);
    overflow: hidden;
    margin: 0.5rem;
    width: 30rem;
    max-width: calc(100% - 1rem);
    max-height: calc(100vh - 1rem);
    flex-shrink: 1;
    background-color: var(--dev-tools-background-color-active);
    color: var(--dev-tools-text-color);
    transition: var(--dev-tools-transition-duration);
    transform-origin: bottom right;
    display: flex;
    flex-direction: column;
    box-shadow: var(--dev-tools-box-shadow);
    outline: none;
  }
`;var Ra=Object.defineProperty,Oa=Object.getOwnPropertyDescriptor,nt=(t,e,o,n)=>{for(var i=n>1?void 0:n?Oa(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&Ra(e,o,i),i};let he=class extends A{constructor(){super(...arguments),this.active=!1,this.components=[],this.selected=0}connectedCallback(){super.connectedCallback();const t=new CSSStyleSheet;t.replaceSync(`
    .vaadin-dev-tools-highlight-overlay {
      pointer-events: none;
      position: absolute;
      z-index: 10000;
      background: rgba(158,44,198,0.25);
    }`),document.adoptedStyleSheets=[...document.adoptedStyleSheets,t],this.overlayElement=document.createElement("div"),this.overlayElement.classList.add("vaadin-dev-tools-highlight-overlay")}render(){var t;return this.active?(this.style.display="block",f`
      <vaadin-dev-tools-shim
        @shim-click=${this.shimClick}
        @shim-mousemove=${this.shimMove}
        @shim-keydown=${this.shimKeydown}
      ></vaadin-dev-tools-shim>
      <div class="window popup component-picker-info">${(t=this.options)==null?void 0:t.infoTemplate}</div>
      <div class="window popup component-picker-components-info">
        <div>
          ${this.components.map((e,o)=>f`<div class=${o===this.selected?"selected":""}>
                ${e.element.tagName.toLowerCase()}
              </div>`)}
        </div>
      </div>
    `):(this.style.display="none",null)}open(t){this.options=t,this.active=!0,this.dispatchEvent(new CustomEvent("component-picker-opened",{}))}close(){this.active=!1,this.dispatchEvent(new CustomEvent("component-picker-closed",{}))}update(t){var e;if(super.update(t),(t.has("selected")||t.has("components"))&&this.highlight((e=this.components[this.selected])==null?void 0:e.element),t.has("active")){const o=t.get("active"),n=this.active;!o&&n?requestAnimationFrame(()=>this.shim.focus()):o&&!n&&this.highlight(void 0)}}shimKeydown(t){const e=t.detail.originalEvent;if(e.key==="Escape")this.close(),t.stopPropagation(),t.preventDefault();else if(e.key==="ArrowUp"){let o=this.selected-1;o<0&&(o=this.components.length-1),this.selected=o}else e.key==="ArrowDown"?this.selected=(this.selected+1)%this.components.length:e.key==="Enter"&&(this.pickSelectedComponent(),t.stopPropagation(),t.preventDefault())}shimMove(t){const e=t.detail.target;this.components=ys(e),this.selected=this.components.length-1}shimClick(t){this.pickSelectedComponent()}pickSelectedComponent(){const t=this.components[this.selected];if(t&&this.options)try{this.options.pickCallback(t)}catch(e){console.error("Pick callback failed",e)}this.close()}highlight(t){if(this.highlighted!==t)if(t){const e=t.getBoundingClientRect(),o=getComputedStyle(t);this.overlayElement.style.top=`${e.top}px`,this.overlayElement.style.left=`${e.left}px`,this.overlayElement.style.width=`${e.width}px`,this.overlayElement.style.height=`${e.height}px`,this.overlayElement.style.borderRadius=o.borderRadius,document.body.append(this.overlayElement)}else this.overlayElement.remove();this.highlighted=t}};he.styles=[ki,w`
      .component-picker-info {
        left: 1em;
        bottom: 1em;
      }

      .component-picker-components-info {
        right: 3em;
        bottom: 1em;
      }

      .component-picker-components-info .selected {
        font-weight: bold;
      }
    `];nt([T()],he.prototype,"active",2);nt([T()],he.prototype,"components",2);nt([T()],he.prototype,"selected",2);nt([ot("vaadin-dev-tools-shim")],he.prototype,"shim",2);he=nt([F("vaadin-dev-tools-component-picker")],he);const La=Object.freeze(Object.defineProperty({__proto__:null,get ComponentPicker(){return he}},Symbol.toStringTag,{value:"Module"}));var Ma=Object.defineProperty,Va=Object.getOwnPropertyDescriptor,pe=(t,e,o,n)=>{for(var i=n>1?void 0:n?Va(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&Ma(e,o,i),i};zo(w`
  .vaadin-theme-editor-highlight {
    outline: solid 2px #9e2cc6;
    outline-offset: 3px;
  }
`);let ie=class extends A{constructor(){super(...arguments),this.expanded=!1,this.themeEditorState=Je.enabled,this.context=null,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null}static get styles(){return w`
      :host {
        animation: fade-in var(--dev-tools-transition-duration) ease-in;
        --theme-editor-section-horizontal-padding: 0.75rem;
        display: flex;
        flex-direction: column;
        max-height: 400px;
      }

      .notice {
        padding: var(--theme-editor-section-horizontal-padding);
      }

      .notice a {
        color: var(--dev-tools-text-color-emphasis);
      }

      .header {
        flex: 0 0 auto;
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .header .picker-row {
        padding: var(--theme-editor-section-horizontal-padding);
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: space-between;
      }

      .picker {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        align-items: center;
      }

      .picker button {
        min-width: 0;
        display: inline-flex;
        align-items: center;
        padding: 0;
        line-height: 20px;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .picker button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .picker svg,
      .picker .component-type {
        flex: 0 0 auto;
        margin-right: 4px;
      }

      .picker .instance-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #e5a2fce5;
      }

      .picker .instance-name-quote {
        color: #e5a2fce5;
      }

      .picker .no-selection {
        font-style: italic;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .property-list {
        flex: 1 1 auto;
        overflow-y: auto;
      }

      .link-button {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        color: inherit;
        font-weight: 600;
        text-decoration: underline;
      }

      .link-button:focus,
      .link-button:hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .icon-button {
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .icon-button:disabled {
        opacity: 0.5;
      }

      .icon-button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}firstUpdated(){this.api=new Ls(this.connection),this.history=new Ms(this.api),this.historyActions=this.history.allowedActions,this.api.markAsUsed(),document.addEventListener("vaadin-theme-updated",()=>{ve.clear(),this.refreshTheme()})}update(t){var e,o;super.update(t),t.has("expanded")&&(this.expanded?this.highlightElement((e=this.context)==null?void 0:e.component.element):this.removeElementHighlight((o=this.context)==null?void 0:o.component.element))}disconnectedCallback(){var t;super.disconnectedCallback(),this.removeElementHighlight((t=this.context)==null?void 0:t.component.element)}render(){var t,e,o;return this.themeEditorState===Je.missing_theme?this.renderMissingThemeNotice():f`
      <div class="header">
        <div class="picker-row">
          ${this.renderPicker()}
          <div class="actions">
            ${(t=this.context)!=null&&t.metadata?f` <vaadin-dev-tools-theme-scope-selector
                  .value=${this.context.scope}
                  .metadata=${this.context.metadata}
                  @scope-change=${this.handleScopeChange}
                ></vaadin-dev-tools-theme-scope-selector>`:null}
            <button
              class="icon-button"
              data-testid="undo"
              ?disabled=${!((e=this.historyActions)!=null&&e.allowUndo)}
              @click=${this.handleUndo}
            >
              ${_t.undo}
            </button>
            <button
              class="icon-button"
              data-testid="redo"
              ?disabled=${!((o=this.historyActions)!=null&&o.allowRedo)}
              @click=${this.handleRedo}
            >
              ${_t.redo}
            </button>
          </div>
        </div>
        ${this.renderLocalClassNameEditor()}
      </div>
      ${this.renderPropertyList()}
    `}renderMissingThemeNotice(){return f`
      <div class="notice">
        It looks like you have not set up a custom theme yet. Theme editor requires an existing theme to work with.
        Please check our
        <a href="https://vaadin.com/docs/latest/styling/custom-theme/creating-custom-theme" target="_blank"
          >documentation</a
        >
        on how to set up a custom theme.
      </div>
    `}renderPropertyList(){if(!this.context)return null;if(!this.context.metadata){const t=this.context.component.element.localName;return f`
        <div class="notice">Styling <code>&lt;${t}&gt;</code> components is not supported at the moment.</div>
      `}if(this.context.scope===D.local&&!this.context.accessible){const t=this.context.metadata.displayName;return f`
        <div class="notice">
          The selected ${t} can not be styled locally. Currently, theme editor only supports styling
          instances that are assigned to a local variable, like so:
          <pre><code>Button saveButton = new Button("Save");</code></pre>
          If you want to modify the code so that it satisfies this requirement,
          <button class="link-button" @click=${this.handleShowComponent}>click here</button>
          to open it in your IDE. Alternatively you can choose to style all ${t}s by selecting "Global" from
          the scope dropdown above.
        </div>
      `}return f` <vaadin-dev-tools-theme-property-list
      class="property-list"
      .metadata=${this.context.metadata}
      .theme=${this.effectiveTheme}
      @theme-property-value-change=${this.handlePropertyChange}
      @open-css=${this.handleOpenCss}
    ></vaadin-dev-tools-theme-property-list>`}handleShowComponent(){if(!this.context)return;const t=this.context.component,e={nodeId:t.nodeId,uiId:t.uiId};this.connection.sendShowComponentCreateLocation(e)}async handleOpenCss(t){if(!this.context)return;await this.ensureLocalClassName();const e={themeScope:this.context.scope,localClassName:this.context.localClassName},o=Me(t.detail.element,e);await this.api.openCss(o)}renderPicker(){var t;let e;if((t=this.context)!=null&&t.metadata){const o=this.context.scope===D.local?this.context.metadata.displayName:`All ${this.context.metadata.displayName}s`,n=f`<span class="component-type">${o}</span>`,i=this.context.scope===D.local?Rs(this.context.component):null,r=i?f` <span class="instance-name-quote">"</span><span class="instance-name">${i}</span
            ><span class="instance-name-quote">"</span>`:null;e=f`${n} ${r}`}else e=f`<span class="no-selection">Pick an element to get started</span>`;return f`
      <div class="picker">
        <button @click=${this.pickComponent}>${_t.crosshair} ${e}</button>
      </div>
    `}renderLocalClassNameEditor(){var t;const e=((t=this.context)==null?void 0:t.scope)===D.local&&this.context.accessible;if(!this.context||!e)return null;const o=this.context.localClassName||this.context.suggestedClassName;return f` <vaadin-dev-tools-theme-class-name-editor
      .className=${o}
      @class-name-change=${this.handleClassNameChange}
    >
    </vaadin-dev-tools-theme-class-name-editor>`}async handleClassNameChange(t){if(!this.context)return;const e=this.context.localClassName,o=t.detail.value;if(e){const n=this.context.component.element;this.context.localClassName=o;const i=await this.api.setLocalClassName(this.context.component,o);this.historyActions=this.history.push(i.requestId,()=>ve.previewLocalClassName(n,o),()=>ve.previewLocalClassName(n,e))}else this.context={...this.context,suggestedClassName:o}}async pickComponent(){var t;this.removeElementHighlight((t=this.context)==null?void 0:t.component.element),this.pickerProvider().open({infoTemplate:f`
        <div>
          <h3>Locate the component to style</h3>
          <p>Use the mouse cursor to highlight components in the UI.</p>
          <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
          <p>Click the primary mouse button to select the component.</p>
        </div>
      `,pickCallback:async e=>{var o;const n=await Ns.getMetadata(e);if(!n){this.context={component:e,scope:((o=this.context)==null?void 0:o.scope)||D.local},this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}this.highlightElement(e.element),this.refreshComponentAndTheme(e,n)}})}handleScopeChange(t){this.context&&this.refreshTheme({...this.context,scope:t.detail.value})}async handlePropertyChange(t){if(!this.context||!this.baseTheme||!this.editedTheme)return;const{element:e,property:o,value:n}=t.detail;this.editedTheme.updatePropertyValue(e.selector,o.propertyName,n,!0),this.effectiveTheme=ce.combine(this.baseTheme,this.editedTheme),await this.ensureLocalClassName();const i={themeScope:this.context.scope,localClassName:this.context.localClassName},r=Ps(e,i,o.propertyName,n);try{const s=await this.api.setCssRules([r]);this.historyActions=this.history.push(s.requestId);const l=As(r);ve.add(l)}catch(s){console.error("Failed to update property value",s)}}async handleUndo(){this.historyActions=await this.history.undo(),await this.refreshComponentAndTheme()}async handleRedo(){this.historyActions=await this.history.redo(),await this.refreshComponentAndTheme()}async ensureLocalClassName(){if(!this.context||this.context.scope===D.global||this.context.localClassName)return;if(!this.context.localClassName&&!this.context.suggestedClassName)throw new Error("Cannot assign local class name for the component because it does not have a suggested class name");const t=this.context.component.element,e=this.context.suggestedClassName;this.context.localClassName=e;const o=await this.api.setLocalClassName(this.context.component,e);this.historyActions=this.history.push(o.requestId,()=>ve.previewLocalClassName(t,e),()=>ve.previewLocalClassName(t))}async refreshComponentAndTheme(t,e){var o,n,i;if(t=t||((o=this.context)==null?void 0:o.component),e=e||((n=this.context)==null?void 0:n.metadata),!t||!e)return;const r=await this.api.loadComponentMetadata(t);ve.previewLocalClassName(t.element,r.className),await this.refreshTheme({scope:((i=this.context)==null?void 0:i.scope)||D.local,metadata:e,component:t,localClassName:r.className,suggestedClassName:r.suggestedClassName,accessible:r.accessible})}async refreshTheme(t){const e=t||this.context;if(!e||!e.metadata)return;if(e.scope===D.local&&!e.accessible){this.context=e,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}let o=new ce(e.metadata);if(!(e.scope===D.local&&!e.localClassName)){const i={themeScope:e.scope,localClassName:e.localClassName},r=e.metadata.elements.map(l=>Me(l,i)),s=await this.api.loadRules(r);o=ce.fromServerRules(e.metadata,i,s.rules)}const n=await Is(e.metadata);this.context=e,this.baseTheme=n,this.editedTheme=o,this.effectiveTheme=ce.combine(n,this.editedTheme)}highlightElement(t){t&&t.classList.add("vaadin-theme-editor-highlight")}removeElementHighlight(t){t&&t.classList.remove("vaadin-theme-editor-highlight")}};pe([y({})],ie.prototype,"expanded",2);pe([y({})],ie.prototype,"themeEditorState",2);pe([y({})],ie.prototype,"pickerProvider",2);pe([y({})],ie.prototype,"connection",2);pe([T()],ie.prototype,"historyActions",2);pe([T()],ie.prototype,"context",2);pe([T()],ie.prototype,"effectiveTheme",2);ie=pe([F("vaadin-dev-tools-theme-editor")],ie);var za=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var e=document.activeElement,o=[],n=0;n<t.rangeCount;n++)o.push(t.getRangeAt(n));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return t.removeAllRanges(),function(){t.type==="Caret"&&t.removeAllRanges(),t.rangeCount||o.forEach(function(i){t.addRange(i)}),e&&e.focus()}},Gn={"text/plain":"Text","text/html":"Url",default:"Text"},Da="Copy to clipboard: #{key}, Enter";function Ua(t){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return t.replace(/#{\s*key\s*}/g,e)}function ja(t,e){var o,n,i,r,s,l,a=!1;e||(e={}),o=e.debug||!1;try{i=za(),r=document.createRange(),s=document.getSelection(),l=document.createElement("span"),l.textContent=t,l.style.all="unset",l.style.position="fixed",l.style.top=0,l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",function(c){if(c.stopPropagation(),e.format)if(c.preventDefault(),typeof c.clipboardData>"u"){o&&console.warn("unable to use e.clipboardData"),o&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var m=Gn[e.format]||Gn.default;window.clipboardData.setData(m,t)}else c.clipboardData.clearData(),c.clipboardData.setData(e.format,t);e.onCopy&&(c.preventDefault(),e.onCopy(c.clipboardData))}),document.body.appendChild(l),r.selectNodeContents(l),s.addRange(r);var d=document.execCommand("copy");if(!d)throw new Error("copy command was unsuccessful");a=!0}catch(c){o&&console.error("unable to copy using execCommand: ",c),o&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",t),e.onCopy&&e.onCopy(window.clipboardData),a=!0}catch(m){o&&console.error("unable to copy using clipboardData: ",m),o&&console.error("falling back to prompt"),n=Ua("message"in e?e.message:Da),window.prompt(n,t)}}finally{s&&(typeof s.removeRange=="function"?s.removeRange(r):s.removeAllRanges()),l&&document.body.removeChild(l),i()}return a}const Bo=1e3,Ho=(t,e)=>{const o=Array.from(t.querySelectorAll(e.join(", "))),n=Array.from(t.querySelectorAll("*")).filter(i=>i.shadowRoot).flatMap(i=>Ho(i.shadowRoot,e));return[...o,...n]};let Kn=!1;const et=(t,e)=>{Kn||(window.addEventListener("message",i=>{i.data==="validate-license"&&window.location.reload()},!1),Kn=!0);const o=t._overlayElement;if(o){if(o.shadowRoot){const i=o.shadowRoot.querySelector("slot:not([name])");if(i&&i.assignedElements().length>0){et(i.assignedElements()[0],e);return}}et(o,e);return}const n=e.messageHtml?e.messageHtml:`${e.message} <p>Component: ${e.product.name} ${e.product.version}</p>`.replace(/https:([^ ]*)/g,"<a href='https:$1'>https:$1</a>");t.isConnected&&(t.outerHTML=`<no-license style="display:flex;align-items:center;text-align:center;justify-content:center;"><div>${n}</div></no-license>`)},He={},Yn={},ze={},$i={},Q=t=>`${t.name}_${t.version}`,Jn=t=>{const{cvdlName:e,version:o}=t.constructor,n={name:e,version:o},i=t.tagName.toLowerCase();He[e]=He[e]??[],He[e].push(i);const r=ze[Q(n)];r&&setTimeout(()=>et(t,r),Bo),ze[Q(n)]||$i[Q(n)]||Yn[Q(n)]||(Yn[Q(n)]=!0,window.Vaadin.devTools.checkLicense(n))},Fa=t=>{$i[Q(t)]=!0,console.debug("License check ok for",t)},Ti=t=>{const e=t.product.name;ze[Q(t.product)]=t,console.error("License check failed for",e);const o=He[e];(o==null?void 0:o.length)>0&&Ho(document,o).forEach(n=>{setTimeout(()=>et(n,ze[Q(t.product)]),Bo)})},Ba=t=>{const e=t.message,o=t.product.name;t.messageHtml=`No license found. <a target=_blank onclick="javascript:window.open(this.href);return false;" href="${e}">Go here to start a trial or retrieve your license.</a>`,ze[Q(t.product)]=t,console.error("No license found when checking",o);const n=He[o];(n==null?void 0:n.length)>0&&Ho(document,n).forEach(i=>{setTimeout(()=>et(i,ze[Q(t.product)]),Bo)})},Ha=()=>{window.Vaadin.devTools.createdCvdlElements.forEach(t=>{Jn(t)}),window.Vaadin.devTools.createdCvdlElements={push:t=>{Jn(t)}}};var M=(t=>(t.ACTIVE="active",t.INACTIVE="inactive",t.UNAVAILABLE="unavailable",t.ERROR="error",t))(M||{});const Ni=class extends Object{constructor(t){super(),this.status="unavailable",t&&(this.webSocket=new WebSocket(t),this.webSocket.onmessage=e=>this.handleMessage(e),this.webSocket.onerror=e=>this.handleError(e),this.webSocket.onclose=e=>{this.status!=="error"&&this.setStatus("unavailable"),this.webSocket=void 0}),setInterval(()=>{this.webSocket&&self.status!=="error"&&this.status!=="unavailable"&&this.webSocket.send("")},Ni.HEARTBEAT_INTERVAL)}onHandshake(){}onReload(){}onUpdate(t,e){}onConnectionError(t){}onStatusChange(t){}onMessage(t){console.error("Unknown message received from the live reload server:",t)}handleMessage(t){let e;try{e=JSON.parse(t.data)}catch(o){this.handleError(`[${o.name}: ${o.message}`);return}e.command==="hello"?(this.setStatus("active"),this.onHandshake()):e.command==="reload"?this.status==="active"&&this.onReload():e.command==="update"?this.status==="active"&&this.onUpdate(e.path,e.content):e.command==="license-check-ok"?Fa(e.data):e.command==="license-check-failed"?Ti(e.data):e.command==="license-check-nokey"?Ba(e.data):this.onMessage(e)}handleError(t){console.error(t),this.setStatus("error"),t instanceof Event&&this.webSocket?this.onConnectionError(`Error in WebSocket connection to ${this.webSocket.url}`):this.onConnectionError(t)}setActive(t){!t&&this.status==="active"?this.setStatus("inactive"):t&&this.status==="inactive"&&this.setStatus("active")}setStatus(t){this.status!==t&&(this.status=t,this.onStatusChange(t))}send(t,e){const o=JSON.stringify({command:t,data:e});this.webSocket?this.webSocket.readyState!==WebSocket.OPEN?this.webSocket.addEventListener("open",()=>this.webSocket.send(o)):this.webSocket.send(o):console.error(`Unable to send message ${t}. No websocket is available`)}setFeature(t,e){this.send("setFeature",{featureId:t,enabled:e})}sendTelemetry(t){this.send("reportTelemetry",{browserData:t})}sendLicenseCheck(t){this.send("checkLicense",t)}sendShowComponentCreateLocation(t){this.send("showComponentCreateLocation",t)}sendShowComponentAttachLocation(t){this.send("showComponentAttachLocation",t)}};let wt=Ni;wt.HEARTBEAT_INTERVAL=18e4;var qa=Object.defineProperty,Wa=Object.getOwnPropertyDescriptor,N=(t,e,o,n)=>{for(var i=n>1?void 0:n?Wa(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&qa(e,o,i),i};const C=class extends A{constructor(){super(),this.expanded=!1,this.messages=[],this.notifications=[],this.frontendStatus=M.UNAVAILABLE,this.javaStatus=M.UNAVAILABLE,this.tabs=[{id:"log",title:"Log",render:()=>this.renderLog(),activate:this.activateLog},{id:"info",title:"Info",render:()=>this.renderInfo()},{id:"features",title:"Feature Flags",render:()=>this.renderFeatures()}],this.activeTab="log",this.serverInfo={flowVersion:"",vaadinVersion:"",javaVersion:"",osVersion:"",productName:""},this.features=[],this.unreadErrors=!1,this.componentPickActive=!1,this.themeEditorState=Je.disabled,this.nextMessageId=1,this.transitionDuration=0,this.disableLiveReloadTimeout=null,window.Vaadin.Flow&&this.tabs.push({id:"code",title:"Code",render:()=>this.renderCode()})}static get styles(){return[w`
        :host {
          --dev-tools-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
            'Helvetica Neue', sans-serif;
          --dev-tools-font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
            monospace;

          --dev-tools-font-size: 0.8125rem;
          --dev-tools-font-size-small: 0.75rem;

          --dev-tools-text-color: rgba(255, 255, 255, 0.8);
          --dev-tools-text-color-secondary: rgba(255, 255, 255, 0.65);
          --dev-tools-text-color-emphasis: rgba(255, 255, 255, 0.95);
          --dev-tools-text-color-active: rgba(255, 255, 255, 1);

          --dev-tools-background-color-inactive: rgba(45, 45, 45, 0.25);
          --dev-tools-background-color-active: rgba(45, 45, 45, 0.98);
          --dev-tools-background-color-active-blurred: rgba(45, 45, 45, 0.85);

          --dev-tools-border-radius: 0.5rem;
          --dev-tools-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.4);

          --dev-tools-blue-hsl: 206, 100%, 70%;
          --dev-tools-blue-color: hsl(var(--dev-tools-blue-hsl));
          --dev-tools-green-hsl: 145, 80%, 42%;
          --dev-tools-green-color: hsl(var(--dev-tools-green-hsl));
          --dev-tools-grey-hsl: 0, 0%, 50%;
          --dev-tools-grey-color: hsl(var(--dev-tools-grey-hsl));
          --dev-tools-yellow-hsl: 38, 98%, 64%;
          --dev-tools-yellow-color: hsl(var(--dev-tools-yellow-hsl));
          --dev-tools-red-hsl: 355, 100%, 68%;
          --dev-tools-red-color: hsl(var(--dev-tools-red-hsl));

          /* Needs to be in ms, used in JavaScript as well */
          --dev-tools-transition-duration: 180ms;

          all: initial;

          direction: ltr;
          cursor: default;
          font: normal 400 var(--dev-tools-font-size) / 1.125rem var(--dev-tools-font-family);
          color: var(--dev-tools-text-color);
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;

          position: fixed;
          z-index: 20000;
          pointer-events: none;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
        }

        .dev-tools {
          pointer-events: auto;
          display: flex;
          align-items: center;
          position: fixed;
          z-index: inherit;
          right: 0.5rem;
          bottom: 0.5rem;
          min-width: 1.75rem;
          height: 1.75rem;
          max-width: 1.75rem;
          border-radius: 0.5rem;
          padding: 0.375rem;
          box-sizing: border-box;
          background-color: var(--dev-tools-background-color-inactive);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          white-space: nowrap;
          line-height: 1rem;
        }

        .dev-tools:hover,
        .dev-tools.active {
          background-color: var(--dev-tools-background-color-active);
          box-shadow: var(--dev-tools-box-shadow);
        }

        .dev-tools.active {
          max-width: calc(100% - 1rem);
        }

        .dev-tools .dev-tools-icon {
          flex: none;
          pointer-events: none;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          fill: #fff;
          transition: var(--dev-tools-transition-duration);
          margin: 0;
        }

        .dev-tools.active .dev-tools-icon {
          opacity: 0;
          position: absolute;
          transform: scale(0.5);
        }

        .dev-tools .status-blip {
          flex: none;
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          z-index: 20001;
          background: var(--dev-tools-grey-color);
          position: absolute;
          top: -1px;
          right: -1px;
        }

        .dev-tools .status-description {
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 0.25rem;
        }

        .dev-tools.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.15);
          animation: bounce 0.5s;
          animation-iteration-count: 2;
        }

        .switch {
          display: inline-flex;
          align-items: center;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        .switch .slider {
          display: block;
          flex: none;
          width: 28px;
          height: 18px;
          border-radius: 9px;
          background-color: rgba(255, 255, 255, 0.3);
          transition: var(--dev-tools-transition-duration);
          margin-right: 0.5rem;
        }

        .switch:focus-within .slider,
        .switch .slider:hover {
          background-color: rgba(255, 255, 255, 0.35);
          transition: none;
        }

        .switch input:focus-visible ~ .slider {
          box-shadow: 0 0 0 2px var(--dev-tools-background-color-active), 0 0 0 4px var(--dev-tools-blue-color);
        }

        .switch .slider::before {
          content: '';
          display: block;
          margin: 2px;
          width: 14px;
          height: 14px;
          background-color: #fff;
          transition: var(--dev-tools-transition-duration);
          border-radius: 50%;
        }

        .switch input:checked + .slider {
          background-color: var(--dev-tools-green-color);
        }

        .switch input:checked + .slider::before {
          transform: translateX(10px);
        }

        .switch input:disabled + .slider::before {
          background-color: var(--dev-tools-grey-color);
        }

        .window.hidden {
          opacity: 0;
          transform: scale(0);
          position: absolute;
        }

        .window.visible {
          transform: none;
          opacity: 1;
          pointer-events: auto;
        }

        .window.visible ~ .dev-tools {
          opacity: 0;
          pointer-events: none;
        }

        .window.visible ~ .dev-tools .dev-tools-icon,
        .window.visible ~ .dev-tools .status-blip {
          transition: none;
          opacity: 0;
        }

        .window {
          border-radius: var(--dev-tools-border-radius);
          overflow: hidden;
          margin: 0.5rem;
          width: 30rem;
          max-width: calc(100% - 1rem);
          max-height: calc(100vh - 1rem);
          flex-shrink: 1;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          display: flex;
          flex-direction: column;
          box-shadow: var(--dev-tools-box-shadow);
          outline: none;
        }

        .window-toolbar {
          display: flex;
          flex: none;
          align-items: center;
          padding: 0.375rem;
          white-space: nowrap;
          order: 1;
          background-color: rgba(0, 0, 0, 0.2);
          gap: 0.5rem;
        }

        .tab {
          color: var(--dev-tools-text-color-secondary);
          font: inherit;
          font-size: var(--dev-tools-font-size-small);
          font-weight: 500;
          line-height: 1;
          padding: 0.25rem 0.375rem;
          background: none;
          border: none;
          margin: 0;
          border-radius: 0.25rem;
          transition: var(--dev-tools-transition-duration);
        }

        .tab:hover,
        .tab.active {
          color: var(--dev-tools-text-color-active);
        }

        .tab.active {
          background-color: rgba(255, 255, 255, 0.12);
        }

        .tab.unreadErrors::after {
          content: '•';
          color: hsl(var(--dev-tools-red-hsl));
          font-size: 1.5rem;
          position: absolute;
          transform: translate(0, -50%);
        }

        .ahreflike {
          font-weight: 500;
          color: var(--dev-tools-text-color-secondary);
          text-decoration: underline;
          cursor: pointer;
        }

        .ahreflike:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .button {
          all: initial;
          font-family: inherit;
          font-size: var(--dev-tools-font-size-small);
          line-height: 1;
          white-space: nowrap;
          background-color: rgba(0, 0, 0, 0.2);
          color: inherit;
          font-weight: 600;
          padding: 0.25rem 0.375rem;
          border-radius: 0.25rem;
        }

        .button:focus,
        .button:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .minimize-button {
          flex: none;
          width: 1rem;
          height: 1rem;
          color: inherit;
          background-color: transparent;
          border: 0;
          padding: 0;
          margin: 0 0 0 auto;
          opacity: 0.8;
        }

        .minimize-button:hover {
          opacity: 1;
        }

        .minimize-button svg {
          max-width: 100%;
        }

        .message.information {
          --dev-tools-notification-color: var(--dev-tools-blue-color);
        }

        .message.warning {
          --dev-tools-notification-color: var(--dev-tools-yellow-color);
        }

        .message.error {
          --dev-tools-notification-color: var(--dev-tools-red-color);
        }

        .message {
          display: flex;
          padding: 0.1875rem 0.75rem 0.1875rem 2rem;
          background-clip: padding-box;
        }

        .message.log {
          padding-left: 0.75rem;
        }

        .message-content {
          margin-right: 0.5rem;
          -webkit-user-select: text;
          -moz-user-select: text;
          user-select: text;
        }

        .message-heading {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0.125rem 0;
        }

        .message.log {
          color: var(--dev-tools-text-color-secondary);
        }

        .message:not(.log) .message-heading {
          font-weight: 500;
        }

        .message.has-details .message-heading {
          color: var(--dev-tools-text-color-emphasis);
          font-weight: 600;
        }

        .message-heading::before {
          position: absolute;
          margin-left: -1.5rem;
          display: inline-block;
          text-align: center;
          font-size: 0.875em;
          font-weight: 600;
          line-height: calc(1.25em - 2px);
          width: 14px;
          height: 14px;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 50%;
        }

        .message.information .message-heading::before {
          content: 'i';
          border-color: currentColor;
          color: var(--dev-tools-notification-color);
        }

        .message.warning .message-heading::before,
        .message.error .message-heading::before {
          content: '!';
          color: var(--dev-tools-background-color-active);
          background-color: var(--dev-tools-notification-color);
        }

        .features-tray {
          padding: 0.75rem;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .features-tray p {
          margin-top: 0;
          color: var(--dev-tools-text-color-secondary);
        }

        .features-tray .feature {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 0.5em;
        }

        .message .message-details {
          font-weight: 400;
          color: var(--dev-tools-text-color-secondary);
          margin: 0.25rem 0;
        }

        .message .message-details[hidden] {
          display: none;
        }

        .message .message-details p {
          display: inline;
          margin: 0;
          margin-right: 0.375em;
          word-break: break-word;
        }

        .message .persist {
          color: var(--dev-tools-text-color-secondary);
          white-space: nowrap;
          margin: 0.375rem 0;
          display: flex;
          align-items: center;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        .message .persist::before {
          content: '';
          width: 1em;
          height: 1em;
          border-radius: 0.2em;
          margin-right: 0.375em;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .message .persist:hover::before {
          background-color: rgba(255, 255, 255, 0.4);
        }

        .message .persist.on::before {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .message .persist.on::after {
          content: '';
          order: -1;
          position: absolute;
          width: 0.75em;
          height: 0.25em;
          border: 2px solid var(--dev-tools-background-color-active);
          border-width: 0 0 2px 2px;
          transform: translate(0.05em, -0.05em) rotate(-45deg) scale(0.8, 0.9);
        }

        .message .dismiss-message {
          font-weight: 600;
          align-self: stretch;
          display: flex;
          align-items: center;
          padding: 0 0.25rem;
          margin-left: 0.5rem;
          color: var(--dev-tools-text-color-secondary);
        }

        .message .dismiss-message:hover {
          color: var(--dev-tools-text-color);
        }

        .notification-tray {
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
          margin: 0.5rem;
          flex: none;
        }

        .window.hidden + .notification-tray {
          margin-bottom: 3rem;
        }

        .notification-tray .message {
          pointer-events: auto;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          max-width: 30rem;
          box-sizing: border-box;
          border-radius: var(--dev-tools-border-radius);
          margin-top: 0.5rem;
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          animation: slideIn var(--dev-tools-transition-duration);
          box-shadow: var(--dev-tools-box-shadow);
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }

        .notification-tray .message.animate-out {
          animation: slideOut forwards var(--dev-tools-transition-duration);
        }

        .notification-tray .message .message-details {
          max-height: 10em;
          overflow: hidden;
        }

        .message-tray {
          flex: auto;
          overflow: auto;
          max-height: 20rem;
          user-select: text;
        }

        .message-tray .message {
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          padding-left: 2.25rem;
        }

        .message-tray .message.warning {
          background-color: hsla(var(--dev-tools-yellow-hsl), 0.09);
        }

        .message-tray .message.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.09);
        }

        .message-tray .message.error .message-heading {
          color: hsl(var(--dev-tools-red-hsl));
        }

        .message-tray .message.warning .message-heading {
          color: hsl(var(--dev-tools-yellow-hsl));
        }

        .message-tray .message + .message {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .message-tray .dismiss-message,
        .message-tray .persist {
          display: none;
        }

        .info-tray {
          padding: 0.75rem;
          position: relative;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .info-tray dl {
          margin: 0;
          display: grid;
          grid-template-columns: max-content 1fr;
          column-gap: 0.75rem;
          position: relative;
        }

        .info-tray dt {
          grid-column: 1;
          color: var(--dev-tools-text-color-emphasis);
        }

        .info-tray dt:not(:first-child)::before {
          content: '';
          width: 100%;
          position: absolute;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          margin-top: -0.375rem;
        }

        .info-tray dd {
          grid-column: 2;
          margin: 0;
        }

        .info-tray :is(dt, dd):not(:last-child) {
          margin-bottom: 0.75rem;
        }

        .info-tray dd + dd {
          margin-top: -0.5rem;
        }

        .info-tray .live-reload-status::before {
          content: '•';
          color: var(--status-color);
          width: 0.75rem;
          display: inline-block;
          font-size: 1rem;
          line-height: 0.5rem;
        }

        .info-tray .copy {
          position: fixed;
          z-index: 1;
          top: 0.5rem;
          right: 0.5rem;
        }

        .info-tray .switch {
          vertical-align: -4px;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0%);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.5);
            background-color: hsla(var(--dev-tools-red-hsl), 1);
          }
          100% {
            transform: scale(1);
          }
        }

        @supports (backdrop-filter: blur(1px)) {
          .dev-tools,
          .window,
          .notification-tray .message {
            backdrop-filter: blur(8px);
          }
          .dev-tools:hover,
          .dev-tools.active,
          .window,
          .notification-tray .message {
            background-color: var(--dev-tools-background-color-active-blurred);
          }
        }
      `,ki]}static get isActive(){const t=window.sessionStorage.getItem(C.ACTIVE_KEY_IN_SESSION_STORAGE);return t===null||t!=="false"}static notificationDismissed(t){const e=window.localStorage.getItem(C.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);return e!==null&&e.includes(t)}elementTelemetry(){let t={};try{const e=localStorage.getItem("vaadin.statistics.basket");if(!e)return;t=JSON.parse(e)}catch{return}this.frontendConnection&&this.frontendConnection.sendTelemetry(t)}openWebSocketConnection(){this.frontendStatus=M.UNAVAILABLE,this.javaStatus=M.UNAVAILABLE;const t=l=>this.log("error",l),e=()=>{this.showSplashMessage("Reloading…");const l=window.sessionStorage.getItem(C.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE),a=l?parseInt(l,10)+1:1;window.sessionStorage.setItem(C.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE,a.toString()),window.sessionStorage.setItem(C.TRIGGERED_KEY_IN_SESSION_STORAGE,"true"),window.location.reload()},o=(l,a)=>{let d=document.head.querySelector(`style[data-file-path='${l}']`);d?(this.log("information","Hot update of "+l),d.textContent=a,document.dispatchEvent(new CustomEvent("vaadin-theme-updated"))):e()},n=new wt(this.getDedicatedWebSocketUrl());n.onHandshake=()=>{this.log("log","Vaadin development mode initialized"),C.isActive||n.setActive(!1),this.elementTelemetry()},n.onConnectionError=t,n.onReload=e,n.onUpdate=o,n.onStatusChange=l=>{this.frontendStatus=l},n.onMessage=l=>this.handleFrontendMessage(l),this.frontendConnection=n;let i;this.backend===C.SPRING_BOOT_DEVTOOLS&&this.springBootLiveReloadPort?(i=new wt(this.getSpringBootWebSocketUrl(window.location)),i.onHandshake=()=>{C.isActive||i.setActive(!1)},i.onReload=e,i.onConnectionError=t):this.backend===C.JREBEL||this.backend===C.HOTSWAP_AGENT?i=n:i=new wt(void 0);const r=i.onStatusChange;i.onStatusChange=l=>{r(l),this.javaStatus=l};const s=i.onHandshake;i.onHandshake=()=>{s(),this.backend&&this.log("information",`Java live reload available: ${C.BACKEND_DISPLAY_NAME[this.backend]}`)},this.javaConnection=i,this.backend||this.showNotification("warning","Java live reload unavailable","Live reload for Java changes is currently not set up. Find out how to make use of this functionality to boost your workflow.","https://vaadin.com/docs/latest/flow/configuration/live-reload","liveReloadUnavailable")}handleFrontendMessage(t){if((t==null?void 0:t.command)==="serverInfo")this.serverInfo=t.data;else if((t==null?void 0:t.command)==="featureFlags")this.features=t.data.features;else if((t==null?void 0:t.command)==="themeEditorState"){const e=!!window.Vaadin.Flow;this.themeEditorState=t.data,e&&this.themeEditorState!==Je.disabled&&(this.tabs.push({id:"theme-editor",title:"Theme Editor (Preview)",render:()=>this.renderThemeEditor()}),this.requestUpdate())}else console.error("Unknown message from front-end connection:",JSON.stringify(t))}getDedicatedWebSocketUrl(){function t(o){const n=document.createElement("div");return n.innerHTML=`<a href="${o}"/>`,n.firstChild.href}if(this.url===void 0)return;const e=t(this.url);if(!e.startsWith("http://")&&!e.startsWith("https://")){console.error("The protocol of the url should be http or https for live reload to work.");return}return`${e.replace(/^http/,"ws")}?v-r=push&debug_window`}getSpringBootWebSocketUrl(t){const{hostname:e}=t,o=t.protocol==="https:"?"wss":"ws";if(e.endsWith("gitpod.io")){const n=e.replace(/.*?-/,"");return`${o}://${this.springBootLiveReloadPort}-${n}`}else return`${o}://${e}:${this.springBootLiveReloadPort}`}connectedCallback(){if(super.connectedCallback(),this.catchErrors(),this.disableEventListener=e=>this.demoteSplashMessage(),document.body.addEventListener("focus",this.disableEventListener),document.body.addEventListener("click",this.disableEventListener),this.openWebSocketConnection(),window.sessionStorage.getItem(C.TRIGGERED_KEY_IN_SESSION_STORAGE)){const e=new Date,o=`${`0${e.getHours()}`.slice(-2)}:${`0${e.getMinutes()}`.slice(-2)}:${`0${e.getSeconds()}`.slice(-2)}`;this.showSplashMessage(`Page reloaded at ${o}`),window.sessionStorage.removeItem(C.TRIGGERED_KEY_IN_SESSION_STORAGE)}this.transitionDuration=parseInt(window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"),10);const t=window;t.Vaadin=t.Vaadin||{},t.Vaadin.devTools=Object.assign(this,t.Vaadin.devTools),Ha(),document.documentElement.addEventListener("vaadin-overlay-outside-click",e=>{const o=e,n=o.target.owner;n&&_s(this,n)||o.detail.sourceEvent.composedPath().includes(this)&&e.preventDefault()})}format(t){return t.toString()}catchErrors(){const t=window.Vaadin.ConsoleErrors;t&&t.forEach(e=>{this.log("error",e.map(o=>this.format(o)).join(" "))}),window.Vaadin.ConsoleErrors={push:e=>{this.log("error",e.map(o=>this.format(o)).join(" "))}}}disconnectedCallback(){this.disableEventListener&&(document.body.removeEventListener("focus",this.disableEventListener),document.body.removeEventListener("click",this.disableEventListener)),super.disconnectedCallback()}toggleExpanded(){this.notifications.slice().forEach(t=>this.dismissNotification(t.id)),this.expanded=!this.expanded,this.expanded&&this.root.focus()}showSplashMessage(t){this.splashMessage=t,this.splashMessage&&(this.expanded?this.demoteSplashMessage():setTimeout(()=>{this.demoteSplashMessage()},C.AUTO_DEMOTE_NOTIFICATION_DELAY))}demoteSplashMessage(){this.splashMessage&&this.log("log",this.splashMessage),this.showSplashMessage(void 0)}checkLicense(t){this.frontendConnection?this.frontendConnection.sendLicenseCheck(t):Ti({message:"Internal error: no connection",product:t})}log(t,e,o,n){const i=this.nextMessageId;for(this.nextMessageId+=1,this.messages.push({id:i,type:t,message:e,details:o,link:n,dontShowAgain:!1,deleted:!1});this.messages.length>C.MAX_LOG_ROWS;)this.messages.shift();this.requestUpdate(),this.updateComplete.then(()=>{const r=this.renderRoot.querySelector(".message-tray .message:last-child");this.expanded&&r?(setTimeout(()=>r.scrollIntoView({behavior:"smooth"}),this.transitionDuration),this.unreadErrors=!1):t==="error"&&(this.unreadErrors=!0)})}showNotification(t,e,o,n,i){if(i===void 0||!C.notificationDismissed(i)){if(this.notifications.filter(s=>s.persistentId===i).filter(s=>!s.deleted).length>0)return;const r=this.nextMessageId;this.nextMessageId+=1,this.notifications.push({id:r,type:t,message:e,details:o,link:n,persistentId:i,dontShowAgain:!1,deleted:!1}),n===void 0&&setTimeout(()=>{this.dismissNotification(r)},C.AUTO_DEMOTE_NOTIFICATION_DELAY),this.requestUpdate()}else this.log(t,e,o,n)}dismissNotification(t){const e=this.findNotificationIndex(t);if(e!==-1&&!this.notifications[e].deleted){const o=this.notifications[e];if(o.dontShowAgain&&o.persistentId&&!C.notificationDismissed(o.persistentId)){let n=window.localStorage.getItem(C.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);n=n===null?o.persistentId:`${n},${o.persistentId}`,window.localStorage.setItem(C.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE,n)}o.deleted=!0,this.log(o.type,o.message,o.details,o.link),setTimeout(()=>{const n=this.findNotificationIndex(t);n!==-1&&(this.notifications.splice(n,1),this.requestUpdate())},this.transitionDuration)}}findNotificationIndex(t){let e=-1;return this.notifications.some((o,n)=>o.id===t?(e=n,!0):!1),e}toggleDontShowAgain(t){const e=this.findNotificationIndex(t);if(e!==-1&&!this.notifications[e].deleted){const o=this.notifications[e];o.dontShowAgain=!o.dontShowAgain,this.requestUpdate()}}setActive(t){var e,o;(e=this.frontendConnection)==null||e.setActive(t),(o=this.javaConnection)==null||o.setActive(t),window.sessionStorage.setItem(C.ACTIVE_KEY_IN_SESSION_STORAGE,t?"true":"false")}getStatusColor(t){return t===M.ACTIVE?"var(--dev-tools-green-color)":t===M.INACTIVE?"var(--dev-tools-grey-color)":t===M.UNAVAILABLE?"var(--dev-tools-yellow-hsl)":t===M.ERROR?"var(--dev-tools-red-color)":"none"}renderMessage(t){return f`
      <div
        class="message ${t.type} ${t.deleted?"animate-out":""} ${t.details||t.link?"has-details":""}"
      >
        <div class="message-content">
          <div class="message-heading">${t.message}</div>
          <div class="message-details" ?hidden="${!t.details&&!t.link}">
            ${t.details?f`<p>${t.details}</p>`:""}
            ${t.link?f`<a class="ahreflike" href="${t.link}" target="_blank">Learn more</a>`:""}
          </div>
          ${t.persistentId?f`<div
                class="persist ${t.dontShowAgain?"on":"off"}"
                @click=${()=>this.toggleDontShowAgain(t.id)}
              >
                Don’t show again
              </div>`:""}
        </div>
        <div class="dismiss-message" @click=${()=>this.dismissNotification(t.id)}>Dismiss</div>
      </div>
    `}render(){return f` <div
        class="window ${this.expanded&&!this.componentPickActive?"visible":"hidden"}"
        tabindex="0"
        @keydown=${t=>t.key==="Escape"&&this.expanded&&this.toggleExpanded()}
      >
        <div class="window-toolbar">
          ${this.tabs.map(t=>f`<button
                class=${Vo({tab:!0,active:this.activeTab===t.id,unreadErrors:t.id==="log"&&this.unreadErrors})}
                id="${t.id}"
                @click=${()=>{this.activeTab=t.id,t.activate&&t.activate.call(this)}}
              >
                ${t.title}
              </button> `)}
          <button class="minimize-button" title="Minimize" @click=${()=>this.toggleExpanded()}>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="#fff" opacity=".8">
                <path
                  d="m7.25 1.75c0-.41421.33579-.75.75-.75h3.25c2.0711 0 3.75 1.67893 3.75 3.75v6.5c0 2.0711-1.6789 3.75-3.75 3.75h-6.5c-2.07107 0-3.75-1.6789-3.75-3.75v-3.25c0-.41421.33579-.75.75-.75s.75.33579.75.75v3.25c0 1.2426 1.00736 2.25 2.25 2.25h6.5c1.2426 0 2.25-1.0074 2.25-2.25v-6.5c0-1.24264-1.0074-2.25-2.25-2.25h-3.25c-.41421 0-.75-.33579-.75-.75z"
                />
                <path
                  d="m2.96967 2.96967c.29289-.29289.76777-.29289 1.06066 0l5.46967 5.46967v-2.68934c0-.41421.33579-.75.75-.75.4142 0 .75.33579.75.75v4.5c0 .4142-.3358.75-.75.75h-4.5c-.41421 0-.75-.3358-.75-.75 0-.41421.33579-.75.75-.75h2.68934l-5.46967-5.46967c-.29289-.29289-.29289-.76777 0-1.06066z"
                />
              </g>
            </svg>
          </button>
        </div>
        ${this.tabs.map(t=>this.activeTab===t.id?t.render():k)}
      </div>

      <div class="notification-tray">${this.notifications.map(t=>this.renderMessage(t))}</div>
      <vaadin-dev-tools-component-picker
        .active=${this.componentPickActive}
        @component-picker-opened=${()=>{this.componentPickActive=!0}}
        @component-picker-closed=${()=>{this.componentPickActive=!1}}
      ></vaadin-dev-tools-component-picker>
      <div
        class="dev-tools ${this.splashMessage?"active":""}${this.unreadErrors?" error":""}"
        @click=${()=>this.toggleExpanded()}
      >
        ${this.unreadErrors?f`<svg
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="dev-tools-icon error"
            >
              <clipPath id="a"><path d="m0 0h16v16h-16z" /></clipPath>
              <g clip-path="url(#a)">
                <path
                  d="m6.25685 2.09894c.76461-1.359306 2.72169-1.359308 3.4863 0l5.58035 9.92056c.7499 1.3332-.2135 2.9805-1.7432 2.9805h-11.1606c-1.529658 0-2.4930857-1.6473-1.743156-2.9805z"
                  fill="#ff5c69"
                />
                <path
                  d="m7.99699 4c-.45693 0-.82368.37726-.81077.834l.09533 3.37352c.01094.38726.32803.69551.71544.69551.38741 0 .70449-.30825.71544-.69551l.09533-3.37352c.0129-.45674-.35384-.834-.81077-.834zm.00301 8c.60843 0 1-.3879 1-.979 0-.5972-.39157-.9851-1-.9851s-1 .3879-1 .9851c0 .5911.39157.979 1 .979z"
                  fill="#fff"
                />
              </g>
            </svg>`:f`<svg
              fill="none"
              height="17"
              viewBox="0 0 16 17"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              class="dev-tools-icon logo"
            >
              <g fill="#fff">
                <path
                  d="m8.88273 5.97926c0 .04401-.0032.08898-.00801.12913-.02467.42848-.37813.76767-.8117.76767-.43358 0-.78704-.34112-.81171-.76928-.00481-.04015-.00801-.08351-.00801-.12752 0-.42784-.10255-.87656-1.14434-.87656h-3.48364c-1.57118 0-2.315271-.72849-2.315271-2.21758v-1.26683c0-.42431.324618-.768314.748261-.768314.42331 0 .74441.344004.74441.768314v.42784c0 .47924.39576.81265 1.11293.81265h3.41538c1.5542 0 1.67373 1.156 1.725 1.7679h.03429c.05095-.6119.17048-1.7679 1.72468-1.7679h3.4154c.7172 0 1.0145-.32924 1.0145-.80847l-.0067-.43202c0-.42431.3227-.768314.7463-.768314.4234 0 .7255.344004.7255.768314v1.26683c0 1.48909-.6181 2.21758-2.1893 2.21758h-3.4836c-1.04182 0-1.14437.44872-1.14437.87656z"
                />
                <path
                  d="m8.82577 15.1648c-.14311.3144-.4588.5335-.82635.5335-.37268 0-.69252-.2249-.83244-.5466-.00206-.0037-.00412-.0073-.00617-.0108-.00275-.0047-.00549-.0094-.00824-.0145l-3.16998-5.87318c-.08773-.15366-.13383-.32816-.13383-.50395 0-.56168.45592-1.01879 1.01621-1.01879.45048 0 .75656.22069.96595.6993l2.16882 4.05042 2.17166-4.05524c.2069-.47379.513-.69448.9634-.69448.5603 0 1.0166.45711 1.0166 1.01879 0 .17579-.0465.35029-.1348.50523l-3.1697 5.8725c-.00503.0096-.01006.0184-.01509.0272-.00201.0036-.00402.0071-.00604.0106z"
                />
              </g>
            </svg>`}

        <span
          class="status-blip"
          style="background: linear-gradient(to right, ${this.getStatusColor(this.frontendStatus)} 50%, ${this.getStatusColor(this.javaStatus)} 50%)"
        ></span>
        ${this.splashMessage?f`<span class="status-description">${this.splashMessage}</span></div>`:k}
      </div>`}renderLog(){return f`<div class="message-tray">${this.messages.map(t=>this.renderMessage(t))}</div>`}activateLog(){this.unreadErrors=!1,this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(".message-tray .message:last-child");t&&t.scrollIntoView()})}renderCode(){return f`<div class="info-tray">
      <div>
        <select id="locationType">
          <option value="create" selected>Create</option>
          <option value="attach">Attach</option>
        </select>
        <button
          class="button pick"
          @click=${async()=>{await S(()=>Promise.resolve().then(()=>La),void 0),this.componentPicker.open({infoTemplate:f`
                <div>
                  <h3>Locate a component in source code</h3>
                  <p>Use the mouse cursor to highlight components in the UI.</p>
                  <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
                  <p>
                    Click the primary mouse button to open the corresponding source code line of the highlighted
                    component in your IDE.
                  </p>
                </div>
              `,pickCallback:t=>{const e={nodeId:t.nodeId,uiId:t.uiId};this.renderRoot.querySelector("#locationType").value==="create"?this.frontendConnection.sendShowComponentCreateLocation(e):this.frontendConnection.sendShowComponentAttachLocation(e)}})}}
        >
          Find component in code
        </button>
      </div>
      </div>
    </div>`}renderInfo(){return f`<div class="info-tray">
      <button class="button copy" @click=${this.copyInfoToClipboard}>Copy</button>
      <dl>
        <dt>${this.serverInfo.productName}</dt>
        <dd>${this.serverInfo.vaadinVersion}</dd>
        <dt>Flow</dt>
        <dd>${this.serverInfo.flowVersion}</dd>
        <dt>Java</dt>
        <dd>${this.serverInfo.javaVersion}</dd>
        <dt>OS</dt>
        <dd>${this.serverInfo.osVersion}</dd>
        <dt>Browser</dt>
        <dd>${navigator.userAgent}</dd>
        <dt>
          Live reload
          <label class="switch">
            <input
              id="toggle"
              type="checkbox"
              ?disabled=${this.liveReloadDisabled||(this.frontendStatus===M.UNAVAILABLE||this.frontendStatus===M.ERROR)&&(this.javaStatus===M.UNAVAILABLE||this.javaStatus===M.ERROR)}
              ?checked="${this.frontendStatus===M.ACTIVE||this.javaStatus===M.ACTIVE}"
              @change=${t=>this.setActive(t.target.checked)}
            />
            <span class="slider"></span>
          </label>
        </dt>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.javaStatus)}">
          Java ${this.javaStatus} ${this.backend?`(${C.BACKEND_DISPLAY_NAME[this.backend]})`:""}
        </dd>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.frontendStatus)}">
          Front end ${this.frontendStatus}
        </dd>
      </dl>
    </div>`}renderFeatures(){return f`<div class="features-tray">
      ${this.features.map(t=>f`<div class="feature">
          <label class="switch">
            <input
              class="feature-toggle"
              id="feature-toggle-${t.id}"
              type="checkbox"
              ?checked=${t.enabled}
              @change=${e=>this.toggleFeatureFlag(e,t)}
            />
            <span class="slider"></span>
            ${t.title}
          </label>
          <a class="ahreflike" href="${t.moreInfoLink}" target="_blank">Learn more</a>
        </div>`)}
    </div>`}renderThemeEditor(){return f` <vaadin-dev-tools-theme-editor
      .expanded=${this.expanded}
      .themeEditorState=${this.themeEditorState}
      .pickerProvider=${()=>this.componentPicker}
      .connection=${this.frontendConnection}
    ></vaadin-dev-tools-theme-editor>`}copyInfoToClipboard(){const t=this.renderRoot.querySelectorAll(".info-tray dt, .info-tray dd"),e=Array.from(t).map(o=>(o.localName==="dd"?": ":`
`)+o.textContent.trim()).join("").replace(/^\n/,"");ja(e),this.showNotification("information","Environment information copied to clipboard",void 0,void 0,"versionInfoCopied")}toggleFeatureFlag(t,e){const o=t.target.checked;this.frontendConnection?(this.frontendConnection.setFeature(e.id,o),this.showNotification("information",`“${e.title}” ${o?"enabled":"disabled"}`,e.requiresServerRestart?"This feature requires a server restart":void 0,void 0,`feature${e.id}${o?"Enabled":"Disabled"}`)):this.log("error",`Unable to toggle feature ${e.title}: No server connection available`)}};let _=C;_.MAX_LOG_ROWS=1e3;_.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE="vaadin.live-reload.dismissedNotifications";_.ACTIVE_KEY_IN_SESSION_STORAGE="vaadin.live-reload.active";_.TRIGGERED_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggered";_.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggeredCount";_.AUTO_DEMOTE_NOTIFICATION_DELAY=5e3;_.HOTSWAP_AGENT="HOTSWAP_AGENT";_.JREBEL="JREBEL";_.SPRING_BOOT_DEVTOOLS="SPRING_BOOT_DEVTOOLS";_.BACKEND_DISPLAY_NAME={HOTSWAP_AGENT:"HotswapAgent",JREBEL:"JRebel",SPRING_BOOT_DEVTOOLS:"Spring Boot Devtools"};N([y({type:String})],_.prototype,"url",2);N([y({type:Boolean,attribute:!0})],_.prototype,"liveReloadDisabled",2);N([y({type:String})],_.prototype,"backend",2);N([y({type:Number})],_.prototype,"springBootLiveReloadPort",2);N([y({type:Boolean,attribute:!1})],_.prototype,"expanded",2);N([y({type:Array,attribute:!1})],_.prototype,"messages",2);N([y({type:String,attribute:!1})],_.prototype,"splashMessage",2);N([y({type:Array,attribute:!1})],_.prototype,"notifications",2);N([y({type:String,attribute:!1})],_.prototype,"frontendStatus",2);N([y({type:String,attribute:!1})],_.prototype,"javaStatus",2);N([T()],_.prototype,"tabs",2);N([T()],_.prototype,"activeTab",2);N([T()],_.prototype,"serverInfo",2);N([T()],_.prototype,"features",2);N([T()],_.prototype,"unreadErrors",2);N([ot(".window")],_.prototype,"root",2);N([ot("vaadin-dev-tools-component-picker")],_.prototype,"componentPicker",2);N([T()],_.prototype,"componentPickActive",2);N([T()],_.prototype,"themeEditorState",2);customElements.get("vaadin-dev-tools")===void 0&&customElements.define("vaadin-dev-tools",_);const{toString:Ga}=Object.prototype;function Ka(t){return Ga.call(t)==="[object RegExp]"}function Ya(t,{preserve:e=!0,whitespace:o=!0,all:n}={}){if(n)throw new Error("The `all` option is no longer supported. Use the `preserve` option instead.");let i=e,r;typeof e=="function"?(i=!1,r=e):Ka(e)&&(i=!1,r=c=>e.test(c));let s=!1,l="",a="",d="";for(let c=0;c<t.length;c++){if(l=t[c],t[c-1]!=="\\"&&(l==='"'||l==="'")&&(s===l?s=!1:s||(s=l)),!s&&l==="/"&&t[c+1]==="*"){const m=t[c+2]==="!";let h=c+2;for(;h<t.length;h++){if(t[h]==="*"&&t[h+1]==="/"){i&&m||r&&r(a)?d+=`/*${a}*/`:o||(t[h+2]===`
`?h++:t[h+2]+t[h+3]===`\r
`&&(h+=2)),a="";break}a+=t[h]}c=h+1;continue}d+=l}return d}const Ja=CSSStyleSheet.toString().includes("document.createElement"),Xa=(t,e)=>{const o=/(?:@media\s(.+?))?(?:\s{)?\@import\s*(?:url\(\s*['"]?(.+?)['"]?\s*\)|(["'])((?:\\.|[^\\])*?)\3)([^;]*);(?:})?/g;/\/\*(.|[\r\n])*?\*\//gm.exec(t)!=null&&(t=Ya(t));for(var n,i=t;(n=o.exec(t))!==null;){i=i.replace(n[0],"");const r=document.createElement("link");r.rel="stylesheet",r.href=n[2]||n[4];const s=n[1]||n[5];s&&(r.media=s),e===document?document.head.appendChild(r):e.appendChild(r)}return i},Qa=(t,e,o)=>(o?e.adoptedStyleSheets=[t,...e.adoptedStyleSheets]:e.adoptedStyleSheets=[...e.adoptedStyleSheets,t],()=>{e.adoptedStyleSheets=e.adoptedStyleSheets.filter(n=>n!==t)}),Za=(t,e,o)=>{const n=new CSSStyleSheet;return n.replaceSync(t),Ja?Qa(n,e,o):(o?e.adoptedStyleSheets.splice(0,0,n):e.adoptedStyleSheets.push(n),()=>{e.adoptedStyleSheets.splice(e.adoptedStyleSheets.indexOf(n),1)})},el=(t,e)=>{const o=document.createElement("style");o.type="text/css",o.textContent=t;let n;if(e){const r=Array.from(document.head.childNodes).filter(s=>s.nodeType===Node.COMMENT_NODE).find(s=>s.data.trim()===e);r&&(n=r)}return document.head.insertBefore(o,n),()=>{o.remove()}},mt=(t,e,o,n)=>{if(o===document){const r=tl(t);if(window.Vaadin.theme.injectedGlobalCss.indexOf(r)!==-1)return;window.Vaadin.theme.injectedGlobalCss.push(r)}const i=Xa(t,o);return o===document?el(i,e):Za(i,o,n)};window.Vaadin=window.Vaadin||{};window.Vaadin.theme=window.Vaadin.theme||{};window.Vaadin.theme.injectedGlobalCss=[];function Xn(t){let e,o,n=2166136261;for(e=0,o=t.length;e<o;e++)n^=t.charCodeAt(e),n+=(n<<1)+(n<<4)+(n<<7)+(n<<8)+(n<<24);return("0000000"+(n>>>0).toString(16)).substr(-8)}function tl(t){let e=Xn(t);return e+Xn(e+t)}document._vaadintheme_gomoku_componentCss||(document._vaadintheme_gomoku_componentCss=!0);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class ol extends HTMLElement{static get version(){return"24.1.2"}}customElements.define("vaadin-lumo-styles",ol);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const nl=t=>class extends t{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(o,n,i){super.attributeChangedCallback(o,n,i),o==="theme"&&this._set_theme(i)}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Pi=[];function Ai(t){return t&&Object.prototype.hasOwnProperty.call(t,"__themes")}function il(t){return Ai(customElements.get(t))}function rl(t=[]){return[t].flat(1/0).filter(e=>e instanceof Ro?!0:(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1))}function qo(t,e,o={}){t&&il(t)&&console.warn(`The custom element definition for "${t}"
      was finalized before a style module was registered.
      Make sure to add component specific style modules before
      importing the corresponding custom element.`),e=rl(e),window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.registerStyles(t,e,o):Pi.push({themeFor:t,styles:e,include:o.include,moduleId:o.moduleId})}function No(){return window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.getAllThemes():Pi}function sl(t,e){return(t||"").split(" ").some(o=>new RegExp(`^${o.split("*").join(".*")}$`,"u").test(e))}function al(t=""){let e=0;return t.startsWith("lumo-")||t.startsWith("material-")?e=1:t.startsWith("vaadin-")&&(e=2),e}function Ii(t){const e=[];return t.include&&[].concat(t.include).forEach(o=>{const n=No().find(i=>i.moduleId===o);n?e.push(...Ii(n),...n.styles):console.warn(`Included moduleId ${o} not found in style registry`)},t.styles),e}function ll(t,e){const o=document.createElement("style");o.innerHTML=t.map(n=>n.cssText).join(`
`),e.content.appendChild(o)}function dl(t){const e=`${t}-default-theme`,o=No().filter(n=>n.moduleId!==e&&sl(n.themeFor,t)).map(n=>({...n,styles:[...Ii(n),...n.styles],includePriority:al(n.moduleId)})).sort((n,i)=>i.includePriority-n.includePriority);return o.length>0?o:No().filter(n=>n.moduleId===e)}const bl=t=>class extends nl(t){static finalize(){if(super.finalize(),this.elementStyles)return;const o=this.prototype._template;!o||Ai(this)||ll(this.getStylesForThis(),o)}static finalizeStyles(o){const n=this.getStylesForThis();return o?[...super.finalizeStyles(o),...n]:n}static getStylesForThis(){const o=Object.getPrototypeOf(this.prototype),n=(o?o.constructor.__themes:[])||[];this.__themes=[...n,...dl(this.is)];const i=this.__themes.flatMap(r=>r.styles);return i.filter((r,s)=>s===i.lastIndexOf(r))}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const cl=(t,...e)=>{const o=document.createElement("style");o.id=t,o.textContent=e.map(n=>n.toString()).join(`
`).replace(":host","html"),document.head.insertAdjacentElement("afterbegin",o)},xe=(t,...e)=>{cl(`lumo-${t}`,e)};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const hl=w`
  :host {
    /* prettier-ignore */
    --lumo-font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

    /* Font sizes */
    --lumo-font-size-xxs: 0.75rem;
    --lumo-font-size-xs: 0.8125rem;
    --lumo-font-size-s: 0.875rem;
    --lumo-font-size-m: 1rem;
    --lumo-font-size-l: 1.125rem;
    --lumo-font-size-xl: 1.375rem;
    --lumo-font-size-xxl: 1.75rem;
    --lumo-font-size-xxxl: 2.5rem;

    /* Line heights */
    --lumo-line-height-xs: 1.25;
    --lumo-line-height-s: 1.375;
    --lumo-line-height-m: 1.625;
  }
`,Wo=w`
  body,
  :host {
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    line-height: var(--lumo-line-height-m);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  small,
  [theme~='font-size-s'] {
    font-size: var(--lumo-font-size-s);
    line-height: var(--lumo-line-height-s);
  }

  [theme~='font-size-xs'] {
    font-size: var(--lumo-font-size-xs);
    line-height: var(--lumo-line-height-xs);
  }

  :where(h1, h2, h3, h4, h5, h6) {
    font-weight: 600;
    line-height: var(--lumo-line-height-xs);
    margin-block: 0;
  }

  :where(h1) {
    font-size: var(--lumo-font-size-xxxl);
  }

  :where(h2) {
    font-size: var(--lumo-font-size-xxl);
  }

  :where(h3) {
    font-size: var(--lumo-font-size-xl);
  }

  :where(h4) {
    font-size: var(--lumo-font-size-l);
  }

  :where(h5) {
    font-size: var(--lumo-font-size-m);
  }

  :where(h6) {
    font-size: var(--lumo-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  p,
  blockquote {
    margin-top: 0.5em;
    margin-bottom: 0.75em;
  }

  a {
    text-decoration: none;
  }

  a:where(:any-link):hover {
    text-decoration: underline;
  }

  hr {
    display: block;
    align-self: stretch;
    height: 1px;
    border: 0;
    padding: 0;
    margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);
    background-color: var(--lumo-contrast-10pct);
  }

  blockquote {
    border-left: 2px solid var(--lumo-contrast-30pct);
  }

  b,
  strong {
    font-weight: 600;
  }

  /* RTL specific styles */
  blockquote[dir='rtl'] {
    border-left: none;
    border-right: 2px solid var(--lumo-contrast-30pct);
  }
`;qo("",Wo,{moduleId:"lumo-typography"});xe("typography-props",hl);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ul=w`
  ${ci(Wo.cssText.replace(/,\s*:host/su,""))}
`;xe("typography",ul,!1);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const pl=w`
  :host {
    /* Base (background) */
    --lumo-base-color: #fff;

    /* Tint */
    --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);
    --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);
    --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);
    --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);
    --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);
    --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);
    --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);
    --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);
    --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);
    --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);
    --lumo-tint: #fff;

    /* Shade */
    --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);
    --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);
    --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);
    --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);
    --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);
    --lumo-shade-50pct: hsla(214, 45%, 20%, 0.52);
    --lumo-shade-60pct: hsla(214, 43%, 19%, 0.6);
    --lumo-shade-70pct: hsla(214, 42%, 18%, 0.69);
    --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);
    --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);
    --lumo-shade: hsl(214, 35%, 15%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-shade-5pct);
    --lumo-contrast-10pct: var(--lumo-shade-10pct);
    --lumo-contrast-20pct: var(--lumo-shade-20pct);
    --lumo-contrast-30pct: var(--lumo-shade-30pct);
    --lumo-contrast-40pct: var(--lumo-shade-40pct);
    --lumo-contrast-50pct: var(--lumo-shade-50pct);
    --lumo-contrast-60pct: var(--lumo-shade-60pct);
    --lumo-contrast-70pct: var(--lumo-shade-70pct);
    --lumo-contrast-80pct: var(--lumo-shade-80pct);
    --lumo-contrast-90pct: var(--lumo-shade-90pct);
    --lumo-contrast: var(--lumo-shade);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 100%, 48%);
    --lumo-primary-color-50pct: hsla(214, 100%, 49%, 0.76);
    --lumo-primary-color-10pct: hsla(214, 100%, 60%, 0.13);
    --lumo-primary-text-color: hsl(214, 100%, 43%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 85%, 48%);
    --lumo-error-color-50pct: hsla(3, 85%, 49%, 0.5);
    --lumo-error-color-10pct: hsla(3, 85%, 49%, 0.1);
    --lumo-error-text-color: hsl(3, 89%, 42%);
    --lumo-error-contrast-color: #fff;

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 72%, 31%, 0.5);
    --lumo-success-color-10pct: hsla(145, 72%, 31%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 25%);
    --lumo-success-contrast-color: #fff;

    /* Warning */
    --lumo-warning-color: hsl(48, 100%, 50%);
    --lumo-warning-color-10pct: hsla(48, 100%, 50%, 0.25);
    --lumo-warning-text-color: hsl(32, 100%, 30%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  /* forced-colors mode adjustments */
  @media (forced-colors: active) {
    html {
      --lumo-disabled-text-color: GrayText;
    }
  }
`;xe("color-props",pl);const Go=w`
  [theme~='dark'] {
    /* Base (background) */
    --lumo-base-color: hsl(214, 35%, 21%);

    /* Tint */
    --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);
    --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
    --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);
    --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);
    --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);
    --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);
    --lumo-tint-60pct: hsla(214, 82%, 90%, 0.58);
    --lumo-tint-70pct: hsla(214, 87%, 92%, 0.69);
    --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);
    --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
    --lumo-tint: hsl(214, 100%, 98%);

    /* Shade */
    --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);
    --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);
    --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);
    --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);
    --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);
    --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);
    --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);
    --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);
    --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);
    --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);
    --lumo-shade: hsl(214, 33%, 13%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-tint-5pct);
    --lumo-contrast-10pct: var(--lumo-tint-10pct);
    --lumo-contrast-20pct: var(--lumo-tint-20pct);
    --lumo-contrast-30pct: var(--lumo-tint-30pct);
    --lumo-contrast-40pct: var(--lumo-tint-40pct);
    --lumo-contrast-50pct: var(--lumo-tint-50pct);
    --lumo-contrast-60pct: var(--lumo-tint-60pct);
    --lumo-contrast-70pct: var(--lumo-tint-70pct);
    --lumo-contrast-80pct: var(--lumo-tint-80pct);
    --lumo-contrast-90pct: var(--lumo-tint-90pct);
    --lumo-contrast: var(--lumo-tint);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 90%, 48%);
    --lumo-primary-color-50pct: hsla(214, 90%, 70%, 0.69);
    --lumo-primary-color-10pct: hsla(214, 90%, 55%, 0.13);
    --lumo-primary-text-color: hsl(214, 90%, 77%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 79%, 49%);
    --lumo-error-color-50pct: hsla(3, 75%, 62%, 0.5);
    --lumo-error-color-10pct: hsla(3, 75%, 62%, 0.14);
    --lumo-error-text-color: hsl(3, 100%, 80%);

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 92%, 51%, 0.5);
    --lumo-success-color-10pct: hsla(145, 92%, 51%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 46%);

    /* Warning */
    --lumo-warning-color: hsl(43, 100%, 48%);
    --lumo-warning-color-10pct: hsla(40, 100%, 50%, 0.2);
    --lumo-warning-text-color: hsl(45, 100%, 60%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  html {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: light;
  }

  [theme~='dark'] {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: dark;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--lumo-header-text-color);
  }

  a:where(:any-link) {
    color: var(--lumo-primary-text-color);
  }

  a:not(:any-link) {
    color: var(--lumo-disabled-text-color);
  }

  blockquote {
    color: var(--lumo-secondary-text-color);
  }

  code,
  pre {
    background-color: var(--lumo-contrast-10pct);
    border-radius: var(--lumo-border-radius-m);
  }
`;qo("",Go,{moduleId:"lumo-color"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */xe("color",Go);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ri=w`
  :host {
    /* Square */
    --lumo-space-xs: 0.25rem;
    --lumo-space-s: 0.5rem;
    --lumo-space-m: 1rem;
    --lumo-space-l: 1.5rem;
    --lumo-space-xl: 2.5rem;

    /* Wide */
    --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);
    --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);
    --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);
    --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);
    --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);

    /* Tall */
    --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);
    --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);
    --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);
    --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);
    --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);
  }
`;xe("spacing-props",Ri);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ml=w`
  :host {
    /* Border radius */
    --lumo-border-radius-s: 0.25em; /* Checkbox, badge, date-picker year indicator, etc */
    --lumo-border-radius-m: var(--lumo-border-radius, 0.25em); /* Button, text field, menu overlay, etc */
    --lumo-border-radius-l: 0.5em; /* Dialog, notification, etc */

    /* Shadow */
    --lumo-box-shadow-xs: 0 1px 4px -1px var(--lumo-shade-50pct);
    --lumo-box-shadow-s: 0 2px 4px -1px var(--lumo-shade-20pct), 0 3px 12px -1px var(--lumo-shade-30pct);
    --lumo-box-shadow-m: 0 2px 6px -1px var(--lumo-shade-20pct), 0 8px 24px -4px var(--lumo-shade-40pct);
    --lumo-box-shadow-l: 0 3px 18px -2px var(--lumo-shade-20pct), 0 12px 48px -6px var(--lumo-shade-40pct);
    --lumo-box-shadow-xl: 0 4px 24px -3px var(--lumo-shade-20pct), 0 18px 64px -8px var(--lumo-shade-40pct);

    /* Clickable element cursor */
    --lumo-clickable-cursor: default;
  }
`;w`
  html {
    --vaadin-checkbox-size: calc(var(--lumo-size-m) / 2);
    --vaadin-radio-button-size: calc(var(--lumo-size-m) / 2);
    --vaadin-input-field-border-radius: var(--lumo-border-radius-m);
  }
`;xe("style-props",ml);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ko=w`
  [theme~='badge'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0.4em calc(0.5em + var(--lumo-border-radius-s) / 4);
    color: var(--lumo-primary-text-color);
    background-color: var(--lumo-primary-color-10pct);
    border-radius: var(--lumo-border-radius-s);
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-s);
    line-height: 1;
    font-weight: 500;
    text-transform: initial;
    letter-spacing: initial;
    min-width: calc(var(--lumo-line-height-xs) * 1em + 0.45em);
    flex-shrink: 0;
  }

  /* Ensure proper vertical alignment */
  [theme~='badge']::before {
    display: inline-block;
    content: '\\2003';
    width: 0;
  }

  [theme~='badge'][theme~='small'] {
    font-size: var(--lumo-font-size-xxs);
    line-height: 1;
  }

  /* Colors */

  [theme~='badge'][theme~='success'] {
    color: var(--lumo-success-text-color);
    background-color: var(--lumo-success-color-10pct);
  }

  [theme~='badge'][theme~='error'] {
    color: var(--lumo-error-text-color);
    background-color: var(--lumo-error-color-10pct);
  }

  [theme~='badge'][theme~='warning'] {
    color: var(--lumo-warning-text-color);
    background-color: var(--lumo-warning-color-10pct);
  }

  [theme~='badge'][theme~='contrast'] {
    color: var(--lumo-contrast-80pct);
    background-color: var(--lumo-contrast-5pct);
  }

  /* Primary */

  [theme~='badge'][theme~='primary'] {
    color: var(--lumo-primary-contrast-color);
    background-color: var(--lumo-primary-color);
  }

  [theme~='badge'][theme~='success'][theme~='primary'] {
    color: var(--lumo-success-contrast-color);
    background-color: var(--lumo-success-color);
  }

  [theme~='badge'][theme~='error'][theme~='primary'] {
    color: var(--lumo-error-contrast-color);
    background-color: var(--lumo-error-color);
  }

  [theme~='badge'][theme~='warning'][theme~='primary'] {
    color: var(--lumo-warning-contrast-color);
    background-color: var(--lumo-warning-color);
  }

  [theme~='badge'][theme~='contrast'][theme~='primary'] {
    color: var(--lumo-base-color);
    background-color: var(--lumo-contrast);
  }

  /* Links */

  [theme~='badge'][href]:hover {
    text-decoration: none;
  }

  /* Icon */

  [theme~='badge'] vaadin-icon {
    margin: -0.25em 0;
  }

  [theme~='badge'] vaadin-icon:first-child {
    margin-left: -0.375em;
  }

  [theme~='badge'] vaadin-icon:last-child {
    margin-right: -0.375em;
  }

  vaadin-icon[theme~='badge'][icon] {
    min-width: 0;
    padding: 0;
    font-size: 1rem;
    width: var(--lumo-icon-size-m);
    height: var(--lumo-icon-size-m);
  }

  vaadin-icon[theme~='badge'][icon][theme~='small'] {
    width: var(--lumo-icon-size-s);
    height: var(--lumo-icon-size-s);
  }

  /* Empty */

  [theme~='badge']:not([icon]):empty {
    min-width: 0;
    width: 1em;
    height: 1em;
    padding: 0;
    border-radius: 50%;
    background-color: var(--lumo-primary-color);
  }

  [theme~='badge'][theme~='small']:not([icon]):empty {
    width: 0.75em;
    height: 0.75em;
  }

  [theme~='badge'][theme~='contrast']:not([icon]):empty {
    background-color: var(--lumo-contrast);
  }

  [theme~='badge'][theme~='success']:not([icon]):empty {
    background-color: var(--lumo-success-color);
  }

  [theme~='badge'][theme~='error']:not([icon]):empty {
    background-color: var(--lumo-error-color);
  }

  [theme~='badge'][theme~='warning']:not([icon]):empty {
    background-color: var(--lumo-warning-color);
  }

  /* Pill */

  [theme~='badge'][theme~='pill'] {
    --lumo-border-radius-s: 1em;
  }

  /* RTL specific styles */

  [dir='rtl'][theme~='badge'] vaadin-icon:first-child {
    margin-right: -0.375em;
    margin-left: 0;
  }

  [dir='rtl'][theme~='badge'] vaadin-icon:last-child {
    margin-left: -0.375em;
    margin-right: 0;
  }
`;qo("",Ko,{moduleId:"lumo-badge"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */xe("badge",Ko);const vl=t=>{const e=[];t!==document&&(e.push(mt(Wo.cssText,"",t,!0)),e.push(mt(Go.cssText,"",t,!0)),e.push(mt(Ri.cssText,"",t,!0)),e.push(mt(Ko.cssText,"",t,!0)))},fl=vl;fl(document);export{ss as D,Fe as F,A as L,is as P,bl as T,Pe as U,E as _,xe as a,be as b,w as c,rs as d,qo as e,nl as f,Go as g,f as h,Wo as i,J as j,Ss as k,Es as l,k as n,Ie as r,Ne as s,Pi as t,ci as u,P as y};
