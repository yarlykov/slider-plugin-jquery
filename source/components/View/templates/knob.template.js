function addTooltip() {
  return `
      <div class="slider__tooltip slider__tooltip_horizontal slider__tooltip_orange" data-id="tooltip">
        <span class="tooltip__value" data-id="tooltip-value">42 ¥</span>
        <div class="slider__tooltip_arrow"></div>
      </div>
    `;
}

function createKnob() {
  return `
      <div class="slider__knob slider__knob_horizontal slider__knob_orange" data-id="knob">
        ${addTooltip()}
      </div>
    `;
}

export default createKnob;
