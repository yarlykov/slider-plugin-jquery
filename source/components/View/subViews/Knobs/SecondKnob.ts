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

    this.onMouseDown = this.onMouseDown.bind(this);
    this.secondKnob.addEventListener('mousedown', this.onMouseDown);
  }

  update(state: IOptions) {
    if (this.secondKnob) {
      const directionOfMove =
        state.orientation === 'horizontal' ? 'left' : 'bottom';
      const { rangeMax = 0 } = state;

      this.secondKnob.style[directionOfMove] = `${fromValueToPercent(
        state,
        rangeMax,
      )}%`;
    }
  }

  getTemplate() {
    const { orientation = 'horizontal', color = 'orange' } = this.state;

    return `
      <div class="slider__knob slider__knob_range-first slider__knob_${orientation} slider__knob_${color}" data-knob="second"></div>
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
}

export default SecondKnob;
