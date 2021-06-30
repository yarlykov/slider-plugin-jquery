import './scale.scss';
import {
  getCoords,
  getPageCoords,
  getPosition,
  getValueWithStep,
} from '../../../../utils/utils';
import SliderComponent from '../SliderComponent';

class Scale extends SliderComponent {
  private element!: string;

  scale!: HTMLElement;

  display(): void {
    this.root.innerHTML = '';
    this.root.insertAdjacentHTML('afterbegin', this.getTemplate());

    this.scale = this.root.querySelector('[data-id="scale"]') as HTMLElement;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.scale.addEventListener('mousedown', this.onMouseDown);
  }

  getTemplate(): string {
    const { orientation = 'horizontal' } = this.state;
    return `
      <div class="slider slider_${orientation}">
        <div class="slider__scale slider__scale_${orientation}" data-id="scale"></div>
      </div>
    `;
  }

  isTarget(event: MouseEvent): boolean {
    if (event.target instanceof HTMLElement) {
      const target = event.target.dataset.id === 'scale'
        || event.target.dataset.id === 'fill';
      return target;
    }
    return false;
  }

  onMouseDown(event: MouseEvent): void {
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

      const scaleCoords = getCoords(this.scale);
      const pageCoords = getPageCoords(event);
      const position = getPosition(orientation, scaleCoords, pageCoords);
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
}

export default Scale;
