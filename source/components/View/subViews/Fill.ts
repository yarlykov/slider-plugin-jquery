import SliderComponent from './SliderComponent';

class Fill extends SliderComponent {
  display() {
    const scale = this.root.querySelector('[data-id="scale"]');
    if (!scale) throw new Error('Scale element is not found');

    if (this.options.fill)
      return scale.insertAdjacentHTML('afterbegin', this.getTemplate());
  }

  update(data: any) {
    // убрать any
    const fill = this.root.querySelector('[data-id="fill"]') as HTMLElement;

    if (data.key === 'currentValue' && fill) {
      const wayOfFilling = data.orientation === 'horizontal' ? 'width' : 'height';
      fill.style[wayOfFilling] = `${data.currentValue}%`;
    }
  }

  getTemplate() {
    const {
      range = false,
      color = 'orange',
      orientation,
      rangeMin = 0,
      rangeMax = 100,
      currentValue = 42,
    } = this.options;

    const isHorizontal = orientation === 'horizontal';
    const wayOfFilling = isHorizontal ? 'width' : 'height';
    const wayOfMove: string = isHorizontal ? 'left' : 'bottom';

    if (range)
      return `
      <div class="slider__fill slider__fill_${orientation} 
      slider__fill_${orientation}_range slider__fill_${color}" data-id="fill" 
      style="${wayOfFilling}: ${
        rangeMax - rangeMin
      }%; ${wayOfMove}: ${rangeMin}%"></div>
    `;

    return `
      <div class="slider__fill slider__fill_${orientation} slider__fill_${color} "data-id="fill"
      data-scale-component="fill"style="${wayOfFilling}: ${currentValue}%;"></div>
    `;
  }
}

export default Fill;
