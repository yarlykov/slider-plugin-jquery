import './knobs.scss';
import { IOptions } from '../../../interfaces';
import SliderComponent from '../SliderComponent';
import {
  calcStepForElementRender,
  fromPercentToValue,
  fromValueToPercent,
  getSliderCoords,
  getPageCoords,
  getPosition,
} from '../../../../utils/utils';

class Knob extends SliderComponent {
  display() {
    const scale = this.root.querySelector('[data-id="scale"]');
    if (!scale) throw new Error('Scale element is not found');

    scale.insertAdjacentHTML('beforeend', this.getTemplate());
    this.addListeners(this.options);
  }

  update(state: IOptions) {
    const knob = this.root.querySelector('[data-id="knob"]') as HTMLElement;

    if (knob) {
      const directionOfMove =
        state.orientation === 'horizontal' ? 'left' : 'bottom';
      knob.style[directionOfMove] = `${fromValueToPercent(state)}%`;
    }
  }

  getTemplate() {
    const { orientation = 'horizontal', color = 'orange' } = this.options;

    return `
      <div class="slider__knob slider__knob_${orientation} slider__knob_${color}" 
        data-id="knob"></div>
    `;
  }

  addListeners(state: IOptions) {
    const knob = this.root.querySelector('[data-id="knob"]');
    const scale = this.root.querySelector('[data-id="scale"]');
    const { min = 0, max = 100, step = 1, orientation = 'horizontal' } = state;

    knob?.addEventListener('mousedown', () => {
      // let knobCoords = getCoords(knob as HTMLElement);
      // let shift = event.pageX - knobCoords.left;

      document.onmousemove = (event) => {
        event.preventDefault();
        const sliderCoords = getSliderCoords(scale as HTMLElement);
        const pageCoords = getPageCoords(event);

        const position = getPosition(orientation, sliderCoords, pageCoords);

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

        this.emit('mousemove', value);
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    });
  }
}

class FirstKnob extends SliderComponent {
  display() {
    const scale = this.root.querySelector('[data-id="scale"]');
    if (!scale) throw new Error('Scale element is not found');

    scale.insertAdjacentHTML('beforeend', this.getTemplate());
  }

  update(state: IOptions) {
    const knob = this.root.querySelector('[data-knob="first"]') as HTMLElement;
    const directionOfMove =
      state.orientation === 'horizontal' ? 'left' : 'bottom';
    knob.style[directionOfMove] = `${state.rangeMin}%`;
  }

  getTemplate() {
    const { orientation = 'horizontal', color = 'orange' } = this.options;

    return `
      <div class="slider__knob slider__knob_range-first slider__knob_${orientation} slider__knob_${color}" data-knob="first"></div>
    `;
  }
}

class SecondKnob extends SliderComponent {
  display() {
    const scale = this.root.querySelector('[data-id="scale"]');
    if (!scale) throw new Error('Scale element is not found');

    scale.insertAdjacentHTML('beforeend', this.getTemplate());
  }

  update(state: IOptions) {
    const knob = this.root.querySelector('[data-knob="second"]') as HTMLElement;
    const directionOfMove =
      state.orientation === 'horizontal' ? 'left' : 'bottom';
    knob.style[directionOfMove] = `${state.rangeMax}%`;
  }

  getTemplate() {
    const { orientation = 'horizontal', color = 'orange' } = this.options;

    return `
      <div class="slider__knob slider__knob_range-first slider__knob_${orientation} slider__knob_${color}" data-knob="second"></div>
    `;
  }
}

export { Knob, FirstKnob, SecondKnob };
