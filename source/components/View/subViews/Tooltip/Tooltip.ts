import SliderComponent from 'Components/View/subViews/SliderComponent';
import { TargetType } from 'Components/View/Slider/Slider';
import { Color, IOptions, Orientation, TooltipCoords } from 'Components/interfaces';
import { checkColor, checkOrientation } from 'Root/source/utils/utils';
import './tooltip.scss';

class Tooltip extends SliderComponent {
  private tooltipValueFirst!: HTMLElement | null;
  private tooltipValueSecond!: HTMLElement | null;

  public init(): void {
    this.tooltipValueFirst = this.root.querySelector(
      '[data-id="tooltip-value-first"]',
    );
    this.tooltipValueSecond = this.root.querySelector(
      '[data-id="tooltip-value-second"]',
    );
  }

  public update(state: IOptions): void {
    const { orientation } = this.state;
  
    if (this.tooltipValueFirst) this.tooltipValueFirst.innerText = `${state.valueFrom}`;

    const tooltipFirst: HTMLElement | null = this.root.querySelector(
      '[data-id="tooltip-first"]',
    );
    const tooltipSecond: HTMLElement | null = this.root.querySelector(
      '[data-id="tooltip-second"]',
    );

    const coords = this.getTooltipsCoords();
    if (!coords) return;
    
    const { firstRight, firstTop, secondLeft, secondBottom } = coords;
  
    const hasTooltips = tooltipFirst 
      && tooltipSecond 
      && this.tooltipValueSecond;
    const hasTwoHorizontalNearby = orientation === 'horizontal' 
      && firstRight >= secondLeft
    const hasTwoVerticalNearby = orientation === 'vertical' 
      && secondBottom >= firstTop
    const hasTooltipsNearby = hasTwoHorizontalNearby  || hasTwoVerticalNearby;

    if (hasTooltips) {
      if (hasTooltipsNearby && this.tooltipValueSecond) {
        tooltipFirst.style.visibility = 'hidden'
        this.tooltipValueSecond.innerText = `${state.valueFrom} \u2013 ${state.valueTo}`
        tooltipSecond?.classList.add('slider__tooltip_double')
      } else if (this.tooltipValueSecond) {
        tooltipFirst.style.visibility = 'visible'
        this.tooltipValueSecond.innerText = `${state.valueTo}`
      }
    } else if (this.tooltipValueSecond) {
      this.tooltipValueSecond.innerText = `${state.valueTo}`
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

  public static getTemplate(
    orientation: Orientation,
    color: Color,
    target: TargetType,
  ): string {
    const tooltipId = target === TargetType.simple ? 'tooltip-first' : 'tooltip-second'
    const tooltipValueId = target === TargetType.simple ? 'tooltip-value-first' : 'tooltip-value-second'
    const orientationMod = checkOrientation(orientation) ? orientation : 'horizontal';
    const colorMod = checkColor(color) ? color : 'orange';
    const verticalTooltipClass =
      orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';

    return `
      <div class="slider__tooltip
        slider__tooltip_${orientationMod}
        slider__tooltip_${colorMod}"
        data-id="${tooltipId}"
      >
        <span class="tooltip__value" data-id="${tooltipValueId}"></span>
        <div class="slider__tooltip_arrow ${verticalTooltipClass}"></div>
      </div>
    `;
  }
}

export default Tooltip;
