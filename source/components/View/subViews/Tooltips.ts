import { IOptions } from '../../interfaces';

class Tooltips {
  display(options: IOptions, root: HTMLElement) {
    const {
      orientation = 'horizontal',
      color = 'orange',
      currentValue = 42,
      tooltips = false,
      range = false,
      rangeMin = 0,
      rangeMax = 75,
    } = options;
    const knob = root.querySelectorAll('[data-id="knob"]');

    if (!knob) throw new Error('Ooops... knob is not found');

    const verticalTooltipClass =
      orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';

    const singleTooltipTemplate = `
    <div class="slider__tooltip slider__tooltip_${orientation} slider__tooltip_${color}" data-id="tooltip">
            <span class="tooltip__value" data-id="tooltip-value">${currentValue}</span>
            <div class="slider__tooltip_arrow ${verticalTooltipClass}"></div>
          </div>
    `;

    const firstTooltipRangeTemplate = `
      <div class="slider__tooltip slider__tooltip_${orientation} slider__tooltip_${color}" data-id="tooltip" data-tooltip="first">
        <span class="tooltip__value" data-id="tooltip-value">${rangeMin}</span>
        <div class="slider__tooltip_arrow ${verticalTooltipClass}"></div>
      </div>
    `;

    const secondTooltipRangeTemplate = `
      <div class="slider__tooltip slider__tooltip_${orientation} slider__tooltip_${color}" data-id="tooltip" data-tooltip="second">
        <span class="tooltip__value" data-id="tooltip-value">${rangeMax}</span>
        <div class="slider__tooltip_arrow ${verticalTooltipClass}"></div>
      </div>
    `;

    if (tooltips && range) {
      knob[0].insertAdjacentHTML('afterbegin', firstTooltipRangeTemplate);
      knob[1].insertAdjacentHTML('afterbegin', secondTooltipRangeTemplate);
    } else if (tooltips) {
      knob[0].insertAdjacentHTML('afterbegin', singleTooltipTemplate);
    }
  }
}
export default Tooltips;
