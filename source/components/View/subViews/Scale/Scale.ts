import './scale.scss';
import Slider from '../SliderComponent';
import {
  getCoords,
  getPageCoords,
  getPosition,
  getValueWithStep,
} from '../../../../utils/utils';

class Scale extends Slider {
  private element!: string;
  scale!: HTMLElement;

  display() {
    this.root.innerHTML = '';
    this.root.insertAdjacentHTML('afterbegin', this.getElement());

    this.scale = this.root.querySelector('[data-id="scale"]') as HTMLElement;
    this.onMouseDown = this.onMouseDown.bind(this);

    this.scale.addEventListener('mousedown', this.onMouseDown);
  }

  onMouseDown(mouseEvent: Event) {
    const {
      min = 0,
      max = 100,
      step = 1,
      orientation = 'horizontal',
    } = this.options;

    const scaleCoords = getCoords(this.scale);
    const pageCoords = getPageCoords(mouseEvent);
    const position = getPosition(orientation, scaleCoords, pageCoords);
    const correctValue = getValueWithStep(min, max, step, position);

    this.emit('changeValue', correctValue.toFixed());
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
    const { orientation = 'horizontal' } = this.options;
    return `
      <div class="slider slider_${orientation}">
        <div class="slider__scale slider__scale_${orientation}" data-id="scale"></div>
      </div>
    `;
  }
}

export default Scale;
