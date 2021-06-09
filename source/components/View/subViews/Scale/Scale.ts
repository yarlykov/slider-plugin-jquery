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

  display() {
    this.root.innerHTML = '';
    this.root.insertAdjacentHTML('afterbegin', this.getElement());

    this.scale = this.root.querySelector('[data-id="scale"]') as HTMLElement;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.scale.addEventListener('mousedown', this.onMouseDown);
  }

  getElement() {
    if (this.element) {
      console.log('i am save');
      return this.element;
    }

    this.element = this.getTemplate();
    return this.element;
  }

  getTemplate() {
    const { orientation = 'horizontal' } = this.state;
    return `
      <div class="slider slider_${orientation}">
        <div class="slider__scale slider__scale_${orientation}" data-id="scale"></div>
      </div>
    `;
  }

  isTarget(event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      const target =
        event.target.dataset.id === 'scale' ||
        event.target.dataset.id === 'fill';
      return target;
    }
  }

  onMouseDown(event: MouseEvent) {
    if (this.isTarget(event)) {
      const {
        min = 0,
        max = 100,
        current = 0,
        rangeMax = 0,
        step = 1,
        orientation = 'horizontal',
        range = false,
      } = this.state;

      const scaleCoords = getCoords(this.scale);
      const pageCoords = getPageCoords(event);
      const position = getPosition(orientation, scaleCoords, pageCoords);
      const correctValue = getValueWithStep(min, max, step, position);

      if (range) {
        const delta = (rangeMax - current) / 2;
        const leftHalfOfScale = current + delta;
        if (correctValue >= leftHalfOfScale) {
          this.emit('scale:rangeMax', correctValue.toFixed());
          this.emit('scale:targetMax', event);
        } else {
          this.emit('scale:current', correctValue.toFixed());
          this.emit('scale:target', event);
        }
      } else {
        this.emit('scale:current', correctValue.toFixed());
        this.emit('scale:target', event);
      }
    }
  }
}

export default Scale;
