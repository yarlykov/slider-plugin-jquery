import SliderComponent from 'Components/View/subViews/SliderComponent';
import { Color, IOptions, Orientation, TooltipCoords } from 'Components/interfaces';
import './tooltips.scss';
import { checkColor, checkOrientation } from 'Root/source/utils/utils';

class Tooltip extends SliderComponent {
  public init(): void {
    const { hasTooltips } = this.state;

    if (hasTooltips) {
      const knob = this.root.querySelector('[data-id="knob"]');
      if (!knob) throw new Error('Knob element is not found');
    }
  }

  public update(state: IOptions): void {
    const tooltip: HTMLElement | null = this.root.querySelector(
      '[data-id="tooltip-value-first"]',
    );
    
    if (tooltip) tooltip.innerText = `${state.valueFrom}`;
  }

  public static getTemplate(orientation: Orientation, color: Color): string {
    const orientationMod = checkOrientation(orientation) ? orientation : 'horizontal';
    const colorMod = checkColor(color) ? color : 'orange';
    const verticalTooltipClass =
      orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';

    return `
      <div class="slider__tooltip
        slider__tooltip_${orientationMod}
        slider__tooltip_${colorMod}"
        data-id="tooltip-first"
      >
        <span class="tooltip__value" data-id="tooltip-value-first"></span>
        <div class="slider__tooltip_arrow ${verticalTooltipClass}"></div>
      </div>
    `;
  }
}

class SecondTooltip extends SliderComponent {
  public init(): void {
    const { hasTooltips } = this.state;

    if (hasTooltips) {
      const secondKnob = this.root.querySelector('[data-id="second-knob"]');
      if (!secondKnob) throw new Error('Second knob element is not found');
    }
  }

  public update(state: IOptions): void {
    const tooltipValueSecond: HTMLElement | null = this.root.querySelector(
      '[data-id="tooltip-value-second"]',
    );
    const tooltipFirst: HTMLElement | null = this.root.querySelector(
      '[data-id="tooltip-first"]',
    );
    const tooltipSecond: HTMLElement | null = this.root.querySelector(
      '[data-id="tooltip-second"]',
    );
    const { orientation } = this.state;

    const coords = this.getTooltipsCoords();
    if (!coords) return;
    
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

  private getTooltipsCoords(): TooltipCoords | null {
    const tooltipFirst: HTMLElement | null = this.root.querySelector(
      '[data-id="tooltip-first"]',
    );
    const tooltipSecond: HTMLElement | null = this.root.querySelector(
      '[data-id="tooltip-second"]',
    );

    if (tooltipFirst && tooltipSecond) {
      return {
        firstRight: tooltipFirst?.getBoundingClientRect().right,
        firstTop: tooltipFirst?.getBoundingClientRect().top,
        secondLeft: tooltipSecond?.getBoundingClientRect().left,
        secondBottom: tooltipSecond?.getBoundingClientRect().bottom,
      }
    }
    return null;
  }

  public static getTemplate(orientation: Orientation, color: Color): string {
    const orientationMod = checkOrientation(orientation) ? orientation : 'horizontal';
    const colorMod = checkColor(color) ? color : 'orange';
    const verticalTooltipClass =
      orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';

    return `
      <div class="slider__tooltip
        slider__tooltip_${orientationMod}
        slider__tooltip_${colorMod}"
        data-id="tooltip-second"
      >
        <span class="tooltip__value"
          data-id="tooltip-value-second"
        ></span>
        <div class="slider__tooltip_arrow ${verticalTooltipClass}"></div>
      </div>
    `;
  }
}

export { Tooltip, SecondTooltip };
