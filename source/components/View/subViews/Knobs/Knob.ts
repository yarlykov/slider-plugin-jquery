import './knobs.scss';
import { IOptions } from '../../../interfaces';
import SliderComponent from '../SliderComponent';
import {
  fromValueToPercent,
  getCoords,
  getPageCoords,
  getPosition,
  getValueWithStep,
} from '../../../../utils/utils';

class Knob extends SliderComponent {
  scale!: HTMLElement;
  knob!: HTMLElement;

  display() {
    this.scale = this.root.querySelector('[data-id="scale"]') as HTMLElement;
    if (!this.scale) throw new Error('Scale element is not found');

    this.scale.insertAdjacentHTML('beforeend', this.getTemplate());
    this.knob = this.root.querySelector('[data-id="knob"]') as HTMLElement;

    this.addEventListeners();
  }

  addEventListeners() {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.knob.addEventListener('mousedown', this.onMouseDown);
    this.knob.addEventListener('keydown', this.onKeyDown);
  }

  update(state: IOptions) {
    this.state = Object.assign({}, state);

    if (this.knob) {
      const directionOfMove =
        state.orientation === 'horizontal' ? 'left' : 'bottom';
      const { valueFrom = 0 } = state;

      this.knob.style[directionOfMove] = `${fromValueToPercent(
        state,
        valueFrom,
      )}%`;
    }
  }

  getTemplate() {
    const { orientation = 'horizontal', color = 'orange' } = this.state;

    return `
      <div class="slider__knob slider__knob_${orientation} slider__knob_${color}" 
        data-id="knob" role="slider" tabindex="0"></div>
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
    const { valueFrom = 0, step = 1 } = this.state;
    const { code } = event;

    let newValue = 0;

    if (code === 'ArrowRight' || code === 'ArrowUp') {
      newValue = valueFrom + step;
      this.emit('changeValue', newValue);
    }
    if (code === 'ArrowLeft' || code === 'ArrowDown') {
      newValue = valueFrom - step;
      this.emit('changeValue', newValue);
    }
  }
}

export default Knob;
