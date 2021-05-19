import { IOptions } from '../../interfaces';
import SliderComponent from './SliderComponent';

class Tooltips extends SliderComponent {
  private firstTooltip!: FirstTooltip;
  private secondTooltip!: SecondTooltip;

  display() {
    const { tooltips = false, range = false } = this.options;

    if (tooltips && range) {
      this.firstTooltip = new FirstTooltip(this.options, this.root);
      this.secondTooltip = new SecondTooltip(this.options, this.root);

      this.firstTooltip.display();
      this.secondTooltip.display();
    } else if (tooltips) {
      const knob = this.root.querySelector('[data-id="knob"]');
      
      if (!knob) throw new Error('Knob element is not found');
      knob.insertAdjacentHTML('afterbegin', this.getTemplate());
    }
  }

  update(state: IOptions) {
    const tooltip = this.root.querySelector(
      '[data-id="tooltip-value"]',
    ) as HTMLElement;

    if (state.tooltips && state.range) {
      this.firstTooltip.update(state);
      this.secondTooltip.update(state);
    } else if (tooltip) {
      tooltip.innerText = `${state.currentValue}`;
    }
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
    const firstKnob = this.root.querySelector('[data-knob="first"]');
    if (!firstKnob) throw new Error('First knob element is not found');

    firstKnob.insertAdjacentHTML('afterbegin', this.getTemplate());
  }

  update(state: IOptions) {
    const tooltipFirst = this.root.querySelector(
      '[data-id="tooltip-value-first"]',
    ) as HTMLElement;

    tooltipFirst.innerText = `${state.rangeMin}`;
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
    const secondKnob = this.root.querySelector('[data-knob="second"]');
    if (!secondKnob) throw new Error('First knob element is not found');

    secondKnob.insertAdjacentHTML('afterbegin', this.getTemplate());
  }

  update(state: IOptions) {
    const tooltipFirst = this.root.querySelector(
      '[data-id="tooltip-value-second"]',
    ) as HTMLElement;
    tooltipFirst.innerText = `${state.rangeMax}`;
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

export default Tooltips;
