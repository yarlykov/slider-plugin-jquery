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
    this.onMouseDown = this.onMouseDown.bind(this);
    this.knob.addEventListener('mousedown', this.onMouseDown);
  }

  update(state: IOptions) {
    if (this.knob) {
      const directionOfMove =
        state.orientation === 'horizontal' ? 'left' : 'bottom';
      const { current = 0 } = state;

      this.knob.style[directionOfMove] = `${fromValueToPercent(
        state,
        current,
      )}%`;
    }
  }

  getTemplate() {
    const { orientation = 'horizontal', color = 'orange' } = this.options;

    return `
      <div class="slider__knob slider__knob_${orientation} slider__knob_${color}" 
        data-id="knob"></div>
    `;
  }

  onMouseDown(mouseEvent: Event) {
    const {
      min = 0,
      max = 100,
      step = 1,
      orientation = 'horizontal',
    } = this.options;

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

class SecondKnob extends SliderComponent {
  display() {
    const scale = this.root.querySelector('[data-id="scale"]');
    if (!scale) throw new Error('Scale element is not found');

    scale.insertAdjacentHTML('beforeend', this.getTemplate());
    this.addListeners(this.options);
  }

  addListeners(state: IOptions) {
    const knob = this.root.querySelector('[data-knob="second"]');
    const scale = this.root.querySelector('[data-id="scale"]');
    const { min = 0, max = 100, step = 1, orientation = 'horizontal' } = state;

    knob?.addEventListener('mousedown', () => {
      document.onmousemove = (event) => {
        event.preventDefault();
        const scaleCoords = getCoords(scale as HTMLElement);
        const pageCoords = getPageCoords(event);

        const position = getPosition(orientation, scaleCoords, pageCoords);

        /* отвечает за пересчет полученных проц в проц с учетом шага */

        let stepCount = (max - min) / step;
        let stepPercent = 100 / stepCount;
        let stepPosition = Math.round(position / stepPercent) * stepPercent;

        if (stepPosition < 0) stepPosition = 0;
        if (stepPosition > 100) stepPosition = 100;

        /* отвечает за пересчет в нужное конечное значение в зависимости от шага */

        let interimValue = (stepPosition / stepPercent) * step;
        let value = interimValue + min;

        if (value > max) value = max;

        this.emit('mousemove', value.toFixed());
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    });
  }

  update(state: IOptions) {
    const knobSecond = this.root.querySelector(
      '[data-knob="second"]',
    ) as HTMLElement;

    const directionOfMove =
      state.orientation === 'horizontal' ? 'left' : 'bottom';
    const { rangeMax = 0 } = state;

    knobSecond.style[directionOfMove] = `${fromValueToPercent(
      state,
      rangeMax,
    )}%`;
  }

  getTemplate() {
    const { orientation = 'horizontal', color = 'orange' } = this.options;

    return `
      <div class="slider__knob slider__knob_range-first slider__knob_${orientation} slider__knob_${color}" data-knob="second"></div>
    `;
  }
}

export { Knob, SecondKnob };
