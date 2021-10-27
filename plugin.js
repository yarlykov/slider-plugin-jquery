!function(){"use strict";function t(t,e){var n=t.min,o=void 0===n?0:n,r=t.max,i=void 0===r?1:r,a=t.step,c=void 0===a?1:a,u=(e-o)/c*(100/((i-o)/c));return u>100?100:u<0?0:u}function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=(e-t)/n,i=100/r,a=Math.round(o/i)*n,c=a+t;return c}function n(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function o(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?n(Object(o),!0).forEach((function(e){i(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function r(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var a=function(){function n(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),i(this,"min",void 0),i(this,"max",void 0),i(this,"step",void 0),i(this,"valueFrom",void 0),i(this,"valueTo",void 0)}var a,c,u;return a=n,(c=[{key:"checkState",value:function(t){return this.min=t.min||0,this.max=t.max||this.min+1,this.step=t.step||1,this.valueFrom=t.valueFrom||0,this.valueTo=t.valueTo||0,this.checkMinMax(this.min,this.max),this.step=this.checkStep(this.min,this.max,this.step),t.range&&(this.checkMinRange(this.valueFrom),this.checkMaxRange(this.valueTo),this.checkRangeMinMax(this.valueFrom,this.valueTo)),o(o({},t),{},{min:this.min,max:this.max,step:this.step,valueFrom:this.checkValue(this.valueFrom),valueTo:this.valueTo})}},{key:"checkValue",value:function(n){var o=t({min:this.min,max:this.max,step:this.step},n),r=e(this.min,this.max,this.step,o);return o>=100&&r!==this.max||r>this.max?this.max:r}},{key:"checkMinRange",value:function(t){return t>=this.valueTo&&(t=this.valueTo),this.checkValue(t)}},{key:"checkMaxRange",value:function(t){return t<=this.valueFrom&&(t=this.valueFrom),this.checkValue(t)}},{key:"checkStep",value:function(t,e,n){var o=e-t,r=Math.round(n);return r<=0||0===e?1:r>o?o:r}},{key:"checkMinMax",value:function(t,e){var n=0,o=Math.round(t),r=Math.round(e);o===r&&(r+=1),o>=r&&(n=o,o=r,r=n),this.min=o,this.max=r}},{key:"checkRangeMinMax",value:function(t,e){var n=0;t>=e&&(n=t,t=e,e=n),t<=this.min&&(t=this.min),e>=this.max&&(e=this.max),this.valueFrom=this.checkValue(t),this.valueTo=this.checkValue(e)}}])&&r(a.prototype,c),u&&r(a,u),n}(),c=a,u={min:0,max:100,step:25,valueFrom:50,valueTo:75,orientation:"horizontal",range:!1,fill:!0,labels:!0,tooltips:!0,color:"orange"};function s(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var l=function(){function t(){var e,n,o;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),o=void 0,(n="observers")in(e=this)?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o,this.observers={}}var e,n,o;return e=t,(n=[{key:"emit",value:function(t,e){return!!Array.isArray(this.observers[t])&&(this.observers[t].forEach((function(t){t(e)})),!0)}},{key:"subscribe",value:function(t,e){this.observers[t]=this.observers[t]||[],this.observers[t].push(e)}},{key:"unsubscribe",value:function(t,e){return this.observers[t]=this.observers[t].filter((function(t){return t!==e})),this.observers}}])&&s(e.prototype,n),o&&s(e,o),t}(),f=l;function p(t){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p(t)}function h(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function v(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?h(Object(n),!0).forEach((function(e){O(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function y(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function b(t,e){return b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},b(t,e)}function d(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=w(t);if(e){var r=w(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return m(this,n)}}function m(t,e){return!e||"object"!==p(e)&&"function"!=typeof e?g(t):e}function g(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function w(t){return w=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},w(t)}function O(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var j=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(i,t);var e,n,o,r=d(i);function i(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),O(g(t=r.call(this)),"state",u),O(g(t),"validation",void 0),t.validation=new c,t}return e=i,(n=[{key:"setState",value:function(t){var e=v(v({},this.state),t);this.state=this.validation.checkState(e),this.emit("stateChanged",this.state)}},{key:"getState",value:function(){return this.state}},{key:"getValue",value:function(t){return this.state[t]}},{key:"setValue",value:function(t,e){this.checkStateValue(t,e),this.state=this.validation.checkState(this.state),this.isValue(t)?this.emit("valueChanged",this.state):this.emit("stateChanged",this.state)}},{key:"checkStateValue",value:function(t,e){var n=this.state.range,o="number"==typeof e,r="valueFrom"===t&&o,i="valueTo"===t&&o;"valueFrom"===t&&n&&o?this.state.valueFrom=this.validation.checkMinRange(e):r?this.state.valueFrom=this.validation.checkValue(e):i?this.state.valueTo=this.validation.checkMaxRange(e):this.state[t]=e}},{key:"isValue",value:function(t){return"valueFrom"===t||"valueTo"===t}}])&&y(e.prototype,n),o&&y(e,o),i}(f);function _(t){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_(t)}function P(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function k(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function S(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function E(t,e){return E=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},E(t,e)}function T(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=L(t);if(e){var r=L(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return R(this,n)}}function R(t,e){return!e||"object"!==_(e)&&"function"!=typeof e?x(t):e}function x(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function L(t){return L=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},L(t)}function D(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var C=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&E(t,e)}(i,t);var e,n,o,r=T(i);function i(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;return k(this,i),D(x(t=r.call(this)),"state",void 0),D(x(t),"root",void 0),t.root=n,t.state=e,t}return e=i,n=[{key:"update",value:function(t){this.state=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?P(Object(n),!0).forEach((function(e){D(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},t)}},{key:"getCoords",value:function(t){var e=t.getBoundingClientRect().left,n=t.getBoundingClientRect().top,o=t.getBoundingClientRect().right,r=t.getBoundingClientRect().bottom;return{left:e+window.pageXOffset,bottom:r+window.pageYOffset,width:o-e,height:r-n}}},{key:"getPageCoords",value:function(t){return{pageX:t.pageX,pageY:t.pageY}}},{key:"getPosition",value:function(t,e,n){var o="horizontal"===t,r=n.pageX,i=void 0===r?0:r,a=n.pageY,c=void 0===a?0:a,u=e.left,s=void 0===u?0:u,l=e.bottom,f=void 0===l?0:l,p=e.width,h=void 0===p?0:p,v=e.height;return o?(i-s)/h*100:(f-c)/(void 0===v?0:v)*100}}],n&&S(e.prototype,n),o&&S(e,o),i}(f),F=C;function M(t){return M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},M(t)}function K(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function V(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function B(t,e){return B=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},B(t,e)}function A(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=H(t);if(e){var r=H(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return z(this,n)}}function z(t,e){return!e||"object"!==M(e)&&"function"!=typeof e?q(t):e}function q(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function H(t){return H=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},H(t)}function N(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Scale=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&B(t,e)}(Scale,t);var n,o,r,i=A(Scale);function Scale(){var t;K(this,Scale);for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return N(q(t=i.call.apply(i,[this].concat(n))),"scaleNode",void 0),t}return n=Scale,(o=[{key:"display",value:function(){this.root.innerHTML="",this.root.insertAdjacentHTML("afterbegin",this.getTemplate()),this.scaleNode=this.root.querySelector('[data-id="scale"]'),this.onPointerDown=this.onPointerDown.bind(this),this.scaleNode&&this.scaleNode.addEventListener("pointerdown",this.onPointerDown)}},{key:"onPointerDown",value:function(t){if(this.isTarget(t)){var n=this.state,o=n.min,r=void 0===o?0:o,i=n.max,a=void 0===i?100:i,c=n.valueFrom,u=void 0===c?0:c,s=n.valueTo,l=void 0===s?0:s,f=n.step,p=void 0===f?1:f,h=n.orientation,v=void 0===h?"horizontal":h,y=n.range,b=void 0!==y&&y,d=this.scaleNode?this.getCoords(this.scaleNode):{},m=this.getPageCoords(t),g=e(r,a,p,this.getPosition(v,d,m));b&&g>=u+(l-u)/2?(this.emit("scale:valueTo",g.toFixed()),this.emit("scale:targetMax",t)):(this.emit("scale:valueFrom",g.toFixed()),this.emit("scale:target",t))}}},{key:"isTarget",value:function(t){if(t.target instanceof HTMLElement)return"scale"===t.target.dataset.id||"fill"===t.target.dataset.id}},{key:"getTemplate",value:function(){var t=this.state.orientation,e=void 0===t?"horizontal":t;return'\n      <div class="slider slider_'.concat(e,'">\n        <div class="slider__scale slider__scale_').concat(e,'" data-id="scale"></div>\n      </div>\n    ')}}])&&V(n.prototype,o),r&&V(n,r),Scale}(F),X=Scale;function Y(t){return Y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Y(t)}function I(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function U(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function G(t,e){return G=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},G(t,e)}function J(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=W(t);if(e){var r=W(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Q(this,n)}}function Q(t,e){return!e||"object"!==Y(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function W(t){return W=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},W(t)}var Z=function(e){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&G(t,e)}(a,e);var n,o,r,i=J(a);function a(){return I(this,a),i.apply(this,arguments)}return n=a,(o=[{key:"display",value:function(){var t=this.root.querySelector('[data-id="scale"]');if(!t)throw new Error("Scale element is not found");if(this.state.fill)return t.insertAdjacentHTML("afterbegin",this.getTemplate())}},{key:"update",value:function(e){var n=this.root.querySelector('[data-id="fill"]'),o=e.orientation,r=void 0===o?"horizontal":o,i=e.range,a=void 0!==i&&i,c=e.valueTo,u=void 0===c?100:c,s=e.valueFrom,l="horizontal"===r,f=l?"width":"height",p=l?"left":"bottom",h=t(e,void 0===s?0:s);if(n&&a){var v=t(e,u);n.style[f]="".concat(v-h,"%"),n.style[p]="".concat(h,"%")}else n&&(n.style[f]="".concat(h,"%"))}},{key:"getTemplate",value:function(){var t=this.state,e=t.color,n=void 0===e?"orange":e,o=t.orientation;return'\n      <div class="slider__fill slider__fill_'.concat(void 0===o?"horizontal":o," slider__fill_").concat(n,' "data-id="fill"></div>\n    ')}}])&&U(n.prototype,o),r&&U(n,r),a}(F),tt=Z;function et(t){return et="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},et(t)}function nt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function ot(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function rt(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function it(t,e){return it=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},it(t,e)}function at(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=st(t);if(e){var r=st(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return ct(this,n)}}function ct(t,e){return!e||"object"!==et(e)&&"function"!=typeof e?ut(t):e}function ut(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function st(t){return st=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},st(t)}function lt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Knob=function(n){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&it(t,e)}(Knob,n);var o,r,i,a=at(Knob);function Knob(){var t;ot(this,Knob);for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return lt(ut(t=a.call.apply(a,[this].concat(n))),"scale",void 0),lt(ut(t),"knob",void 0),t}return o=Knob,r=[{key:"display",value:function(){if(this.scale=this.root.querySelector('[data-id="scale"]'),!this.scale)throw new Error("Scale element is not found");this.scale.insertAdjacentHTML("beforeend",this.getTemplate()),this.knob=this.root.querySelector('[data-id="knob"]'),this.addEventListeners()}},{key:"update",value:function(e){this.state=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?nt(Object(n),!0).forEach((function(e){lt(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):nt(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},e);var n=this.state.orientation;if(this.knob){var o="horizontal"===n?"left":"bottom",r=e.valueFrom,i=void 0===r?0:r;this.knob.style[o]="".concat(t(e,i),"%")}}},{key:"onPointerDown",value:function(t){var n=this,o=this.state,r=o.min,i=void 0===r?0:r,a=o.max,c=void 0===a?100:a,u=o.step,s=void 0===u?1:u,l=o.orientation,f=void 0===l?"horizontal":l;document.onpointermove=function(t){t.preventDefault(),n.knob&&(n.knob.ondragstart=function(){return!1},n.knob.style.zIndex="1");var o=n.scale?n.getCoords(n.scale):{},r=n.getPageCoords(t),a=n.getPosition(f,o,r),u=e(i,c,s,a);n.emit("changeValue",u.toFixed())},document.onpointerup=function(){document.onpointermove=null,document.onpointerup=null}}},{key:"onKeyDown",value:function(t){var e=this.state,n=e.valueFrom,o=void 0===n?0:n,r=e.step,i=void 0===r?1:r,a=t.code;if("ArrowRight"===a||"ArrowUp"===a){var c=o+i;this.emit("changeValue",c)}if("ArrowLeft"===a||"ArrowDown"===a){var u=o-i;this.emit("changeValue",u)}}},{key:"addEventListeners",value:function(){this.onPointerDown=this.onPointerDown.bind(this),this.onKeyDown=this.onKeyDown.bind(this),this.knob&&(this.knob.addEventListener("pointerdown",this.onPointerDown),this.knob.addEventListener("keydown",this.onKeyDown))}},{key:"getTemplate",value:function(){var t=this.state,e=t.orientation,n=void 0===e?"horizontal":e,o=t.color,r=void 0===o?"orange":o;return'\n      <div class="slider__knob slider__knob_'.concat(n," slider__knob_").concat(r,'" \n        data-id="knob" role="slider" tabindex="0"></div>\n    ')}}],r&&rt(o.prototype,r),i&&rt(o,i),Knob}(F),ft=Knob;function pt(t){return pt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},pt(t)}function ht(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function vt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function yt(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function bt(t,e){return bt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},bt(t,e)}function dt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=wt(t);if(e){var r=wt(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return mt(this,n)}}function mt(t,e){return!e||"object"!==pt(e)&&"function"!=typeof e?gt(t):e}function gt(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function wt(t){return wt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},wt(t)}function Ot(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var SecondKnob=function(n){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&bt(t,e)}(SecondKnob,n);var o,r,i,a=dt(SecondKnob);function SecondKnob(){var t;vt(this,SecondKnob);for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return Ot(gt(t=a.call.apply(a,[this].concat(n))),"scale",void 0),Ot(gt(t),"secondKnob",void 0),Ot(gt(t),"knob",void 0),t}return o=SecondKnob,r=[{key:"display",value:function(){if(this.scale=this.root.querySelector('[data-id="scale"]'),!this.scale)throw new Error("Scale element is not found");this.scale.insertAdjacentHTML("beforeend",this.getTemplate()),this.knob=this.root.querySelector('[data-id="knob"]'),this.secondKnob=this.root.querySelector('[data-knob="second"]'),this.addEventListeners()}},{key:"update",value:function(e){this.state=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?ht(Object(n),!0).forEach((function(e){Ot(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ht(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},e);var n=this.state.orientation,o=void 0===n?"horizontal":n;if(this.secondKnob){var r="horizontal"===o?"left":"bottom",i=e.valueTo,a=void 0===i?0:i;this.secondKnob.style[r]="".concat(t(e,a),"%")}}},{key:"onPointerDown",value:function(t){var n=this,o=this.state,r=o.min,i=void 0===r?0:r,a=o.max,c=void 0===a?100:a,u=o.step,s=void 0===u?1:u,l=o.orientation,f=void 0===l?"horizontal":l;document.onpointermove=function(t){t.preventDefault(),n.secondKnob&&(n.secondKnob.ondragstart=function(){return!1}),n.knob&&(n.knob.style.zIndex="0");var o=n.scale?n.getCoords(n.scale):{},r=n.getPageCoords(t),a=n.getPosition(f,o,r),u=e(i,c,s,a);n.emit("changeValue",u.toFixed())},document.onmouseup=function(){document.onpointermove=null,document.onmouseup=null}}},{key:"onKeyDown",value:function(t){var e=this.state,n=e.valueTo,o=void 0===n?0:n,r=e.step,i=void 0===r?1:r,a=t.code;if("ArrowRight"===a||"ArrowUp"===a){var c=o+i;this.emit("changeValue",c)}if("ArrowLeft"===a||"ArrowDown"===a){var u=o-i;this.emit("changeValue",u)}}},{key:"addEventListeners",value:function(){this.onPointerDown=this.onPointerDown.bind(this),this.onKeyDown=this.onKeyDown.bind(this),this.secondKnob&&(this.secondKnob.addEventListener("pointerdown",this.onPointerDown),this.secondKnob.addEventListener("keydown",this.onKeyDown))}},{key:"getTemplate",value:function(){var t=this.state,e=t.orientation,n=void 0===e?"horizontal":e,o=t.color,r=void 0===o?"orange":o;return'\n      <div class="slider__knob slider__knob_'.concat(n," slider__knob_").concat(r,'" \n      data-knob="second" role="slider" tabindex="0"></div>\n    ')}}],r&&yt(o.prototype,r),i&&yt(o,i),SecondKnob}(F),jt=SecondKnob;function _t(t){return _t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_t(t)}function Pt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function kt(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function St(t,e,n){return e&&kt(t.prototype,e),n&&kt(t,n),t}function Et(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Tt(t,e)}function Tt(t,e){return Tt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},Tt(t,e)}function Rt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Lt(t);if(e){var r=Lt(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return xt(this,n)}}function xt(t,e){return!e||"object"!==_t(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function Lt(t){return Lt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Lt(t)}var Dt=function(t){Et(n,t);var e=Rt(n);function n(){return Pt(this,n),e.apply(this,arguments)}return St(n,[{key:"display",value:function(){var t=this.state.tooltips;if(void 0!==t&&t){var e=this.root.querySelector('[data-id="knob"]');if(!e)throw new Error("Knob element is not found");e.insertAdjacentHTML("afterbegin",this.getTemplate())}}},{key:"update",value:function(t){var e=this.root.querySelector('[data-id="tooltip-value"]');e&&(e.innerText="".concat(t.valueFrom))}},{key:"getTemplate",value:function(){var t=this.state,e=t.orientation,n=void 0===e?"horizontal":e,o=t.color,r=void 0===o?"orange":o,i="vertical"===n?"slider__tooltip_arrow_vertical":"";return'\n      <div class="slider__tooltip slider__tooltip_'.concat(n," slider__tooltip_").concat(r,'">\n        <span class="tooltip__value" data-id="tooltip-value"></span>\n        <div class="slider__tooltip_arrow ').concat(i,'"></div>\n      </div>\n    ')}}]),n}(F),Ct=function(t){Et(n,t);var e=Rt(n);function n(){return Pt(this,n),e.apply(this,arguments)}return St(n,[{key:"display",value:function(){var t=this.state.tooltips;if(void 0!==t&&t){var e=this.root.querySelector('[data-knob="second"]');if(!e)throw new Error("Second knob element is not found");e.insertAdjacentHTML("afterbegin",this.getTemplate())}}},{key:"update",value:function(t){var e=this.root.querySelector('[data-id="tooltip-value-second"]');e&&(e.innerText="".concat(t.valueTo))}},{key:"getTemplate",value:function(){var t=this.state,e=t.orientation,n=void 0===e?"horizontal":e,o=t.color,r=void 0===o?"orange":o,i="vertical"===n?"slider__tooltip_arrow_vertical":"";return'\n      <div class="slider__tooltip slider__tooltip_'.concat(n," slider__tooltip_").concat(r,'" data-tooltip="second">\n        <span class="tooltip__value" data-id="tooltip-value-second"></span>\n        <div class="slider__tooltip_arrow ').concat(i,'"></div>\n      </div>\n    ')}}]),n}(F);function Ft(t){return Ft="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ft(t)}function Mt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Kt(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function Vt(t,e){return Vt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},Vt(t,e)}function Bt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=zt(t);if(e){var r=zt(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return At(this,n)}}function At(t,e){return!e||"object"!==Ft(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function zt(t){return zt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},zt(t)}var Labels=function(n){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Vt(t,e)}(Labels,n);var o,r,i,a=Bt(Labels);function Labels(){return Mt(this,Labels),a.apply(this,arguments)}return o=Labels,r=[{key:"display",value:function(){var t=this.root.querySelector('[data-id="scale"]');if(!t)throw new Error("Scale element is not found");if(this.state.labels){t.insertAdjacentHTML("beforeend",this.getTemplate());var e=this.root.querySelector('[data-id="labels"]');this.onPointerDown=this.onPointerDown.bind(this),e&&e.addEventListener("pointerdown",this.onPointerDown)}}},{key:"onPointerDown",value:function(t){if(t.target instanceof HTMLElement){var n=this.state,o=n.min,r=n.max,i=void 0===r?0:r,a=n.step,c=void 0===a?1:a,u=n.valueFrom,s=void 0===u?0:u,l=n.valueTo,f=void 0===l?0:l,p=n.range,h=void 0!==p&&p,v=Number(t.target.dataset.value),y=e(o,i,c,v);100===v&&(y=i),h&&y>=s+(f-s)/2?this.emit("labels:valueTo",y):this.emit("labels:valueFrom",y)}}},{key:"getTemplate",value:function(){var t=this.state.orientation;return'\n      <div class="slider__labels slider__labels_'.concat(void 0===t?"horizontal":t,'" data-id="labels">\n        ').concat(this.getLabels(),"\n      </div>\n    ")}},{key:"getLabels",value:function(){var t=this,n=this.state,o=n.min,r=void 0===o?0:o,i=n.max,a=void 0===i?0:i,c=n.step,u=void 0===c?1:c,s=[],l=[20,40,60,80];return(l=l.map((function(t){return e(r,a,u,t)})).concat(r,a).sort((function(t,e){return t-e}))).forEach((function(e){s.push(t.createLabel(e))})),s.join("")}},{key:"createLabel",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=this.state.orientation,o="horizontal"===n?"left":"bottom",r=t(this.state,e).toFixed(2),i='\n      <div class="slider__labels-item" \n      style="'.concat(o,": ").concat(r,'%;"\n      data-value=').concat(r,">\n        ").concat(e,"\n      </div>\n    ");return i}}],r&&Kt(o.prototype,r),i&&Kt(o,i),Labels}(F),qt=Labels;function Ht(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Nt(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function $t(t,e,n){return e&&Nt(t.prototype,e),n&&Nt(t,n),t}var Xt,Yt,It,Ut=function(){function t(){Ht(this,t)}return $t(t,[{key:"createComponents",value:function(t,e){var n=[];return[X,tt,ft,qt,Dt].forEach((function(o){var r=new o(t,e);n.push(r)})),n}}]),t}(),Gt=function(){function t(){Ht(this,t)}return $t(t,[{key:"createComponents",value:function(t,e){var n=[];return[X,tt,ft,jt,Dt,Ct,qt].forEach((function(o){var r=new o(t,e);n.push(r)})),n}}]),t}(),Jt=function(){function t(){Ht(this,t)}return $t(t,[{key:"create",value:function(e){var n="range"===e?"range":"simple";return new(0,t.list[n])}}]),t}();function Qt(t){return Qt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Qt(t)}function Wt(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function Zt(t,e){return Zt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},Zt(t,e)}function te(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=oe(t);if(e){var r=oe(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return ee(this,n)}}function ee(t,e){return!e||"object"!==Qt(e)&&"function"!=typeof e?ne(t):e}function ne(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function oe(t){return oe=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},oe(t)}function re(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}It={simple:Ut,range:Gt},(Yt="list")in(Xt=Jt)?Object.defineProperty(Xt,Yt,{value:It,enumerable:!0,configurable:!0,writable:!0}):Xt[Yt]=It;var ie=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Zt(t,e)}(i,t);var e,n,o,r=te(i);function i(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),re(ne(e=r.call(this)),"componentList",void 0),re(ne(e),"root",void 0),re(ne(e),"type",void 0),re(ne(e),"components",void 0),e.root=t,e}return e=i,(n=[{key:"init",value:function(t){if(!t)throw new Error("options were not passed");this.components=[],this.type=t.range?"range":"simple";var e=(new Jt).create(this.type);this.components=e.createComponents(t,this.root),this.displaySlider(),this.createComponentList(),this.bindEvents()}},{key:"update",value:function(t){this.components.forEach((function(e){e&&e.update(t)}))}},{key:"displaySlider",value:function(){this.components.forEach((function(t){t&&t.display()}))}},{key:"bindEvents",value:function(){this.bindScaleEvents(),this.bindKnobsEvents(),this.bindLabelsEvents()}},{key:"createComponentList",value:function(){var t=this;this.componentList={},this.components.forEach((function(e){e&&(t.componentList[e.constructor.name]=e)}))}},{key:"bindScaleEvents",value:function(){var t=this;this.componentList.Scale&&(this.componentList.Scale.subscribe("scale:valueFrom",(function(e){return t.emit("valueFromChanged",e)})),this.componentList.Scale.subscribe("scale:valueTo",(function(e){return t.emit("valueToChanged",e)})),this.componentList.Scale.subscribe("scale:target",(function(e){t.componentList.Knob&&t.componentList.Knob.onPointerDown(e)})),this.componentList.Scale.subscribe("scale:targetMax",(function(e){t.componentList.SecondKnob&&t.componentList.SecondKnob.onPointerDown(e)})))}},{key:"bindKnobsEvents",value:function(){var t=this;this.componentList.Knob&&this.componentList.Knob.subscribe("changeValue",(function(e){return t.emit("valueFromChanged",e)})),"range"===this.type&&this.componentList.SecondKnob&&this.componentList.SecondKnob.subscribe("changeValue",(function(e){return t.emit("valueToChanged",e)}))}},{key:"bindLabelsEvents",value:function(){var t=this;this.componentList.Labels&&(this.componentList.Labels.subscribe("labels:valueFrom",(function(e){return t.emit("valueFromChanged",e)})),this.componentList.Labels.subscribe("labels:valueTo",(function(e){return t.emit("valueToChanged",e)})))}}])&&Wt(e.prototype,n),o&&Wt(e,o),i}(f);function ae(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function ce(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var ue=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),ce(this,"model",void 0),ce(this,"view",void 0),ce(this,"root",void 0),this.root=e,this.model=new j,this.view=new ie(e),this.init()}var e,n,o;return e=t,(n=[{key:"init",value:function(){this.view.init(this.model.state),this.view.update(this.model.state),this.bindModelEvents(),this.bindViewEvents()}},{key:"bindModelEvents",value:function(){var t=this;this.model.subscribe("stateChanged",(function(e){e instanceof Object&&(t.view.init(e),t.view.update(e)),t.customEvent()})),this.model.subscribe("valueChanged",(function(e){e instanceof Object&&t.view.update(e),t.customEvent()}))}},{key:"bindViewEvents",value:function(){var t=this;this.view.subscribe("valueFromChanged",(function(e){t.model.setValue("valueFrom",Number(e))})),this.view.subscribe("valueToChanged",(function(e){t.model.setValue("valueTo",Number(e))}))}},{key:"customEvent",value:function(){this.root.dispatchEvent(new CustomEvent("onChange",{detail:this.model.state}))}}])&&ae(e.prototype,n),o&&ae(e,o),t}();function se(t){return se="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},se(t)}var le={init:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.each((function(){($(this).data().sliderPlugin=new ue(this),t)&&$(this).data("sliderPlugin").model.setState(t)}))},getState:function(){return $(this).data("sliderPlugin").model.getState()},setValue:function(t,e){$(this).data("sliderPlugin").model.setValue("".concat(t),e)},onChange:function(t){$(this).on("onChange",(function(e){return t(e)}))}};$.fn.sliderPlugin=function(t){if(le[t]){for(var e=arguments.length,n=new Array(e>1?e-1:0),o=1;o<e;o++)n[o-1]=arguments[o];return le[t].apply(this,n)}if("object"===se(t)||!t){var r=t||{};return le.init.call(this,r)}$.error("Метод с именем ".concat(t," не существует"))}}();