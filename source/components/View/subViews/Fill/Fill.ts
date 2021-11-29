import { fromValueToPercent } from '../../../../utils/utils';
import { IOptions } from '../../../interfaces';
import SliderComponent from '../SliderComponent';
import './fill.scss';

class Fill extends SliderComponent {
  public display(): void {
    const scale = this.root.querySelector('.js-slider__scale');
    if (!scale) throw new Error('Scale element is not found');

    if (this.state.fill)
      return scale.insertAdjacentHTML('afterbegin', this.getTemplate());
  }

  public update(state: IOptions): void {
    const fill: HTMLElement | null = this.root.querySelector('.js-slider__fill');
    const { orientation = 'horizontal', range = false } = state;
    const { valueTo = 100, valueFrom = 0 } = state;
    const isHorizontal = orientation === 'horizontal';
    const wayOfFilling: string = isHorizontal ? 'width' : 'height';
    const wayOfMove: string = isHorizontal ? 'left' : 'bottom';
    const newValueFrom = fromValueToPercent(state, valueFrom);

    if (fill && range) {
      const newValueTo = fromValueToPercent(state, valueTo);
      fill.style[wayOfFilling] = `${newValueTo - newValueFrom}%`;
      fill.style[wayOfMove] = `${newValueFrom}%`;
    } else if (fill) {
      fill.style[wayOfFilling] = `${newValueFrom}%`;
    }
  }

  private getTemplate(): string {
    const { color = 'orange', orientation = 'horizontal' } = this.state;

    return `
      <div
        class="slider__fill
        js-slider__fill
        slider__fill_${orientation}
        slider__fill_${color}
        "data-id="fill"
      ></div>
    `;
  }
}

export default Fill;
