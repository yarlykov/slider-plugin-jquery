import { IOptions } from '../../interfaces';

class Tooltips {
  display(options: IOptions, root: HTMLElement) {
    const {
      orientation = 'horizontal',
      color = 'orange',
      currentValue = 0,
      tooltips = false,
    } = options;
    const knob = root.querySelector('[data-id="knob"]');

    if (!knob) throw new Error('Ooops... scale is not found');

    const verticalTooltipClass =
      orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';

    const tooltipTemplate = `
    <div class="slider__tooltip slider__tooltip_${orientation} slider__tooltip_${color}" data-id="tooltip">
            <span class="tooltip__value" data-id="tooltip-value">${currentValue}</span>
            <div class="slider__tooltip_arrow ${verticalTooltipClass}"></div>
          </div>
  `;

    if (tooltips) knob.insertAdjacentHTML('afterbegin', tooltipTemplate);
  }
}
export default Tooltips;
