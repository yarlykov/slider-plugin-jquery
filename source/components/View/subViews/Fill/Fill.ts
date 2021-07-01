import './fill.scss';
import { IOptions } from '../../../interfaces';
import SliderComponent from '../SliderComponent';
import { fromValueToPercent } from '../../../../utils/utils';

class Fill extends SliderComponent {
  public display(): void {
    const scale = this.root.querySelector('[data-id="scale"]');
    if (!scale) throw new Error('Scale element is not found');

    if (this.state.fill)
      return scale.insertAdjacentHTML('afterbegin', this.getTemplate());
  }

  public update(state: IOptions): void {
    const fill = this.root.querySelector('[data-id="fill"]') as HTMLElement;
    const { orientation = 'horizontal', range = false } = state;
    let { valueTo = 100, valueFrom = 0 } = state;

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

  private getTemplate(): string {
    const { color = 'orange', orientation = 'horizontal' } = this.state;

    return `
      <div class="slider__fill slider__fill_${orientation} slider__fill_${color} "data-id="fill"></div>
    `;
  }
}

export default Fill;
