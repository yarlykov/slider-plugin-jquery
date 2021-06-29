import './knobs.scss';
import SliderComponent from '../SliderComponent';
import { IOptions } from '../../../interfaces';
import {
  fromValueToPercent,
  getCoords,
  getPageCoords,
  getPosition,
  getValueWithStep,
} from '../../../../utils/utils';

class SecondKnob extends SliderComponent {
  scale!: HTMLElement;

  secondKnob!: HTMLElement;

  display() {
    this.scale = this.root.querySelector('[data-id="scale"]') as HTMLElement;
    if (!this.scale) throw new Error('Scale element is not found');

    this.scale.insertAdjacentHTML('beforeend', this.getTemplate());
    this.secondKnob = this.root.querySelector(
      '[data-knob="second"]',
    ) as HTMLElement;

    this.addEventListeners();
  }

  addEventListeners() {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.secondKnob.addEventListener('mousedown', this.onMouseDown);
    this.secondKnob.addEventListener('keydown', this.onKeyDown);
  }

  update(state: IOptions) {
    this.state = { ...state };

    if (this.secondKnob) {
      const directionOfMove = state.orientation === 'horizontal' ? 'left' : 'bottom';
      const { valueTo = 0 } = state;

      this.secondKnob.style[directionOfMove] = `${fromValueToPercent(
        state,
        valueTo,
      )}%`;
    }
  }

  getTemplate() {
    const { orientation = 'horizontal', color = 'orange' } = this.state;

    return `
      <div class="slider__knob slider__knob_${orientation} slider__knob_${color}" 
      data-knob="second" role="slider" tabindex="0"></div>
    `;
  }

  onMouseDown(mouseEvent: Event) {
    const {
      min = 0,
      max = 100,
      step = 1,
      orientation = 'horizontal',
    } = this.state;

    document.onmousemove = (mouseEvent) => {
      mouseEvent.preventDefault();
      const scaleCoords = getCoords(this.scale);

      const pageCoords = getPageCoords(mouseEvent);
      const position = getPosition(orientation, scaleCoords, pageCoords);
      const correctValue = getValueWithStep(min, max, step, position);

      this.emit('changeValue', correctValue.toFixed());
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }

  onKeyDown(event: KeyboardEvent) {
    const { valueTo = 0, step = 1 } = this.state;
    const { code } = event;

    let newValue = 0;

    if (code === 'ArrowRight' || code === 'ArrowUp') {
      newValue = valueTo + step;
      this.emit('changeValue', newValue);
    }
    if (code === 'ArrowLeft' || code === 'ArrowDown') {
      newValue = valueTo - step;
      this.emit('changeValue', newValue);
    }
  }
}

export default SecondKnob;
