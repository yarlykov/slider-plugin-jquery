import './scale.scss';
import { getValueWithStep } from '../../../../utils/utils';
import SliderComponent from '../SliderComponent';

class Scale extends SliderComponent {
  public scaleNode!: HTMLElement | null;

  public display(): void {
    this.root.innerHTML = '';
    this.root.insertAdjacentHTML('afterbegin', this.getTemplate());

    this.scaleNode = this.root.querySelector('[data-id="scale"]');

    this.onPointerDown = this.onPointerDown.bind(this);
    if (this.scaleNode)
      this.scaleNode.addEventListener('pointerdown', this.onPointerDown);
  }

  public onPointerDown(event: PointerEvent): void {
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
          this.emit('scale:valueTo', correctValue.toFixed());
          this.emit('scale:targetMax', event);
        } else {
          this.emit('scale:valueFrom', correctValue.toFixed());
          this.emit('scale:target', event);
        }
      } else {
        this.emit('scale:valueFrom', correctValue.toFixed());
        this.emit('scale:target', event);
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
