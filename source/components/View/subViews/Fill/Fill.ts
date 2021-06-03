import './fill.scss';
import { IOptions } from '../../../interfaces';
import SliderComponent from '../SliderComponent';
import { fromValueToPercent } from '../../../../utils/utils';

class Fill extends SliderComponent {
  display() {
    const scale = this.root.querySelector('[data-id="scale"]');
    if (!scale) throw new Error('Scale element is not found');

    if (this.options.fill)
      return scale.insertAdjacentHTML('afterbegin', this.getTemplate());
  }

  update(state: IOptions) {
    const fill = this.root.querySelector('[data-id="fill"]') as HTMLElement;
    let {
      orientation = 'horizontal',
      range,
      rangeMax = 100,
      current = 0,
    } = state;

    const isHorizontal = orientation === 'horizontal';
    const wayOfFilling: string = isHorizontal ? 'width' : 'height';
    const wayOfMove: string = isHorizontal ? 'left' : 'bottom';
    current = fromValueToPercent(state, current);

    if (fill && range) {
      rangeMax = fromValueToPercent(state, rangeMax);

      fill.style[wayOfFilling] = `${rangeMax - current}%`;
      fill.style[wayOfMove] = `${current}%`;
    } else if (fill) {
      fill.style[wayOfFilling] = `${current}%`;
    }
  }

  getTemplate() {
    const { color = 'orange', orientation = 'horizontal' } = this.options;

    return `
      <div class="slider__fill slider__fill_${orientation} slider__fill_${color} "data-id="fill"></div>
    `;
  }
}

export default Fill;
