import { ScaleEvents } from 'Source/Observer/events';
import { checkOrientation, getValueWithStep } from 'Source/utils/utils';
import { IOptions, Orientation } from 'Components/interfaces';
import { TargetType } from 'Components/View/Slider/Slider';
import SliderComponent from 'Components/View/subViews/SliderComponent';
import './scale.scss';

class Scale extends SliderComponent {
  private scaleNode!: HTMLDivElement;

  constructor(options: IOptions, root: HTMLElement, target: TargetType) {
    super(options, root, target);
    this.init();
  }

  public init(): void {
    const { orientation } = this.state;
    const orientationModifier = checkOrientation(orientation) ? orientation : 'horizontal';
  
    this.scaleNode = this.createScale(orientationModifier);
    this.scaleNode.addEventListener(
      'pointerdown',
      this.handleScalePointerDown.bind(this)
    );
  }

  public handleScalePointerDown(event: PointerEvent): void {
    if (this.isTarget(event)) {
      const {
        min,
        max,
        valueFrom,
        valueTo,
        step,
        orientation,
        isRange,
      } = this.state;

      const scaleCoords = this.scaleNode ? this.getCoords(this.scaleNode) : null;
      const pageCoords = this.getPageCoords(event);
      const position = this.getPosition(orientation, scaleCoords, pageCoords);
      const correctValue = getValueWithStep(min, max, step, position);

      if (isRange) {
        const delta = (valueTo - valueFrom) / 2;
        const leftHalfOfScale = valueFrom + delta;
        if (correctValue >= leftHalfOfScale) {
          this.emit(ScaleEvents.SCALE_VALUE_TO_CHANGED, correctValue.toFixed());
          this.emit(ScaleEvents.TARGET_MAX_VALUE_TRIGGERED, event);
        } else {
          this.emit(ScaleEvents.SCALE_VALUE_FROM_CHANGED, correctValue.toFixed());
          this.emit(ScaleEvents.TARGET_TRIGGERED, event);
        }
      } else {
        this.emit(ScaleEvents.SCALE_VALUE_FROM_CHANGED, correctValue.toFixed());
        this.emit(ScaleEvents.TARGET_TRIGGERED, event);
      }
    }
  }

  public getScaleNode(): HTMLDivElement {
    return this.scaleNode;
  }

  private isTarget(event: PointerEvent): boolean | unknown {
    if (event.target instanceof HTMLElement) {
      const target =
        event.target.dataset.id === 'scale' ||
        event.target.dataset.id === 'fill';
      return target;
    }
  }

  private createScale(orientation: Orientation): HTMLDivElement {
    const scale = document.createElement('div');
    scale.classList.add(
      'js-slider__scale',
      'slider__scale',
      `slider__scale_${orientation}`
    );
    scale.setAttribute('data-id', 'scale');

    return scale;
  }
}

export default Scale;
