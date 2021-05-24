import './knobs.scss';
import { IOptions } from '../../../interfaces';
import SliderComponent from '../SliderComponent';
import { calcStepForElementRender, getCoords } from '../../../../utils/utils';

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
      knob.style[directionOfMove] = `${calcStepForElementRender(state)}%`;
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
    const { min, max, step } = state;

    knob?.addEventListener('mousedown', (event) => {
      let sliderCoords = getCoords(scale as HTMLElement);
      let knobCoords = getCoords(knob as HTMLElement);
      let shift = event.pageX - knobCoords.left;

      document.onmousemove = (event) => {
        event.preventDefault();
        let left =
          ((event.pageX - shift - sliderCoords.left) / sliderCoords.width) *
          100;

        if (left < 0) left = 0;
        if (left > 100) left = 100;

        let stepCount = (max - min) / step;
        let stepPercent = 100 / stepCount;
        let stepLeft = Math.round(left / stepPercent) * stepPercent;

        if (stepLeft < 0) stepLeft = 0;
        if (stepLeft > 100) stepLeft = 100;
        this.emit('mousemove', stepLeft);

        let result = ((stepLeft / stepPercent) * step).toFixed();
        let values = result + min;
        result = Number(values);
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
