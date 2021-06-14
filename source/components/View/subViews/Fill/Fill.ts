import './fill.scss';
import { IOptions } from '../../../interfaces';
import SliderComponent from '../SliderComponent';
import { fromValueToPercent } from '../../../../utils/utils';

class Fill extends SliderComponent {
  display() {
    const scale = this.root.querySelector('[data-id="scale"]');
    if (!scale) throw new Error('Scale element is not found');

    if (this.state.fill)
      return scale.insertAdjacentHTML('afterbegin', this.getTemplate());
  }

  update(state: IOptions) {
    const fill = this.root.querySelector('[data-id="fill"]') as HTMLElement;
    let {
      orientation = 'horizontal',
      range,
      valueTo = 100,
      valueFrom = 0,
    } = state;

    const isHorizontal = orientation === 'horizontal';
    const wayOfFilling: string = isHorizontal ? 'width' : 'height';
    const wayOfMove: string = isHorizontal ? 'left' : 'bottom';
    valueFrom = fromValueToPercent(state, valueFrom);

    if (fill && range) {
      valueTo = fromValueToPercent(state, valueTo);

      fill.style[wayOfFilling] = `${valueTo - valueFrom}%`;
      fill.style[wayOfMove] = `${valueFrom}%`;
    } else if (fill) {
      fill.style[wayOfFilling] = `${valueFrom}%`;
    }
  }

  getTemplate() {
    const { color = 'orange', orientation = 'horizontal' } = this.state;

    return `
      <div class="slider__fill slider__fill_${orientation} slider__fill_${color} "data-id="fill"></div>
    `;
  }
}

export default Fill;
