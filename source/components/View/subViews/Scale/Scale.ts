import { ScaleEvents } from '../../../../Observer/events';
import { getValueWithStep } from '../../../../utils/utils';
import SliderComponent from '../SliderComponent';
import './scale.scss';

class Scale extends SliderComponent {
  public scaleNode!: HTMLElement | null;

  public display(): void {
    this.root.innerHTML = '';
    this.root.insertAdjacentHTML('afterbegin', this.getTemplate());

    this.scaleNode = this.root.querySelector('[data-id="scale"]');

    if (this.scaleNode)
      this.scaleNode.addEventListener('pointerdown', this.handleScalePointerDown.bind(this));
  }

  public handleScalePointerDown(event: PointerEvent): void {
    if (this.isTarget(event)) {
      const {
        min = 0,
        max = 100,
        valueFrom = 0,
        valueTo = 0,
        step = 1,
        orientation = 'horizontal',
        range = false,
      } = this.state;

      const scaleCoords = this.scaleNode ? this.getCoords(this.scaleNode) : {};
      const pageCoords = this.getPageCoords(event);
      const position = this.getPosition(orientation, scaleCoords, pageCoords);
      const correctValue = getValueWithStep(min, max, step, position);

      if (range) {
        const delta = (valueTo - valueFrom) / 2;
        const leftHalfOfScale = valueFrom + delta;
        if (correctValue >= leftHalfOfScale) {
          this.emit(ScaleEvents.VALUE_TO_CHANGED, correctValue.toFixed());
          this.emit(ScaleEvents.TARGET_MAX_VALUE_TRIGGERED, event);
        } else {
          this.emit(ScaleEvents.VALUE_FROM_CHANGED, correctValue.toFixed());
          this.emit(ScaleEvents.TARGET_TRIGGERED, event);
        }
      } else {
        this.emit(ScaleEvents.VALUE_FROM_CHANGED, correctValue.toFixed());
        this.emit(ScaleEvents.TARGET_TRIGGERED, event);
      }
    }
  }

  private isTarget(event: PointerEvent): boolean | unknown {
    if (event.target instanceof HTMLElement) {
      const target =
        event.target.dataset.id === 'scale' ||
        event.target.dataset.id === 'fill';
      return target;
    }
  }

  private getTemplate(): string {
    const { orientation = 'horizontal' } = this.state;
    return `
      <div class="slider slider_${orientation}">
        <div class="slider__scale slider__scale_${orientation}" data-id="scale"></div>
      </div>
    `;
  }
}

export default Scale;
