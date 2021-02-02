class Tooltip {
  constructor(options = {}) {
    this.options = options;
  }

  toHTML() {
    const { orientation = '', value = '53' } = this.options;

    return `
      <div class="slider__tooltip slider__tooltip_${orientation} slider__tooltip_orange" data-lever-component="tooltip">
        <span class="tooltip__value" data-lever-component="tooltip-value">${value} ¥</span>
        <div class="slider__tooltip_arrow slider__tooltip_arrow_${orientation}"></div>
      </div>
    `;
  }
}
Tooltip.className = 'slider__tooltip';

export default Tooltip;
