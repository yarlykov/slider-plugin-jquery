import { ScaleEvents } from 'Source/Observer/events';
import { checkOrientation } from 'Source/utils/utils';
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

  public handleScalePointerDown(event: PointerEvent): void {
    if (this.isTarget(event)) {
      const { orientation } = this.state;

      const scaleCoords = this.scaleNode ? this.getCoords(this.scaleNode) : null;
      const pageCoords = this.getPageCoords(event);
      const position = this.getPosition(orientation, scaleCoords, pageCoords);

      this.emit(ScaleEvents.SCALE_VALUE_CHANGED, Number(position.toFixed()));
    }
  }

  public getScaleNode(): HTMLDivElement {
    return this.scaleNode;
  }

  private init(): void {
    const { orientation } = this.state;
    const orientationModifier = checkOrientation(orientation) ? orientation : 'horizontal';
  
    this.scaleNode = this.createScale(orientationModifier);
    this.scaleNode.addEventListener(
      'pointerdown',
      this.handleScalePointerDown.bind(this)
    );
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
