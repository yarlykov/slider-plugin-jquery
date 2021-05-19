import './knobs.scss';
import { IOptions } from '../../../interfaces';
import SliderComponent from '../SliderComponent';

class Knobs extends SliderComponent {
  private firstKnob!: FirstKnob;
  private secondKnob!: SecondKnob;

  display() {
    const { range } = this.options;
    const scale = this.root.querySelector('[data-id="scale"]');
    if (!scale) throw new Error('Scale element is not found');

    if (range) {
      this.firstKnob = new FirstKnob(this.options, this.root);
      this.secondKnob = new SecondKnob(this.options, this.root);

      scale.insertAdjacentHTML('beforeend', this.firstKnob.getTemplate());
      scale.insertAdjacentHTML('beforeend', this.secondKnob.getTemplate());
    } else {
      scale.insertAdjacentHTML('beforeend', this.getTemplate());
    }
  }

  update(state: IOptions) {
    const knob = this.root.querySelector('[data-id="knob"]') as HTMLElement;

    if (state.range) {
      this.firstKnob.update(state);
      this.secondKnob.update(state);
    } else if (knob) {
      const directionOfMove =
        state.orientation === 'horizontal' ? 'left' : 'bottom';
      knob.style[directionOfMove] = `${state.currentValue}%`;
    }
  }

  getTemplate() {
    const { orientation = 'horizontal', color = 'orange' } = this.options;

    return `
      <div class="slider__knob slider__knob_${orientation} slider__knob_${color}" 
        data-id="knob"></div>
    `;
  }
}

class FirstKnob extends SliderComponent {
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

export default Knobs;
