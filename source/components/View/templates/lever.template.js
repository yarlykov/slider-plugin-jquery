function addTooltip() {
  return `
      <div class="slider__tooltip slider__tooltip_horizontal slider__tooltip_orange" data-id="tooltip">
        <span class="tooltip__value" data-id="tooltip-value">42 ¥</span>
        <div class="slider__tooltip_arrow"></div>
      </div>
    `;
}

function createLever() {
  return `
      <div class="slider__lever slider__lever_horizontal slider__lever_orange" data-id="lever">
        ${addTooltip()}
      </div>
    `;
}

export default createLever;
