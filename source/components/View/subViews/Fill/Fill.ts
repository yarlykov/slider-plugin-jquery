import { fromValueToPercent } from 'Source/utils/utils';
import defaultState from 'Source/defaultState';
import SliderComponent from 'Components/View/subViews/SliderComponent';
import { IOptions } from 'Components/interfaces';
import './fill.scss';

class Fill extends SliderComponent {
  private fill!: HTMLElement | null;

  public init(): void {
    this.fill = this.root.querySelector('.js-slider__fill');
  }

  public update(state: Partial<IOptions>): void {
    const {
      orientation = defaultState.orientation,
      range = defaultState.range,
      valueTo = defaultState.valueTo,
      valueFrom = defaultState.valueFrom
    } = state;
    const isHorizontal = orientation === 'horizontal';
    const wayOfFilling: string = isHorizontal ? 'width' : 'height';
    const wayOfMove: string = isHorizontal ? 'left' : 'bottom';
    const newValueFrom = fromValueToPercent(state, valueFrom);

    if (this.fill && range) {
      const newValueTo = fromValueToPercent(state, valueTo);
      this.fill.style[wayOfFilling] = `${newValueTo - newValueFrom}%`;
      this.fill.style[wayOfMove] = `${newValueFrom}%`;
    } else if (this.fill) {
      this.fill.style[wayOfFilling] = `${newValueFrom}%`;
    }
  }

  public static getTemplate(color = 'orange', orientation = 'horizontal'): string {
    return `
      <div
        class="slider__fill
        js-slider__fill
        slider__fill_${orientation}
        slider__fill_${color}
        "data-id="fill"
      ></div>
    `;
  }
}

export default Fill;
