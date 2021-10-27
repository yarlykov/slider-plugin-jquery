import './tooltips.scss';
import SliderComponent from '../SliderComponent';
import { IOptions } from '../../../interfaces';

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
    const tooltip: HTMLElement | null = this.root.querySelector(
      '[data-id="tooltip-value"]',
    );
    
    if (tooltip) tooltip.innerText = `${state.valueFrom}`;
  }

  private getTemplate(): string {
    const { orientation = 'horizontal', color = 'orange' } = this.state;
    const verticalTooltipClass =
      orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';

    return `
      <div class="slider__tooltip slider__tooltip_${orientation} slider__tooltip_${color}" data-tooltip="first">
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
    const tooltipValueSecond: HTMLElement | null = this.root.querySelector(
      '[data-id="tooltip-value-second"]',
    );
    const tooltipFirst: HTMLElement | null = this.root.querySelector(
      '[data-tooltip="first"]',
    );
    const tooltipSecond: HTMLElement | null = this.root.querySelector(
      '[data-tooltip="second"]',
    );
    const { orientation = 'horizontal' } = this.state;

    const coords = this.getTooltipsCoords();
    const {firstRight, firstTop, secondLeft, secondBottom } = coords;
  
    const hasTooltips = tooltipFirst 
      && tooltipSecond 
      && tooltipValueSecond;
    const hasTwoHorizontalNearby = orientation === 'horizontal' 
      && firstRight >= secondLeft
    const hasTwoVerticalNearby = orientation === 'vertical' 
      && secondBottom >= firstTop
    const hasTooltipsNearby = hasTwoHorizontalNearby  || hasTwoVerticalNearby;

    if (hasTooltips) {
      if (hasTooltipsNearby) {
        tooltipFirst.style.visibility = 'hidden'
        tooltipValueSecond.innerText = `${state.valueFrom} \u2013 ${state.valueTo}`
        tooltipSecond?.classList.add('slider__tooltip_double')
      } else {
        tooltipFirst.style.visibility = 'visible'
        tooltipValueSecond.innerText = `${state.valueTo}`
      }
    } else if (tooltipValueSecond) {
      tooltipValueSecond.innerText = `${state.valueTo}`
    }
  }

  private getTooltipsCoords() {
    const tooltipFirst: HTMLElement | null = this.root.querySelector(
      '[data-tooltip="first"]',
    );
    const tooltipSecond: HTMLElement | null = this.root.querySelector(
      '[data-tooltip="second"]',
    );

    return {
      firstRight: tooltipFirst?.getBoundingClientRect().right || 0,
      firstTop: tooltipFirst?.getBoundingClientRect().top || 0,
      secondLeft: tooltipSecond?.getBoundingClientRect().left || 0,
      secondBottom: tooltipSecond?.getBoundingClientRect().bottom || 0,
    }
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
