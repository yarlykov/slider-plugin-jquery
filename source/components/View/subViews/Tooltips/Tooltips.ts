import './tooltips.scss';
import { IOptions } from '../../../interfaces';
import SliderComponent from '../SliderComponent';

class Tooltip extends SliderComponent {
  public display(): void {
    const { tooltips = false } = this.state;

    if (tooltips) {
      const knob = this.root.querySelector('[data-id="knob"]');

      if (!knob) throw new Error('Knob element is not found');
      knob.insertAdjacentHTML('afterbegin', this.getTemplate());
    }
  }

  public update(state: IOptions): void {
    const tooltip = this.root.querySelector(
      '[data-id="tooltip-value"]',
    ) as HTMLElement;
    
    if (tooltip) tooltip.innerText = `${state.valueFrom}`;
  }

  private getTemplate(): string {
    const { orientation = 'horizontal', color = 'orange' } = this.state;
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

class SecondTooltip extends SliderComponent {
  public display(): void {
    const { tooltips = false } = this.state;

    if (tooltips) {
      const secondKnob = this.root.querySelector('[data-knob="second"]');
      if (!secondKnob) throw new Error('Second knob element is not found');

      secondKnob.insertAdjacentHTML('afterbegin', this.getTemplate());
    }
  }

  public update(state: IOptions): void {
    const tooltipSecond = this.root.querySelector(
      '[data-id="tooltip-value-second"]',
    ) as HTMLElement;
    if (tooltipSecond) tooltipSecond.innerText = `${state.valueTo}`;
  }

   private getTemplate(): string {
    const { orientation = 'horizontal', color = 'orange' } = this.state;
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

export { Tooltip, SecondTooltip };
