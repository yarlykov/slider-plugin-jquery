!function(){"use strict";function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function t(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var i=function(){function i(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),t(this,"root",void 0),t(this,"state",{}),t(this,"panel",void 0),t(this,"min",void 0),t(this,"max",void 0),t(this,"valueFrom",void 0),t(this,"step",void 0),t(this,"valueTo",void 0),t(this,"orientation",void 0),t(this,"fill",void 0),t(this,"range",void 0),t(this,"labels",void 0),t(this,"tooltips",void 0),this.root=e}var a,l,s;return a=i,(l=[{key:"init",value:function(){this.findInputElements(),this.pluginSetup(),this.bindEventListeners()}},{key:"findInputElements",value:function(){var e;this.panel=null===(e=this.root.get(0).parentElement)||void 0===e?void 0:e.querySelector('[data-id="control-panel"]'),this.panel&&(this.min=this.panel.querySelector('[data-title="min"]'),this.max=this.panel.querySelector('[data-title="max"]'),this.valueFrom=this.panel.querySelector('[data-title="from"]'),this.step=this.panel.querySelector('[data-title="step"]'),this.valueTo=this.panel.querySelector('[data-title="to"]'),this.orientation=this.panel.querySelector('[data-title="orientation"]'),this.fill=this.panel.querySelector('[data-title="fill"]'),this.range=this.panel.querySelector('[data-title="range"]'),this.labels=this.panel.querySelector('[data-title="labels"]'),this.tooltips=this.panel.querySelector('[data-title="tooltips"]'))}},{key:"pluginSetup",value:function(){this.state=this.root.sliderPlugin("getState"),this.min&&(this.min.value="".concat(this.state.min)),this.max&&(this.max.value="".concat(this.state.max)),this.valueFrom&&(this.valueFrom.value="".concat(this.state.valueFrom)),this.step&&(this.step.value="".concat(this.state.step)),this.state.range&&this.valueTo&&(this.valueTo.disabled=!1,this.valueTo.value="".concat(this.state.valueTo)),this.orientation&&(this.orientation.value="".concat(this.state.orientation)),this.fill&&this.state.fill&&(this.fill.checked=this.state.fill),this.range&&this.state.range&&(this.range.checked=this.state.range),this.labels&&this.state.labels&&(this.labels.checked=this.state.labels),this.tooltips&&this.state.tooltips&&(this.tooltips.checked=this.state.tooltips)}},{key:"bindEventListeners",value:function(){this.root.sliderPlugin("onChange",this.handleOnChangeRoot.bind(this)),this.valueFrom&&(this.valueFrom.addEventListener("change",this.handleValueFromChange.bind(this)),this.valueFrom.addEventListener("keydown",this.handleValueFromKeydown.bind(this))),this.valueTo&&(this.valueTo.addEventListener("change",this.handleValueToChange.bind(this)),this.valueTo.addEventListener("keydown",this.handleValueToKeydown.bind(this))),this.step&&this.step.addEventListener("change",this.handleStepChange.bind(this)),this.min&&this.min.addEventListener("change",this.handleMinChange.bind(this)),this.max&&this.max.addEventListener("change",this.handleMaxChange.bind(this)),this.orientation&&this.orientation.addEventListener("change",this.handleOrientationChange.bind(this)),this.fill&&this.fill.addEventListener("change",this.handleFillChange.bind(this)),this.range&&this.range.addEventListener("change",this.handleRangeChange.bind(this)),this.labels&&this.labels.addEventListener("change",this.handleLabelsChange.bind(this)),this.tooltips&&this.tooltips.addEventListener("change",this.handleTooltipsChange.bind(this))}},{key:"handleOnChangeRoot",value:function(e){this.state=e.detail;var t=e.detail,i=t.valueTo,a=t.valueFrom,l=t.step,s=t.min,n=t.max,o=t.orientation,h=t.fill,r=t.range,u=t.labels,d=t.tooltips;this.state.range&&this.valueTo?(this.valueTo.disabled=!1,this.valueTo.value=i):this.valueTo&&(this.valueTo.disabled=!0),this.valueFrom&&(this.valueFrom.value=a),this.step&&(this.step.value=l),this.min&&(this.min.value=s),this.max&&(this.max.value=n),this.orientation&&(this.orientation.value=o),this.fill&&(this.fill.checked=h),this.range&&(this.range.checked=r),this.labels&&(this.labels.checked=u),this.tooltips&&(this.tooltips.checked=d)}},{key:"handleValueFromChange",value:function(){this.valueFrom&&this.root.sliderPlugin("setValue","valueFrom",Number(this.valueFrom.value))}},{key:"handleValueFromKeydown",value:function(e){var t=this.state,i=t.valueFrom,a=void 0===i?0:i,l=t.step,s=void 0===l?0:l,n=e.code;if("ArrowUp"===n||"ArrowRight"===n){var o=a+s;this.root.sliderPlugin("setValue","valueFrom",o)}if("ArrowDown"===n||"ArrowLeft"===n){var h=a-s;this.root.sliderPlugin("setValue","valueFrom",h)}}},{key:"handleValueToChange",value:function(){this.valueTo&&this.root.sliderPlugin("setValue","valueTo",Number(this.valueTo.value))}},{key:"handleValueToKeydown",value:function(e){var t=this.state,i=t.valueTo,a=void 0===i?0:i,l=t.step,s=void 0===l?0:l,n=e.code;if("ArrowUp"===n||"ArrowRight"===n){var o=a+s;this.root.sliderPlugin("setValue","valueTo",o)}if("ArrowDown"===n||"ArrowLeft"===n){var h=a-s;this.root.sliderPlugin("setValue","valueTo",h)}}},{key:"handleStepChange",value:function(){this.step&&this.root.sliderPlugin("setValue","step",Number(this.step.value))}},{key:"handleMinChange",value:function(){this.min&&this.root.sliderPlugin("setValue","min",Number(this.min.value))}},{key:"handleMaxChange",value:function(){this.max&&this.root.sliderPlugin("setValue","max",Number(this.max.value))}},{key:"handleOrientationChange",value:function(){this.orientation&&this.root.sliderPlugin("setValue","orientation",this.orientation.value)}},{key:"handleFillChange",value:function(){this.fill&&this.root.sliderPlugin("setValue","fill",this.fill.checked)}},{key:"handleRangeChange",value:function(){this.range&&(this.root.sliderPlugin("setValue","range",this.range.checked),this.range.checked?this.root.sliderPlugin("setValue","color","green"):this.root.sliderPlugin("setValue","color","orange"))}},{key:"handleLabelsChange",value:function(){this.labels&&this.root.sliderPlugin("setValue","labels",this.labels.checked)}},{key:"handleTooltipsChange",value:function(){this.tooltips&&this.root.sliderPlugin("setValue","tooltips",this.tooltips.checked)}}])&&e(a.prototype,l),s&&e(a,s),i}(),a=$("#sliderSingleHorizontal");a.sliderPlugin({valueFrom:0,min:-100,max:100,step:50}),new i(a).init();var l=$("#sliderSingleVertical");l.sliderPlugin({max:77,valueFrom:42,step:3,orientation:"vertical"}),new i(l).init();var s=$("#sliderRangeHorizontal");s.sliderPlugin({valueFrom:23,valueTo:77,orientation:"horizontal",range:!0,color:"green"}),new i(s).init();var n=$("#sliderRangeVertical");n.sliderPlugin({min:-2e5,max:2e5,range:!0,valueTo:12e4,valueFrom:-12e4,step:1,orientation:"vertical",color:"green"}),new i(n).init();var o=$("#defaultSlider");o.sliderPlugin(),new i(o).init();var h=$("#simpleSlider");h.sliderPlugin({step:1,valueFrom:70,orientation:"vertical",labels:!1,tooltips:!1,color:"green"}),new i(h).init()}();