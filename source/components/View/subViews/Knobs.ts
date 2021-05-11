import { IOptions } from '../../interfaces';

class Knobs {
  display(options: IOptions, root: HTMLElement) {
    const {
      orientation = 'horizontal',
      color = 'orange',
      range = false,
      currentValue = 42,
      rangeMin = 0,
      rangeMax = 75,
    } = options;
    const scale = root.querySelector('[data-id="scale"]');
    const directionOfMove: string = orientation === 'horizontal' ? 'left' : 'bottom'

    if (!scale) throw new Error('Ooops... scale is not found');

    const knobTemplate = `
      <div class="slider__knob slider__knob_${orientation} slider__knob_${color}" 
      data-id="knob"
      style="${directionOfMove}: ${currentValue}%"
      >
      </div>
    `;

    const knobRangeTemplate = `
      <div class="slider__knob slider__knob_range-first slider__knob_${orientation} slider__knob_${color}"
      data-id="knob" 
      data-knob="first"
      style="${directionOfMove}: ${rangeMin}%"
      >
      </div>
      <div class="slider__knob slider__knob_range-second slider__knob_${orientation} slider__knob_${color}"
      data-id="knob"
      data-knob="second"
      style="${directionOfMove}: ${rangeMax}%"
      >
      </div>
    `;

    if (range) {
      return scale.insertAdjacentHTML('beforeend', knobRangeTemplate);
    }
    scale.insertAdjacentHTML('beforeend', knobTemplate);
  }
}

export default Knobs;
