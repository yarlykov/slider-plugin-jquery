import SliderComponent from './SliderComponent';

class Knobs extends SliderComponent {
  display() {
    const scale = this.root.querySelector('[data-id="scale"]');
    if (!scale) throw new Error('Scale element is not found');

    scale.insertAdjacentHTML('beforeend', this.getTemplate());
  }

  update(data: any) {
    // убрать any
    const knob = this.root.querySelector('[data-id="knob"]') as HTMLElement;

    if (data.key === 'currentValue') {
      const directionOfMove = data.orientation === 'horizontal' ? 'left' : 'bottom'
      knob.style[directionOfMove] = `${data.currentValue}%`;
    }
  }

  getTemplate() {
    const {
      orientation = 'horizontal',
      color = 'orange',
      range = false,
      currentValue = 42,
      rangeMin = 0,
      rangeMax = 75,
    } = this.options;

    const directionOfMove = orientation === 'horizontal' ? 'left' : 'bottom';

    if (range) {
      return `
        <div class="slider__knob slider__knob_range-first slider__knob_${orientation} 
        slider__knob_${color}" data-id="knob" data-knob="first" 
        style="${directionOfMove}: ${rangeMin}%"></div>
        <div class="slider__knob slider__knob_range-second slider__knob_${orientation} 
        slider__knob_${color}" data-id="knob" data-knob="second" 
        style="${directionOfMove}: ${rangeMax}%"></div>
    `;
    }

    return `
      <div class="slider__knob slider__knob_${orientation} slider__knob_${color}" 
        data-id="knob" style="${directionOfMove}: ${currentValue}%"></div>
    `;
  }
}

export default Knobs;
