import { IOptions } from '../../interfaces';

class Tooltips {
  display(options: IOptions) {
    const {
      orientation = 'horizontal',
      color = 'orange',
      currentValue = 0,
    } = options;
    const knob = document.querySelector('[data-id="knob"]');
    const verticalTooltipClass =
      orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';

    const tooltipTemplate = `
    <div class="slider__tooltip slider__tooltip_${orientation} slider__tooltip_${color}" data-id="tooltip">
            <span class="tooltip__value" data-id="tooltip-value">${currentValue}</span>
            <div class="slider__tooltip_arrow ${verticalTooltipClass}"></div>
          </div>
  `;

    knob?.insertAdjacentHTML('afterbegin', tooltipTemplate);
  }
}
export default Tooltips;
