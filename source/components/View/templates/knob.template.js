function addTooltip(display = {}, values = {}) {
  return `
      <div class="slider__tooltip slider__tooltip_${display.type} slider__tooltip_orange" data-id="tooltip">
        <span class="tooltip__value" data-id="tooltip-value">${values.current} ${display.units}</span>
        <div class="slider__tooltip_arrow slider__tooltip_arrow_${display.type}"></div>
      </div>
    `;
}

function createKnob(options = {}) {
  const { values, display } = options;
  return `
      <div class="slider__knob slider__knob_${display.type} slider__knob_orange" data-id="knob">
        ${addTooltip(display, values)}
      </div>
    `;
}

export default createKnob;
