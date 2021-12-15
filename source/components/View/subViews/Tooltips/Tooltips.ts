import SliderComponent from 'Components/View/subViews/SliderComponent';
import { Color, IOptions, Orientation } from 'Components/interfaces';
import './tooltips.scss';

class Tooltip extends SliderComponent {
  public init(): void {
    const { hasTooltips } = this.state;

    if (hasTooltips) {
      const knob = this.root.querySelector('.js-slider__knob');
      if (!knob) throw new Error('Knob element is not found');
    }
  }

  public update(state: Partial<IOptions>): void {
    const tooltip: HTMLElement | null = this.root.querySelector(
      '.js-tooltip__value-first',
    );
    
    if (tooltip) tooltip.innerText = `${state.valueFrom}`;
  }

  public static getTemplate(orientation: Orientation, color: Color): string {
    const verticalTooltipClass =
      orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';

    return `
      <div class="slider__tooltip
        js-slider__tooltip-first
        slider__tooltip_${orientation}
        slider__tooltip_${color}"
        data-tooltip="first"
      >
        <span class="tooltip__value js-tooltip__value-first" data-id="tooltip-value"></span>
        <div class="slider__tooltip_arrow ${verticalTooltipClass}"></div>
      </div>
    `;
  }
}

class SecondTooltip extends SliderComponent {
  public init(): void {
    const { hasTooltips } = this.state;

    if (hasTooltips) {
      const secondKnob = this.root.querySelector('.js-slider__second-knob');
      if (!secondKnob) throw new Error('Second knob element is not found');
    }
  }

  public update(state: Partial<IOptions>): void {
    const tooltipValueSecond: HTMLElement | null = this.root.querySelector(
      '.js-tooltip__value-second',
    );
    const tooltipFirst: HTMLElement | null = this.root.querySelector(
      '.js-slider__tooltip-first',
    );
    const tooltipSecond: HTMLElement | null = this.root.querySelector(
      '.js-slider__tooltip-second',
    );
    const { orientation } = this.state;

    const coords = this.getTooltipsCoords();
    const { firstRight, firstTop, secondLeft, secondBottom } = coords;
  
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
      '.js-slider__tooltip-first',
    );
    const tooltipSecond: HTMLElement | null = this.root.querySelector(
      '.js-slider__tooltip-second',
    );

    return {
      firstRight: tooltipFirst?.getBoundingClientRect().right || 0,
      firstTop: tooltipFirst?.getBoundingClientRect().top || 0,
      secondLeft: tooltipSecond?.getBoundingClientRect().left || 0,
      secondBottom: tooltipSecond?.getBoundingClientRect().bottom || 0,
    }
  }

  public static getTemplate(orientation: Orientation, color: Color): string {
    const verticalTooltipClass =
      orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';

    return `
      <div class="slider__tooltip
        js-slider__tooltip-second
        slider__tooltip_${orientation}
        slider__tooltip_${color}"
        data-tooltip="second"
      >
        <span class="tooltip__value
          js-tooltip__value-second"
          data-id="tooltip-value-second"
        ></span>
        <div class="slider__tooltip_arrow ${verticalTooltipClass}"></div>
      </div>
    `;
  }
}

export { Tooltip, SecondTooltip };
