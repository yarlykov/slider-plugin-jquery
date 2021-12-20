import { checkColor, checkOrientation, fromValueToPercent } from 'Source/utils/utils';
import SliderComponent from 'Components/View/subViews/SliderComponent';
import { Color, IOptions, Orientation } from 'Components/interfaces';
import './fill.scss';

class Fill extends SliderComponent {
  private fill!: HTMLElement | null;

  public init(): void {
    this.fill = this.root.querySelector('.js-slider__fill');
  }

  public update(state: IOptions): void {
    const {
      orientation,
      isRange,
      valueTo,
      valueFrom
    } = state ;
    const isHorizontal = orientation === 'horizontal';
    const wayOfFilling: string = isHorizontal ? 'width' : 'height';
    const wayOfMove: string = isHorizontal ? 'left' : 'bottom';
    const newValueFrom = fromValueToPercent(state, valueFrom);

    if (this.fill && isRange) {
      const newValueTo = fromValueToPercent(state, valueTo);
      this.fill.style[wayOfFilling] = `${newValueTo - newValueFrom}%`;
      this.fill.style[wayOfMove] = `${newValueFrom}%`;
    } else if (this.fill) {
      this.fill.style[wayOfFilling] = `${newValueFrom}%`;
    }
  }

  public static getTemplate(color: Color, orientation: Orientation): string {
    const orientationMod = checkOrientation(orientation) ? orientation : 'horizontal';
    const colorMod = checkColor(color) ? color : 'orange';

    return `
      <div
        class="slider__fill
        js-slider__fill
        slider__fill_${orientationMod}
        slider__fill_${colorMod}
        "data-id="fill"
      ></div>
    `;
  }
}

export default Fill;
