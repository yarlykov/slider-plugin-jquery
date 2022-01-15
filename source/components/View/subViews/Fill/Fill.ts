import { checkColor, checkOrientation, fromValueToPercent } from 'Source/utils/utils';
import { Color, IOptions, Orientation } from 'Components/interfaces';
import { TargetType } from 'Components/View/Slider/Slider';
import SliderComponent from 'Components/View/subViews/SliderComponent';
import './fill.scss';

class Fill extends SliderComponent {
  private fill!: HTMLDivElement;

  constructor(options: IOptions, root: HTMLElement, target: TargetType) {
    super(options, root, target);
    this.init();
  }

  public getFillNode(): HTMLDivElement {
    return this.fill;
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

  private init(): void {
    const { orientation, color } = this.state;
    const orientationMod = checkOrientation(orientation) ? orientation : 'horizontal';
    const colorMod = checkColor(color) ? color : 'orange';
    this.fill = this.createFill(colorMod, orientationMod);
  }

  private createFill(color: Color, orientation: Orientation): HTMLDivElement {
    const fill = document.createElement('div');
    fill.classList.add(
      'slider__fill',
      `slider__fill_${orientation}`,
      `slider__fill_${color}`
    );
    fill.setAttribute('data-id', 'fill');

    return fill;
  }
}

export default Fill;
