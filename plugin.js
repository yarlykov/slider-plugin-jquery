!function(){"use strict";var t,e,n,o,i;!function(t){t.VALUE_CHANGED="VALUE_CHANGED",t.STATE_CHANGED="STATE_CHANGED"}(t||(t={})),function(t){t.VALUE_FROM_CHANGED="VALUE_FROM_CHANGED",t.VALUE_TO_CHANGED="STATE_TO_CHANGED"}(e||(e={})),function(t){t.VALUE_TO="VALUE_TO",t.VALUE_FROM="VALUE_FROM",t.KNOB_VALUE_TO_CHANGED="KNOB_VALUE_TO_CHANGED",t.KNOB_VALUE_FROM_CHANGED="KNOB_VALUE_FROM_CHANGED"}(n||(n={})),function(t){t.SCALE_VALUE_TO_CHANGED="SCALE_VALUE_TO_CHANGED",t.SCALE_VALUE_FROM_CHANGED="SCALE_VALUE_FROM_CHANGED",t.TARGET_TRIGGERED="TARGET_TRIGGERED",t.TARGET_MAX_VALUE_TRIGGERED="TARGET_MAX_VALUE_TRIGGERED"}(o||(o={})),function(t){t.LABELS_VALUE_TO_CHANGED="LABELS_VALUE_TO_CHANGED",t.LABELS_VALUE_FROM_CHANGED="LABELS_VALUE_FROM_CHANGED"}(i||(i={}));var r,s={min:0,max:100,step:25,valueFrom:50,valueTo:75,orientation:"horizontal",range:!1,fill:!0,labels:!0,tooltips:!0,color:"orange"},a=function(t,e,n){if(n||2===arguments.length)for(var o,i=0,r=e.length;i<r;i++)!o&&i in e||(o||(o=Array.prototype.slice.call(e,0,i)),o[i]=e[i]);return t.concat(o||Array.prototype.slice.call(e))},l=function(){function t(){this.observers={}}return t.prototype.emit=function(t,e){var n;null===(n=this.observers[t])||void 0===n||n.forEach((function(t){return t(e)}))},t.prototype.subscribe=function(t,e){var n=this.observers[t]||[];this.observers[t]=a(a([],n,!0),[e],!1)},t}(),c=function(t,e){var n=t.min,o=void 0===n?0:n,i=t.max,r=void 0===i?1:i,s=t.step,a=void 0===s?1:s,l=(e-o)/a*(100/((r-o)/a));return l>100?100:l<0?0:l},u=function(t,e,n,o){void 0===t&&(t=0),void 0===e&&(e=0),void 0===n&&(n=1),void 0===o&&(o=0);var i=100/((e-t)/n);return Math.round(o/i)*n+t},p=function(t){return t[0].toLowerCase()+t.slice(1)},h=function(){return h=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},h.apply(this,arguments)},f=function(){function t(){}return t.prototype.checkState=function(t){return this.min=t.min||0,this.max=t.max||this.min+1,this.step=t.step||1,this.valueFrom=t.valueFrom||0,this.valueTo=t.valueTo||0,this.checkMinMax(this.min,this.max),this.step=this.checkStep(this.min,this.max,this.step),t.range&&(this.checkMinRange(this.valueFrom),this.checkMaxRange(this.valueTo),this.checkRangeMinMax(this.valueFrom,this.valueTo)),h(h({},t),{min:this.min,max:this.max,step:this.step,valueFrom:this.checkValue(this.valueFrom),valueTo:this.valueTo})},t.prototype.checkValue=function(t){var e=c({min:this.min,max:this.max,step:this.step},t),n=u(this.min,this.max,this.step,e);return e>=100&&n!==this.max||n>this.max?this.max:n},t.prototype.checkMinRange=function(t){return t>=this.valueTo&&(t=this.valueTo),this.checkValue(t)},t.prototype.checkMaxRange=function(t){return t<=this.valueFrom&&(t=this.valueFrom),this.checkValue(t)},t.prototype.checkStep=function(t,e,n){var o=e-t,i=Math.round(n);return i<=0||0===e?1:i>o?o:i},t.prototype.checkMinMax=function(t,e){var n=0,o=Math.round(t),i=Math.round(e);o===i&&(i+=1),o>=i&&(n=o,o=i,i=n),this.min=o,this.max=i},t.prototype.checkRangeMinMax=function(t,e){var n=0;t>=e&&(n=t,t=e,e=n),t<=this.min&&(t=this.min),e>=this.max&&(e=this.max),this.valueFrom=this.checkValue(t),this.valueTo=this.checkValue(e)},t}(),d=(r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},r(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),_=function(){return _=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},_.apply(this,arguments)},v=function(e){function n(){var t=e.call(this)||this;return t.state=s,t.validation=new f,t}return d(n,e),n.prototype.setState=function(e){var n=_(_({},this.state),e);this.state=_(_({},n),this.validation.checkState(n)),this.emit(t.STATE_CHANGED,this.state)},n.prototype.getState=function(){return this.state},n.prototype.getValue=function(t){return this.state[t]},n.prototype.setValue=function(e,n){this.checkStateValue(e,n),this.state=_(_({},this.state),this.validation.checkState(this.state)),this.isValue(e)?this.emit(t.VALUE_CHANGED,this.state):this.emit(t.STATE_CHANGED,this.state)},n.prototype.checkStateValue=function(t,e){var n=this.state.range,o="number"==typeof e,i="valueFrom"===t&&o,r="valueTo"===t&&o;"valueFrom"===t&&n&&o?this.state.valueFrom=this.validation.checkMinRange(e):i?this.state.valueFrom=this.validation.checkValue(e):r?this.state.valueTo=this.validation.checkMaxRange(e):this.state[t]=e},n.prototype.isValue=function(t){return"valueFrom"===t||"valueTo"===t},n}(l),y=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),E=function(){return E=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},E.apply(this,arguments)},m=function(t){function e(e,n){var o=t.call(this)||this;return o.root=n,o.state=e,o}return y(e,t),e.prototype.update=function(t,e){this.state=E({},t)},e.prototype.getCoords=function(t){var e=t.getBoundingClientRect().left,n=t.getBoundingClientRect().top,o=t.getBoundingClientRect().right,i=t.getBoundingClientRect().bottom;return{left:e+window.pageXOffset,bottom:i+window.pageYOffset,width:o-e,height:i-n}},e.prototype.getPageCoords=function(t){return{pageX:t.pageX,pageY:t.pageY}},e.prototype.getPosition=function(t,e,n){var o="horizontal"===t,i=n.pageX,r=n.pageY,s=e.left,a=e.bottom,l=e.width,c=e.height;return o?(i-s)/l*100:(a-r)/c*100},e}(l),b=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),A=function(){return A=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},A.apply(this,arguments)},Fill=function(t){function Fill(){return null!==t&&t.apply(this,arguments)||this}return b(Fill,t),Fill.prototype.init=function(){this.fill=this.root.querySelector(".js-slider__fill")},Fill.prototype.update=function(t){var e=A(A({},s),t),n=e.orientation,o=e.range,i=e.valueTo,r=e.valueFrom,a="horizontal"===n,l=a?"width":"height",u=a?"left":"bottom",p=c(t,r);if(this.fill&&o){var h=c(t,i);this.fill.style[l]=h-p+"%",this.fill.style[u]=p+"%"}else this.fill&&(this.fill.style[l]=p+"%")},Fill.getTemplate=function(t,e){return void 0===t&&(t="orange"),void 0===e&&(e="horizontal"),'\n      <div\n        class="slider__fill\n        js-slider__fill\n        slider__fill_'+e+"\n        slider__fill_"+t+'\n        "data-id="fill"\n      ></div>\n    '},Fill}(m),g=Fill,T={left:1,bottom:1,width:1,height:1},O=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),Tooltip=function(t){function Tooltip(){return null!==t&&t.apply(this,arguments)||this}return O(Tooltip,t),Tooltip.prototype.init=function(){if(this.state.tooltips&&!this.root.querySelector(".js-slider__knob"))throw new Error("Knob element is not found")},Tooltip.prototype.update=function(t){var e=this.root.querySelector(".js-tooltip__value-first");e&&(e.innerText=""+t.valueFrom)},Tooltip.getTemplate=function(t,e){return void 0===t&&(t="horizontal"),void 0===e&&(e="orange"),'\n      <div class="slider__tooltip\n        js-slider__tooltip-first\n        slider__tooltip_'+t+"\n        slider__tooltip_"+e+'"\n        data-tooltip="first"\n      >\n        <span class="tooltip__value js-tooltip__value-first" data-id="tooltip-value"></span>\n        <div class="slider__tooltip_arrow '+("vertical"===t?"slider__tooltip_arrow_vertical":"")+'"></div>\n      </div>\n    '},Tooltip}(m),SecondTooltip=function(t){function SecondTooltip(){return null!==t&&t.apply(this,arguments)||this}return O(SecondTooltip,t),SecondTooltip.prototype.init=function(){if(this.state.tooltips&&!this.root.querySelector(".js-slider__second-knob"))throw new Error("Second knob element is not found")},SecondTooltip.prototype.update=function(t){var e=this.root.querySelector(".js-tooltip__value-second"),n=this.root.querySelector(".js-slider__tooltip-first"),o=this.root.querySelector(".js-slider__tooltip-second"),i=this.state.orientation,r=this.getTooltipsCoords(),s=r.firstRight,a=r.firstTop,l=r.secondLeft,c=r.secondBottom;n&&o&&e?"horizontal"===i&&s>=l||"vertical"===i&&c>=a?(n.style.visibility="hidden",e.innerText=t.valueFrom+" – "+t.valueTo,null==o||o.classList.add("slider__tooltip_double")):(n.style.visibility="visible",e.innerText=""+t.valueTo):e&&(e.innerText=""+t.valueTo)},SecondTooltip.prototype.getTooltipsCoords=function(){var t=this.root.querySelector(".js-slider__tooltip-first"),e=this.root.querySelector(".js-slider__tooltip-second");return{firstRight:(null==t?void 0:t.getBoundingClientRect().right)||0,firstTop:(null==t?void 0:t.getBoundingClientRect().top)||0,secondLeft:(null==e?void 0:e.getBoundingClientRect().left)||0,secondBottom:(null==e?void 0:e.getBoundingClientRect().bottom)||0}},SecondTooltip.getTemplate=function(t,e){return void 0===t&&(t="horizontal"),void 0===e&&(e="orange"),'\n      <div class="slider__tooltip\n        js-slider__tooltip-second\n        slider__tooltip_'+t+"\n        slider__tooltip_"+e+'"\n        data-tooltip="second"\n      >\n        <span class="tooltip__value\n          js-tooltip__value-second"\n          data-id="tooltip-value-second"\n        ></span>\n        <div class="slider__tooltip_arrow '+("vertical"===t?"slider__tooltip_arrow_vertical":"")+'"></div>\n      </div>\n    '},SecondTooltip}(m),L=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),w=function(){return w=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},w.apply(this,arguments)},C=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return L(e,t),e.prototype.init=function(){if(this.scale=this.root.querySelector(".js-slider__scale"),!this.scale)throw new Error("Scale element is not found");this.valueFrom=this.root.querySelector(".js-slider__knob"),this.valueTo=this.root.querySelector(".js-slider__second-knob"),this.state.tooltips&&this.addTooltips()},e.prototype.update=function(t,e){this.state=w({},t);var o=e===n.KNOB_VALUE_FROM_CHANGED?"valueFrom":"valueTo",i=this.state.orientation,r=void 0===i?s.orientation:i;if(this[o]){var a="horizontal"===r?"left":"bottom",l=t[o];this[o].style[a]=c(t,Number(l))+"%"}},e.prototype.handleKnobsPointerDown=function(t){var e=this,o=this.state,i=o.min,r=o.max,a=o.step,l=o.orientation,c=void 0===l?s.orientation:l,p=t===n.KNOB_VALUE_FROM_CHANGED?"1":"0",h=function(n){n.preventDefault(),e.valueFrom&&(e.valueFrom.ondragstart=function(){return!1},e.valueFrom.style.zIndex=p),e.valueFrom&&e.valueTo&&(e.valueTo.ondragstart=function(){return!1},e.valueFrom.style.zIndex=p);var o=e.scale?e.getCoords(e.scale):T,s=e.getPageCoords(n),l=e.getPosition(c,o,s),h=u(i,r,a,l);e.emit(t,h.toFixed())},f=function(){document.removeEventListener("pointerup",f),document.removeEventListener("pointermove",h)};document.addEventListener("pointermove",h),document.addEventListener("pointerup",f)},e.prototype.handleKnobsKeyDown=function(t,e){var o=e===n.KNOB_VALUE_FROM_CHANGED?"valueFrom":"valueTo",i=this.state[o],r=this.state.step,a=void 0===r?s.step:r,l=t.code;if("ArrowRight"===l||"ArrowUp"===l){var c=Number(i)+a;this.emit(e,c)}if("ArrowLeft"===l||"ArrowDown"===l){c=Number(i)-a;this.emit(e,c)}},e.prototype.addTooltips=function(){var t,e,n=this.state,o=n.color,i=n.orientation,r=null===(t=this.valueFrom)||void 0===t?void 0:t.querySelector(".js-slider__tooltip-first"),s=null===(e=this.valueTo)||void 0===e?void 0:e.querySelector(".js-slider__tooltip-second");this.valueFrom&&!r&&this.valueFrom.insertAdjacentHTML("afterbegin",Tooltip.getTemplate(i,o)),this.valueTo&&!s&&this.valueTo.insertAdjacentHTML("afterbegin",SecondTooltip.getTemplate(i,o))},e.getTemplate=function(t,e,o){void 0===t&&(t="horizontal"),void 0===e&&(e="orange");var i="knob";return o===n.VALUE_TO&&(i="second-knob"),'\n      <div\n        class="slider__knob\n        js-slider__'+i+"\n        slider__knob_"+t+"\n        slider__knob_"+e+'" \n        role="slider"\n        tabindex="0"\n      ></div>\n    '},e}(m),Knob=function(t){function Knob(){return null!==t&&t.apply(this,arguments)||this}return L(Knob,t),Knob.prototype.init=function(){t.prototype.init.call(this),this.addEventListeners()},Knob.prototype.update=function(e){t.prototype.update.call(this,e,n.KNOB_VALUE_FROM_CHANGED)},Knob.prototype.handleKnobPointerDown=function(){t.prototype.handleKnobsPointerDown.call(this,n.KNOB_VALUE_FROM_CHANGED)},Knob.prototype.handleKnobKeyDown=function(e){t.prototype.handleKnobsKeyDown.call(this,e,n.KNOB_VALUE_FROM_CHANGED)},Knob.prototype.addEventListeners=function(){this.valueFrom&&(this.valueFrom.addEventListener("pointerdown",this.handleKnobPointerDown.bind(this)),this.valueFrom.addEventListener("keydown",this.handleKnobKeyDown.bind(this)))},Knob.getTemplate=function(e,o){return void 0===e&&(e="orange"),void 0===o&&(o="horizontal"),t.getTemplate.call(this,e,o,n.VALUE_FROM)},Knob}(C),SecondKnob=function(t){function SecondKnob(){return null!==t&&t.apply(this,arguments)||this}return L(SecondKnob,t),SecondKnob.prototype.init=function(){t.prototype.init.call(this),this.addEventListeners()},SecondKnob.prototype.update=function(e){t.prototype.update.call(this,e,n.KNOB_VALUE_TO_CHANGED)},SecondKnob.prototype.handleSecondKnobPointerDown=function(){t.prototype.handleKnobsPointerDown.call(this,n.KNOB_VALUE_TO_CHANGED)},SecondKnob.prototype.handleSecondKnobKeyDown=function(e){t.prototype.handleKnobsKeyDown.call(this,e,n.KNOB_VALUE_TO_CHANGED)},SecondKnob.prototype.addEventListeners=function(){this.valueTo&&(this.valueTo.addEventListener("pointerdown",this.handleSecondKnobPointerDown.bind(this)),this.valueTo.addEventListener("keydown",this.handleSecondKnobKeyDown.bind(this)))},SecondKnob.getTemplate=function(e,o){return void 0===e&&(e="horizontal"),void 0===o&&(o="orange"),t.getTemplate.call(this,o,e,n.VALUE_TO)},SecondKnob}(C),D=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),N=function(){return N=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},N.apply(this,arguments)},Labels=function(t){function Labels(){return null!==t&&t.apply(this,arguments)||this}return D(Labels,t),Labels.prototype.init=function(){if(this.state.labels){var t=this.root.querySelector(".js-slider__labels");t&&t.addEventListener("pointerdown",this.handleLabelsPointerDown.bind(this))}},Labels.prototype.handleLabelsPointerDown=function(t){if(t.target instanceof HTMLElement){var e=N(N({},s),this.state),n=e.min,o=e.max,r=e.step,a=e.valueFrom,l=e.valueTo,c=e.range,p=Number(t.target.dataset.value),h=u(n,o,r,p);if(100===p&&(h=o),c)h>=a+(l-a)/2?this.emit(i.LABELS_VALUE_TO_CHANGED,h):this.emit(i.LABELS_VALUE_FROM_CHANGED,h);else this.emit(i.LABELS_VALUE_FROM_CHANGED,h)}},Labels.getTemplate=function(t,e,n,o){return void 0===t&&(t="horizontal"),void 0===e&&(e=0),void 0===n&&(n=0),void 0===o&&(o=1),'\n      <div class="slider__labels\n        js-slider__labels\n        slider__labels_'+t+'"\n        data-id="labels"\n      >\n        '+this.getLabels(t,e,n,o)+"\n      </div>\n    "},Labels.getLabels=function(t,e,n,o){var i=this;void 0===t&&(t="horizontal"),void 0===e&&(e=0),void 0===n&&(n=0),void 0===o&&(o=1);var r=[],s=[20,40,60,80];return(s=s.map((function(t){return u(e,n,o,t)})).concat(e,n).sort((function(t,e){return t-e}))).forEach((function(s){r.push(i.createLabel(t,s,e,n,o))})),r.join("")},Labels.createLabel=function(t,e,n,o,i){void 0===t&&(t="horizontal"),void 0===e&&(e=0),void 0===n&&(n=0),void 0===o&&(o=0),void 0===i&&(i=1);var r="horizontal"===t?"left":"bottom",s=c({min:n,max:o,step:i},e).toFixed(2);return'\n      <div class="slider__labels-item" \n        style="'+r+": "+s+'%;"\n        data-value='+s+">\n        "+e+"\n      </div>\n    "},Labels}(m),G=Labels,V=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),S=function(){return S=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},S.apply(this,arguments)},Scale=function(t){function Scale(){return null!==t&&t.apply(this,arguments)||this}return V(Scale,t),Scale.prototype.init=function(){this.root.innerHTML="",this.root.insertAdjacentHTML("afterbegin",this.getTemplate()),this.scaleNode=this.root.querySelector(".js-slider__scale"),this.addScaleElements()},Scale.prototype.handleScalePointerDown=function(t){if(this.isTarget(t)){var e=S(S({},s),this.state),n=e.min,i=e.max,r=e.valueFrom,a=e.valueTo,l=e.step,c=e.orientation,p=e.range,h=this.scaleNode?this.getCoords(this.scaleNode):T,f=this.getPageCoords(t),d=this.getPosition(c,h,f),_=u(n,i,l,d);if(p)_>=r+(a-r)/2?(this.emit(o.SCALE_VALUE_TO_CHANGED,_.toFixed()),this.emit(o.TARGET_MAX_VALUE_TRIGGERED,t)):(this.emit(o.SCALE_VALUE_FROM_CHANGED,_.toFixed()),this.emit(o.TARGET_TRIGGERED,t));else this.emit(o.SCALE_VALUE_FROM_CHANGED,_.toFixed()),this.emit(o.TARGET_TRIGGERED,t)}},Scale.prototype.addScaleElements=function(){var t=this.state,e=t.color,n=t.orientation,o=t.fill,i=t.range,r=t.labels,s=t.min,a=t.max,l=t.step;this.scaleNode&&(this.scaleNode.addEventListener("pointerdown",this.handleScalePointerDown.bind(this)),this.scaleNode.insertAdjacentHTML("beforeend",Knob.getTemplate(e,n)),o&&this.scaleNode.insertAdjacentHTML("afterbegin",g.getTemplate(e,n)),i&&this.scaleNode.insertAdjacentHTML("beforeend",SecondKnob.getTemplate(e,n)),r&&this.scaleNode.insertAdjacentHTML("beforeend",G.getTemplate(n,s,a,l)))},Scale.prototype.isTarget=function(t){if(t.target instanceof HTMLElement)return"scale"===t.target.dataset.id||"fill"===t.target.dataset.id},Scale.prototype.getTemplate=function(){var t=this.state.orientation;return'\n      <div class="slider slider_'+t+'">\n        <div\n          class="slider__scale\n          js-slider__scale\n          slider__scale_'+t+'"\n          data-id="scale"\n        ></div>\n      </div>\n    '},Scale}(m),j=Scale,R=function(){function t(){}return t.prototype.createComponents=function(t,e){var n={};return[j,g,Knob,G,Tooltip].forEach((function(o){var i=new o(t,e);if(i){var r=p(i.constructor.name);n[r]=i}})),n},t}(),F=function(){function t(){}return t.prototype.createComponents=function(t,e){var n={};return[j,g,Knob,SecondKnob,Tooltip,SecondTooltip,G].forEach((function(o){var i=new o(t,e);if(i){var r=p(i.constructor.name);n[r]=i}})),n},t}(),H=function(){function t(){}return t.create=function(e){var n="range"===e?"range":"simple";return new(0,t.list[n])},t.list={simple:R,range:F},t}(),M=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),U=function(t){function r(e,n){var o=t.call(this)||this;return o.root=e,o.init(n),o}return M(r,t),r.prototype.init=function(t){this.type=t.range?"range":"simple";var e=H.create(this.type);this.components=e.createComponents(t,this.root),this.displaySlider(),this.bindEvents(),this.update(t)},r.prototype.update=function(t){Object.values(this.components).forEach((function(e){e&&e.update(t)}))},r.prototype.displaySlider=function(){Object.values(this.components).forEach((function(t){t&&t.init()}))},r.prototype.bindEvents=function(){this.bindScaleEvents(),this.bindKnobsEvents(),this.bindLabelsEvents()},r.prototype.bindScaleEvents=function(){var t=this;this.components.scale&&(this.components.scale.subscribe(o.SCALE_VALUE_FROM_CHANGED,(function(n){return t.emit(e.VALUE_FROM_CHANGED,n)})),this.components.scale.subscribe(o.SCALE_VALUE_TO_CHANGED,(function(n){return t.emit(e.VALUE_TO_CHANGED,n)})),this.components.scale.subscribe(o.TARGET_TRIGGERED,(function(){t.components.knob&&t.components.knob.handleKnobPointerDown()})),this.components.scale.subscribe(o.TARGET_MAX_VALUE_TRIGGERED,(function(){t.components.secondKnob&&t.components.secondKnob.handleSecondKnobPointerDown()})))},r.prototype.bindKnobsEvents=function(){var t=this;this.components.knob&&this.components.knob.subscribe(n.KNOB_VALUE_FROM_CHANGED,(function(n){return t.emit(e.VALUE_FROM_CHANGED,n)})),"range"===this.type&&this.components.secondKnob&&this.components.secondKnob.subscribe(n.KNOB_VALUE_TO_CHANGED,(function(n){return t.emit(e.VALUE_TO_CHANGED,n)}))},r.prototype.bindLabelsEvents=function(){var t=this;this.components.labels&&(this.components.labels.subscribe(i.LABELS_VALUE_FROM_CHANGED,(function(n){return t.emit(e.VALUE_FROM_CHANGED,n)})),this.components.labels.subscribe(i.LABELS_VALUE_TO_CHANGED,(function(n){return t.emit(e.VALUE_TO_CHANGED,n)})))},r}(l),x=function(){function n(t){this.root=t,this.model=new v,this.view=new U(t,this.model.state),this.bindModelEvents(),this.bindViewEvents()}return n.prototype.bindModelEvents=function(){var e=this;this.model.subscribe(t.STATE_CHANGED,(function(t){e.view.init(t),e.customEvent()})),this.model.subscribe(t.VALUE_CHANGED,(function(t){t instanceof Object&&e.view.update(t),e.customEvent()}))},n.prototype.bindViewEvents=function(){var t=this;this.view.subscribe(e.VALUE_FROM_CHANGED,(function(e){t.model.setValue("valueFrom",Number(e))})),this.view.subscribe(e.VALUE_TO_CHANGED,(function(e){t.model.setValue("valueTo",Number(e))}))},n.prototype.customEvent=function(){this.root.dispatchEvent(new CustomEvent("onChange",{detail:this.model.state}))},n}(),P={init:function(t){return this.each((function(){($(this).data().sliderPlugin=new x(this),t)&&$(this).data("sliderPlugin").model.setState(t)}))},getState:function(){return $(this).data("sliderPlugin").model.getState()},setValue:function(t,e){$(this).data("sliderPlugin").model.setValue(""+t,e)},onChange:function(t){$(this).on("onChange",(function(e){return t(e)}))}};$.fn.sliderPlugin=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];if(P[t])return P[t].apply(this,e);if("object"==typeof t||!t){var o=t||{};return P.init.call(this,o)}$.error("Метод с именем "+t+" не существует")}}();