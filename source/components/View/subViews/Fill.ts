import { IOptions } from '../../interfaces';

class Fill {
  display(options: IOptions, root: HTMLElement): void {
    const {
      orientation = 'horizontal',
      color = 'orange',
      fill = false,
      range = false,
      rangeMin = 0,
      rangeMax = 75,
      currentValue = 42,
    } = options;
    const scale = root.querySelector('[data-id="scale"]');
    const directionOfFilling: string =
      orientation === 'horizontal' ? 'width' : 'height';
    const directionOfMove: string =
        orientation === 'horizontal' ? 'left' : 'bottom';

    const fillTemplate = `
      <div class="slider__fill slider__fill_${orientation} slider__fill_${color}" 
      data-id="fill" 
      data-scale-component="fill" 
      style="${directionOfFilling}: ${currentValue}%;">
      </div>
    `;

    const fillRangeTemplate = `
      <div class="slider__fill slider__fill_${orientation} slider__fill_${orientation}_range slider__fill_${color}" 
      data-id="fill"
      data-scale-component="fill" 
      style="
        ${directionOfFilling}: ${rangeMax - rangeMin}%;
        ${directionOfMove}: ${rangeMin}%
        ">
      </div>
    `;

    if (scale === null) throw new Error('Scale element is not found');
    if (fill && range)
      return scale.insertAdjacentHTML('afterbegin', fillRangeTemplate);
    if (fill) return scale.insertAdjacentHTML('afterbegin', fillTemplate);
  }
}

export default Fill;
