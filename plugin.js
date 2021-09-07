!function(){"use strict";function t(t,e){var n=t.min,o=void 0===n?0:n,r=t.max,i=void 0===r?0:r,a=t.step,c=void 0===a?1:a,u=(e-o)/c*(100/((i-o)/c));return u>100?100:u<0?0:u}function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=(e-t)/n,i=100/r,a=Math.round(o/i)*n,c=a+t;return c}function n(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function o(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?n(Object(o),!0).forEach((function(e){i(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function r(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var a=function(){function n(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),i(this,"min",void 0),i(this,"max",void 0),i(this,"step",void 0),i(this,"valueFrom",void 0),i(this,"valueTo",void 0)}var a,c,u;return a=n,(c=[{key:"checkState",value:function(t){return this.min=t.min||0,this.max=t.max||0,this.step=t.step||1,this.valueFrom=t.valueFrom||0,this.valueTo=t.valueTo||0,this.checkMinMax(this.min,this.max),this.step=this.checkStep(this.max,this.step),t.range&&(this.checkMinRange(this.valueFrom),this.checkMaxRange(this.valueTo),this.checkRangeMinMax(this.valueFrom,this.valueTo)),o(o({},t),{},{min:this.min,max:this.max,step:this.step,valueFrom:this.checkValue(this.valueFrom),valueTo:this.valueTo})}},{key:"checkValue",value:function(n){var o=t({min:this.min,max:this.max,step:this.step},n),r=e(this.min,this.max,this.step,o);return o>=100&&r!==this.max||r>this.max?this.max:r}},{key:"checkMinRange",value:function(t){return t>=this.valueTo&&(t=this.valueTo),this.checkValue(t)}},{key:"checkMaxRange",value:function(t){return t<=this.valueFrom&&(t=this.valueFrom),this.checkValue(t)}},{key:"checkStep",value:function(t,e){return e<=0?1:e>t?t:e}},{key:"checkMinMax",value:function(t,e){var n=0;t>=e&&(n=t,t=e,e=n),this.min=t,this.max=e}},{key:"checkRangeMinMax",value:function(t,e){var n=0;t>=e&&(n=t,t=e,e=n),t<=this.min&&(t=this.min),e>=this.max&&(e=this.max),this.valueFrom=this.checkValue(t),this.valueTo=this.checkValue(e)}}])&&r(a.prototype,c),u&&r(a,u),n}(),c={min:0,max:100,step:25,valueFrom:50,valueTo:75,orientation:"horizontal",range:!1,fill:!0,labels:!0,tooltips:!0,color:"orange"};function u(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var s=function(){function t(){var e,n,o;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),o=void 0,(n="observers")in(e=this)?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o,this.observers={}}var e,n,o;return e=t,(n=[{key:"emit",value:function(t,e){return!!Array.isArray(this.observers[t])&&(this.observers[t].forEach((function(t){t(e)})),!0)}},{key:"subscribe",value:function(t,e){this.observers[t]=this.observers[t]||[],this.observers[t].push(e)}},{key:"unsubscribe",value:function(t,e){return this.observers[t]=this.observers[t].filter((function(t){return t!==e})),this.observers}}])&&u(e.prototype,n),o&&u(e,o),t}();function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function p(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(Object(n),!0).forEach((function(e){g(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function h(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function v(t,e){return(v=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=m(t);if(e){var r=m(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return b(this,n)}}function b(t,e){return!e||"object"!==l(e)&&"function"!=typeof e?d(t):e}function d(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function m(t){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function g(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var w=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&v(t,e)}(i,t);var e,n,o,r=y(i);function i(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),g(d(t=r.call(this)),"state",c),g(d(t),"validation",void 0),t.validation=new a,t}return e=i,(n=[{key:"setState",value:function(t){var e=p(p({},this.state),t);this.state=this.validation.checkState(e),this.emit("stateChanged",this.state)}},{key:"getState",value:function(){return this.state}},{key:"getValue",value:function(t){return this.state[t]}},{key:"setValue",value:function(t,e){this.checkStateValue(t,e),this.state=this.validation.checkState(this.state),this.isValue(t)?this.emit("valueChanged",this.state):this.emit("stateChanged",this.state)}},{key:"checkStateValue",value:function(t,e){var n=this.state.range,o="number"==typeof e,r="valueFrom"===t&&o,i="valueTo"===t&&o;"valueFrom"===t&&n&&o?this.state.valueFrom=this.validation.checkMinRange(e):r?this.state.valueFrom=this.validation.checkValue(e):i?this.state.valueTo=this.validation.checkMaxRange(e):this.state[t]=e}},{key:"isValue",value:function(t){return"valueFrom"===t||"valueTo"===t}}])&&h(e.prototype,n),o&&h(e,o),i}(s);function O(t){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function j(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function _(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function P(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function k(t,e){return(k=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function S(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=R(t);if(e){var r=R(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return E(this,n)}}function E(t,e){return!e||"object"!==O(e)&&"function"!=typeof e?T(t):e}function T(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function R(t){return(R=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function x(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var L=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&k(t,e)}(i,t);var e,n,o,r=S(i);function i(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;return _(this,i),x(T(t=r.call(this)),"state",void 0),x(T(t),"root",void 0),t.root=n,t.state=e,t}return e=i,(n=[{key:"update",value:function(t){this.state=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?j(Object(n),!0).forEach((function(e){x(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},t)}},{key:"getCoords",value:function(t){var e=t.getBoundingClientRect().left,n=t.getBoundingClientRect().top,o=t.getBoundingClientRect().right,r=t.getBoundingClientRect().bottom;return{left:e+window.pageXOffset,bottom:r+window.pageYOffset,width:o-e,height:r-n}}},{key:"getPageCoords",value:function(t){return{pageX:t.pageX,pageY:t.pageY}}},{key:"getPosition",value:function(t,e,n){var o="horizontal"===t,r=n.pageX,i=void 0===r?0:r,a=n.pageY,c=void 0===a?0:a,u=e.left,s=void 0===u?0:u,l=e.bottom,f=void 0===l?0:l,p=e.width,h=void 0===p?0:p,v=e.height;return o?(i-s)/h*100:(f-c)/(void 0===v?0:v)*100}}])&&P(e.prototype,n),o&&P(e,o),i}(s);function D(t){return(D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function C(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function F(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function M(t,e){return(M=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function K(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=A(t);if(e){var r=A(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return V(this,n)}}function V(t,e){return!e||"object"!==D(e)&&"function"!=typeof e?B(t):e}function B(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function A(t){return(A=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function z(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var q=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&M(t,e)}(Scale,t);var n,o,r,i=K(Scale);function Scale(){var t;C(this,Scale);for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return z(B(t=i.call.apply(i,[this].concat(n))),"scaleNode",void 0),t}return n=Scale,(o=[{key:"display",value:function(){this.root.innerHTML="",this.root.insertAdjacentHTML("afterbegin",this.getTemplate()),this.scaleNode=this.root.querySelector('[data-id="scale"]'),this.onPointerDown=this.onPointerDown.bind(this),this.scaleNode&&this.scaleNode.addEventListener("pointerdown",this.onPointerDown)}},{key:"onPointerDown",value:function(t){if(this.isTarget(t)){var n=this.state,o=n.min,r=void 0===o?0:o,i=n.max,a=void 0===i?100:i,c=n.valueFrom,u=void 0===c?0:c,s=n.valueTo,l=void 0===s?0:s,f=n.step,p=void 0===f?1:f,h=n.orientation,v=void 0===h?"horizontal":h,y=n.range,b=void 0!==y&&y,d=this.scaleNode?this.getCoords(this.scaleNode):{},m=this.getPageCoords(t),g=e(r,a,p,this.getPosition(v,d,m));b&&g>=u+(l-u)/2?(this.emit("scale:valueTo",g.toFixed()),this.emit("scale:targetMax",t)):(this.emit("scale:valueFrom",g.toFixed()),this.emit("scale:target",t))}}},{key:"isTarget",value:function(t){if(t.target instanceof HTMLElement)return"scale"===t.target.dataset.id||"fill"===t.target.dataset.id}},{key:"getTemplate",value:function(){var t=this.state.orientation,e=void 0===t?"horizontal":t;return'\n      <div class="slider slider_'.concat(e,'">\n        <div class="slider__scale slider__scale_').concat(e,'" data-id="scale"></div>\n      </div>\n    ')}}])&&F(n.prototype,o),r&&F(n,r),Scale}(L);function H(t){return(H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function N(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function X(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function Y(t,e){return(Y=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function U(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=I(t);if(e){var r=I(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return G(this,n)}}function G(t,e){return!e||"object"!==H(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function I(t){return(I=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var J=function(e){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Y(t,e)}(a,e);var n,o,r,i=U(a);function a(){return N(this,a),i.apply(this,arguments)}return n=a,(o=[{key:"display",value:function(){var t=this.root.querySelector('[data-id="scale"]');if(!t)throw new Error("Scale element is not found");if(this.state.fill)return t.insertAdjacentHTML("afterbegin",this.getTemplate())}},{key:"update",value:function(e){var n=this.root.querySelector('[data-id="fill"]'),o=e.orientation,r=void 0===o?"horizontal":o,i=e.range,a=void 0!==i&&i,c=e.valueTo,u=void 0===c?100:c,s=e.valueFrom,l="horizontal"===r,f=l?"width":"height",p=l?"left":"bottom",h=t(e,void 0===s?0:s);if(n&&a){var v=t(e,u);n.style[f]="".concat(v-h,"%"),n.style[p]="".concat(h,"%")}else n&&(n.style[f]="".concat(h,"%"))}},{key:"getTemplate",value:function(){var t=this.state,e=t.color,n=void 0===e?"orange":e,o=t.orientation;return'\n      <div class="slider__fill slider__fill_'.concat(void 0===o?"horizontal":o," slider__fill_").concat(n,' "data-id="fill"></div>\n    ')}}])&&X(n.prototype,o),r&&X(n,r),a}(L);function Q(t){return(Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function W(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function Z(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function tt(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function et(t,e){return(et=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function nt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=it(t);if(e){var r=it(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return ot(this,n)}}function ot(t,e){return!e||"object"!==Q(e)&&"function"!=typeof e?rt(t):e}function rt(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function it(t){return(it=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function at(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var ct=function(n){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&et(t,e)}(Knob,n);var o,r,i,a=nt(Knob);function Knob(){var t;Z(this,Knob);for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return at(rt(t=a.call.apply(a,[this].concat(n))),"scale",void 0),at(rt(t),"knob",void 0),t}return o=Knob,(r=[{key:"display",value:function(){if(this.scale=this.root.querySelector('[data-id="scale"]'),!this.scale)throw new Error("Scale element is not found");this.scale.insertAdjacentHTML("beforeend",this.getTemplate()),this.knob=this.root.querySelector('[data-id="knob"]'),this.addEventListeners()}},{key:"update",value:function(e){this.state=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?W(Object(n),!0).forEach((function(e){at(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):W(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},e);var n=this.state.orientation;if(this.knob){var o="horizontal"===n?"left":"bottom",r=e.valueFrom,i=void 0===r?0:r;this.knob.style[o]="".concat(t(e,i),"%")}}},{key:"onPointerDown",value:function(t){var n=this,o=this.state,r=o.min,i=void 0===r?0:r,a=o.max,c=void 0===a?100:a,u=o.step,s=void 0===u?1:u,l=o.orientation,f=void 0===l?"horizontal":l;document.onpointermove=function(t){t.preventDefault(),n.knob&&(n.knob.ondragstart=function(){return!1});var o=n.scale?n.getCoords(n.scale):{},r=n.getPageCoords(t),a=n.getPosition(f,o,r),u=e(i,c,s,a);n.emit("changeValue",u.toFixed())},document.onpointerup=function(){document.onpointermove=null,document.onpointerup=null}}},{key:"onKeyDown",value:function(t){var e=this.state,n=e.valueFrom,o=void 0===n?0:n,r=e.step,i=void 0===r?1:r,a=t.code;if("ArrowRight"===a||"ArrowUp"===a){var c=o+i;this.emit("changeValue",c)}if("ArrowLeft"===a||"ArrowDown"===a){var u=o-i;this.emit("changeValue",u)}}},{key:"addEventListeners",value:function(){this.onPointerDown=this.onPointerDown.bind(this),this.onKeyDown=this.onKeyDown.bind(this),this.knob&&(this.knob.addEventListener("pointerdown",this.onPointerDown),this.knob.addEventListener("keydown",this.onKeyDown))}},{key:"getTemplate",value:function(){var t=this.state,e=t.orientation,n=void 0===e?"horizontal":e,o=t.color,r=void 0===o?"orange":o;return'\n      <div class="slider__knob slider__knob_'.concat(n," slider__knob_").concat(r,'" \n        data-id="knob" role="slider" tabindex="0"></div>\n    ')}}])&&tt(o.prototype,r),i&&tt(o,i),Knob}(L);function ut(t){return(ut="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function st(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function lt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ft(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function pt(t,e){return(pt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function ht(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=bt(t);if(e){var r=bt(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return vt(this,n)}}function vt(t,e){return!e||"object"!==ut(e)&&"function"!=typeof e?yt(t):e}function yt(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function bt(t){return(bt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function dt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var mt=function(n){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&pt(t,e)}(SecondKnob,n);var o,r,i,a=ht(SecondKnob);function SecondKnob(){var t;lt(this,SecondKnob);for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return dt(yt(t=a.call.apply(a,[this].concat(n))),"scale",void 0),dt(yt(t),"secondKnob",void 0),t}return o=SecondKnob,(r=[{key:"display",value:function(){if(this.scale=this.root.querySelector('[data-id="scale"]'),!this.scale)throw new Error("Scale element is not found");this.scale.insertAdjacentHTML("beforeend",this.getTemplate()),this.secondKnob=this.root.querySelector('[data-knob="second"]'),this.addEventListeners()}},{key:"update",value:function(e){this.state=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?st(Object(n),!0).forEach((function(e){dt(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):st(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},e);var n=this.state.orientation,o=void 0===n?"horizontal":n;if(this.secondKnob){var r="horizontal"===o?"left":"bottom",i=e.valueTo,a=void 0===i?0:i;this.secondKnob.style[r]="".concat(t(e,a),"%")}}},{key:"onPointerDown",value:function(t){var n=this,o=this.state,r=o.min,i=void 0===r?0:r,a=o.max,c=void 0===a?100:a,u=o.step,s=void 0===u?1:u,l=o.orientation,f=void 0===l?"horizontal":l;document.onpointermove=function(t){t.preventDefault(),n.secondKnob&&(n.secondKnob.ondragstart=function(){return!1});var o=n.scale?n.getCoords(n.scale):{},r=n.getPageCoords(t),a=n.getPosition(f,o,r),u=e(i,c,s,a);n.emit("changeValue",u.toFixed())},document.onmouseup=function(){document.onpointermove=null,document.onmouseup=null}}},{key:"onKeyDown",value:function(t){var e=this.state,n=e.valueTo,o=void 0===n?0:n,r=e.step,i=void 0===r?1:r,a=t.code;if("ArrowRight"===a||"ArrowUp"===a){var c=o+i;this.emit("changeValue",c)}if("ArrowLeft"===a||"ArrowDown"===a){var u=o-i;this.emit("changeValue",u)}}},{key:"addEventListeners",value:function(){this.onPointerDown=this.onPointerDown.bind(this),this.onKeyDown=this.onKeyDown.bind(this),this.secondKnob&&(this.secondKnob.addEventListener("pointerdown",this.onPointerDown),this.secondKnob.addEventListener("keydown",this.onKeyDown))}},{key:"getTemplate",value:function(){var t=this.state,e=t.orientation,n=void 0===e?"horizontal":e,o=t.color,r=void 0===o?"orange":o;return'\n      <div class="slider__knob slider__knob_'.concat(n," slider__knob_").concat(r,'" \n      data-knob="second" role="slider" tabindex="0"></div>\n    ')}}])&&ft(o.prototype,r),i&&ft(o,i),SecondKnob}(L);function gt(t){return(gt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function wt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Ot(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function jt(t,e,n){return e&&Ot(t.prototype,e),n&&Ot(t,n),t}function _t(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Pt(t,e)}function Pt(t,e){return(Pt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function kt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Et(t);if(e){var r=Et(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return St(this,n)}}function St(t,e){return!e||"object"!==gt(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function Et(t){return(Et=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var Tt=function(t){_t(n,t);var e=kt(n);function n(){return wt(this,n),e.apply(this,arguments)}return jt(n,[{key:"display",value:function(){var t=this.state.tooltips;if(void 0!==t&&t){var e=this.root.querySelector('[data-id="knob"]');if(!e)throw new Error("Knob element is not found");e.insertAdjacentHTML("afterbegin",this.getTemplate())}}},{key:"update",value:function(t){var e=this.root.querySelector('[data-id="tooltip-value"]');e&&(e.innerText="".concat(t.valueFrom))}},{key:"getTemplate",value:function(){var t=this.state,e=t.orientation,n=void 0===e?"horizontal":e,o=t.color,r=void 0===o?"orange":o,i="vertical"===n?"slider__tooltip_arrow_vertical":"";return'\n      <div class="slider__tooltip slider__tooltip_'.concat(n," slider__tooltip_").concat(r,'">\n        <span class="tooltip__value" data-id="tooltip-value"></span>\n        <div class="slider__tooltip_arrow ').concat(i,'"></div>\n      </div>\n    ')}}]),n}(L),Rt=function(t){_t(n,t);var e=kt(n);function n(){return wt(this,n),e.apply(this,arguments)}return jt(n,[{key:"display",value:function(){var t=this.state.tooltips;if(void 0!==t&&t){var e=this.root.querySelector('[data-knob="second"]');if(!e)throw new Error("Second knob element is not found");e.insertAdjacentHTML("afterbegin",this.getTemplate())}}},{key:"update",value:function(t){var e=this.root.querySelector('[data-id="tooltip-value-second"]');e&&(e.innerText="".concat(t.valueTo))}},{key:"getTemplate",value:function(){var t=this.state,e=t.orientation,n=void 0===e?"horizontal":e,o=t.color,r=void 0===o?"orange":o,i="vertical"===n?"slider__tooltip_arrow_vertical":"";return'\n      <div class="slider__tooltip slider__tooltip_'.concat(n," slider__tooltip_").concat(r,'" data-tooltip="second">\n        <span class="tooltip__value" data-id="tooltip-value-second"></span>\n        <div class="slider__tooltip_arrow ').concat(i,'"></div>\n      </div>\n    ')}}]),n}(L);function xt(t){return(xt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function Lt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Dt(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function Ct(t,e){return(Ct=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function Ft(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Kt(t);if(e){var r=Kt(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Mt(this,n)}}function Mt(t,e){return!e||"object"!==xt(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function Kt(t){return(Kt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var Vt=function(n){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Ct(t,e)}(Labels,n);var o,r,i,a=Ft(Labels);function Labels(){return Lt(this,Labels),a.apply(this,arguments)}return o=Labels,(r=[{key:"display",value:function(){var t=this.root.querySelector('[data-id="scale"]');if(!t)throw new Error("Scale element is not found");if(this.state.labels){t.insertAdjacentHTML("beforeend",this.getTemplate());var e=this.root.querySelector('[data-id="labels"]');this.onPointerDown=this.onPointerDown.bind(this),e&&e.addEventListener("pointerdown",this.onPointerDown)}}},{key:"onPointerDown",value:function(t){if(t.target instanceof HTMLElement){var n=this.state,o=n.min,r=n.max,i=void 0===r?0:r,a=n.step,c=void 0===a?1:a,u=n.valueFrom,s=void 0===u?0:u,l=n.valueTo,f=void 0===l?0:l,p=n.range,h=void 0!==p&&p,v=Number(t.target.dataset.value),y=e(o,i,c,v);100===v&&(y=i),h&&y>=s+(f-s)/2?this.emit("labels:valueTo",y):this.emit("labels:valueFrom",y)}}},{key:"getTemplate",value:function(){var t=this.state.orientation;return'\n      <div class="slider__labels slider__labels_'.concat(void 0===t?"horizontal":t,'" data-id="labels">\n        ').concat(this.getLabels(),"\n      </div>\n    ")}},{key:"getLabels",value:function(){var t=this,n=this.state,o=n.min,r=void 0===o?0:o,i=n.max,a=void 0===i?0:i,c=n.step,u=void 0===c?1:c,s=[],l=[20,40,60,80];return(l=l.map((function(t){return e(r,a,u,t)})).concat(r,a).sort((function(t,e){return t-e}))).forEach((function(e){s.push(t.createLabel(e))})),s.join("")}},{key:"createLabel",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=this.state.orientation,o="horizontal"===n?"left":"bottom",r=t(this.state,e).toFixed(2),i='\n      <div class="slider__labels-item" \n      style="'.concat(o,": ").concat(r,'%;"\n      data-value=').concat(r,">\n        ").concat(e,"\n      </div>\n    ");return i}}])&&Dt(o.prototype,r),i&&Dt(o,i),Labels}(L);function Bt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function At(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function zt(t,e,n){return e&&At(t.prototype,e),n&&At(t,n),t}var qt,Ht,Nt,$t=function(){function t(){Bt(this,t)}return zt(t,[{key:"createComponents",value:function(t,e){var n=[];return[q,J,ct,Vt,Tt].forEach((function(o){var r=new o(t,e);n.push(r)})),n}}]),t}(),Xt=function(){function t(){Bt(this,t)}return zt(t,[{key:"createComponents",value:function(t,e){var n=[];return[q,J,ct,mt,Tt,Rt,Vt].forEach((function(o){var r=new o(t,e);n.push(r)})),n}}]),t}(),Yt=function(){function t(){Bt(this,t)}return zt(t,[{key:"create",value:function(e){var n="range"===e?"range":"simple";return new(0,t.list[n])}}]),t}();function Ut(t){return(Ut="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function Gt(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function It(t,e){return(It=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function Jt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Zt(t);if(e){var r=Zt(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Qt(this,n)}}function Qt(t,e){return!e||"object"!==Ut(e)&&"function"!=typeof e?Wt(t):e}function Wt(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function Zt(t){return(Zt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function te(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Nt={simple:$t,range:Xt},(Ht="list")in(qt=Yt)?Object.defineProperty(qt,Ht,{value:Nt,enumerable:!0,configurable:!0,writable:!0}):qt[Ht]=Nt;var ee=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&It(t,e)}(i,t);var e,n,o,r=Jt(i);function i(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),te(Wt(e=r.call(this)),"componentList",void 0),te(Wt(e),"root",void 0),te(Wt(e),"type",void 0),te(Wt(e),"components",void 0),e.root=t,e}return e=i,(n=[{key:"init",value:function(t){if(!t)throw new Error("options were not passed");this.components=[],this.type=t.range?"range":"simple";var e=(new Yt).create(this.type);this.components=e.createComponents(t,this.root),this.displaySlider(),this.createComponentList(),this.bindEvents()}},{key:"update",value:function(t){this.components.forEach((function(e){e&&e.update(t)}))}},{key:"displaySlider",value:function(){this.components.forEach((function(t){t&&t.display()}))}},{key:"bindEvents",value:function(){this.bindScaleEvents(),this.bindKnobsEvents(),this.bindLabelsEvents()}},{key:"createComponentList",value:function(){var t=this;this.componentList={},this.components.forEach((function(e){e&&(t.componentList[e.constructor.name]=e)}))}},{key:"bindScaleEvents",value:function(){var t=this;this.componentList.Scale&&(this.componentList.Scale.subscribe("scale:valueFrom",(function(e){return t.emit("valueFromChanged",e)})),this.componentList.Scale.subscribe("scale:valueTo",(function(e){return t.emit("valueToChanged",e)})),this.componentList.Scale.subscribe("scale:target",(function(e){t.componentList.Knob&&t.componentList.Knob.onPointerDown(e)})),this.componentList.Scale.subscribe("scale:targetMax",(function(e){t.componentList.SecondKnob&&t.componentList.SecondKnob.onPointerDown(e)})))}},{key:"bindKnobsEvents",value:function(){var t=this;this.componentList.Knob&&this.componentList.Knob.subscribe("changeValue",(function(e){return t.emit("valueFromChanged",e)})),"range"===this.type&&this.componentList.SecondKnob&&this.componentList.SecondKnob.subscribe("changeValue",(function(e){return t.emit("valueToChanged",e)}))}},{key:"bindLabelsEvents",value:function(){var t=this;this.componentList.Labels&&(this.componentList.Labels.subscribe("labels:valueFrom",(function(e){return t.emit("valueFromChanged",e)})),this.componentList.Labels.subscribe("labels:valueTo",(function(e){return t.emit("valueToChanged",e)})))}}])&&Gt(e.prototype,n),o&&Gt(e,o),i}(s);function ne(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function oe(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var re=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),oe(this,"model",void 0),oe(this,"view",void 0),oe(this,"root",void 0),this.root=e,this.model=new w,this.view=new ee(e),this.init()}var e,n,o;return e=t,(n=[{key:"init",value:function(){this.view.init(this.model.state),this.view.update(this.model.state),this.bindModelEvents(),this.bindViewEvents()}},{key:"bindModelEvents",value:function(){var t=this;this.model.subscribe("stateChanged",(function(e){e instanceof Object&&(t.view.init(e),t.view.update(e)),t.customEvent()})),this.model.subscribe("valueChanged",(function(e){e instanceof Object&&t.view.update(e),t.customEvent()}))}},{key:"bindViewEvents",value:function(){var t=this;this.view.subscribe("valueFromChanged",(function(e){t.model.setValue("valueFrom",Number(e))})),this.view.subscribe("valueToChanged",(function(e){t.model.setValue("valueTo",Number(e))}))}},{key:"customEvent",value:function(){this.root.dispatchEvent(new CustomEvent("onChange",{detail:this.model.state}))}}])&&ne(e.prototype,n),o&&ne(e,o),t}();function ie(t){return(ie="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var ae={init:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.each((function(){($(this).data().sliderPlugin=new re(this),t)&&$(this).data("sliderPlugin").model.setState(t)}))},getState:function(){return $(this).data("sliderPlugin").model.getState()},setValue:function(t,e){$(this).data("sliderPlugin").model.setValue("".concat(t),e)},onChange:function(t){$(this).on("onChange",(function(e){return t(e)}))}};$.fn.sliderPlugin=function(t){if(ae[t]){for(var e=arguments.length,n=new Array(e>1?e-1:0),o=1;o<e;o++)n[o-1]=arguments[o];return ae[t].apply(this,n)}if("object"===ie(t)||!t){var r=t||{};return ae.init.call(this,r)}$.error("Метод с именем ".concat(t," не существует"))}}();