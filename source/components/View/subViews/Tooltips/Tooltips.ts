import './tooltips.scss';
import { IOptions } from '../../../interfaces';
import SliderComponent from '../SliderComponent';
import {
  fromPercentToValue,
  fromValueToPercent,
} from '../../../../utils/utils';

class Tooltip extends SliderComponent {
  display() {
    const { tooltips = false } = this.options;

    if (tooltips) {
      const knob = this.root.querySelector('[data-id="knob"]');

      if (!knob) throw new Error('Knob element is not found');
      knob.insertAdjacentHTML('afterbegin', this.getTemplate());
    }
  }

  update(state: IOptions) {
    const tooltip = this.root.querySelector(
      '[data-id="tooltip-value"]',
    ) as HTMLElement;

    if (tooltip) tooltip.innerText = `${state.currentValue}`;
  }

  getTemplate() {
    const { orientation, color } = this.options;
    const verticalTooltipClass =
      orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';

    return `
      <div class="slider__tooltip slider__tooltip_${orientation} slider__tooltip_${color}">
        <span class="tooltip__value" data-id="tooltip-value"></span>
        <div class="slider__tooltip_arrow ${verticalTooltipClass}"></div>
      </div>
    `;
  }
}

class FirstTooltip extends SliderComponent {
  display() {
    const { tooltips = false } = this.options;

    if (tooltips) {
      const firstKnob = this.root.querySelector('[data-knob="first"]');
      if (!firstKnob) throw new Error('First knob element is not found');

      firstKnob.insertAdjacentHTML('afterbegin', this.getTemplate());
    }
  }

  update(state: IOptions) {
    const tooltipFirst = this.root.querySelector(
      '[data-id="tooltip-value-first"]',
    ) as HTMLElement;

    if (tooltipFirst) tooltipFirst.innerText = `${state.rangeMin}`;
  }

  getTemplate() {
    const { orientation, color } = this.options;
    const verticalTooltipClass =
      orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';

    return `
      <div class="slider__tooltip slider__tooltip_${orientation} slider__tooltip_${color}" data-tooltip="first">
        <span class="tooltip__value" data-id="tooltip-value-first"></span>
        <div class="slider__tooltip_arrow ${verticalTooltipClass}"></div>
      </div>
    `;
  }
}

class SecondTooltip extends SliderComponent {
  display() {
    const { tooltips = false } = this.options;

    if (tooltips) {
      const secondKnob = this.root.querySelector('[data-knob="second"]');
      if (!secondKnob) throw new Error('Second knob element is not found');

      secondKnob.insertAdjacentHTML('afterbegin', this.getTemplate());
    }
  }

  update(state: IOptions) {
    const tooltipSecond = this.root.querySelector(
      '[data-id="tooltip-value-second"]',
    ) as HTMLElement;
    if (tooltipSecond) tooltipSecond.innerText = `${state.rangeMax}`;
  }

  getTemplate() {
    const { orientation, color } = this.options;
    const verticalTooltipClass =
      orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';

    return `
      <div class="slider__tooltip slider__tooltip_${orientation} slider__tooltip_${color}" data-tooltip="second">
        <span class="tooltip__value" data-id="tooltip-value-second"></span>
        <div class="slider__tooltip_arrow ${verticalTooltipClass}"></div>
      </div>
    `;
  }
}

export { Tooltip, FirstTooltip, SecondTooltip };
