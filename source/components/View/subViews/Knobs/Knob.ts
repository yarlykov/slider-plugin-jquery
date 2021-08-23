import './knobs.scss';
import SliderComponent from '../SliderComponent';
import { IOptions } from '../../../interfaces';
import { fromValueToPercent, getValueWithStep } from '../../../../utils/utils';

class Knob extends SliderComponent {
  private scale!: HTMLElement | null;

  private knob!: HTMLElement | null;

  public display(): void {
    this.scale = this.root.querySelector('[data-id="scale"]');
    if (!this.scale) throw new Error('Scale element is not found');

    this.scale.insertAdjacentHTML('beforeend', this.getTemplate());
    this.knob = this.root.querySelector('[data-id="knob"]');

    this.addEventListeners();
  }

  public update(state: IOptions): void {
    this.state = { ...state };
    const { orientation } = this.state;

    if (this.knob) {
      const directionOfMove = orientation === 'horizontal' ? 'left' : 'bottom';
      const { valueFrom = 0 } = state;

      this.knob.style[directionOfMove] = `${fromValueToPercent(
        state,
        valueFrom,
      )}%`;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onPointerDown(_pointerEvent: PointerEvent): void {
    const {
      min = 0,
      max = 100,
      step = 1,
      orientation = 'horizontal',
    } = this.state;

    document.onpointermove = (pointerEvent) => {
      pointerEvent.preventDefault();
      if (this.knob) this.knob.ondragstart = () => false;
      const scaleCoords = this.scale ? this.getCoords(this.scale) : {};
      const pageCoords = this.getPageCoords(pointerEvent);
      const position = this.getPosition(orientation, scaleCoords, pageCoords);
      const correctValue = getValueWithStep(min, max, step, position);

      this.emit('changeValue', correctValue.toFixed());
    };

    document.onpointerup = () => {
      document.onpointermove = null;
      document.onpointerup = null;
    };
  }

  private onKeyDown(event: KeyboardEvent): void {
    const { valueFrom = 0, step = 1 } = this.state;
    const { code } = event;

    if (code === 'ArrowRight' || code === 'ArrowUp') {
      const newValue = valueFrom + step;
      this.emit('changeValue', newValue);
    }
    if (code === 'ArrowLeft' || code === 'ArrowDown') {
      const newValue = valueFrom - step;
      this.emit('changeValue', newValue);
    }
  }

  private addEventListeners(): void {
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    if (this.knob) {
      this.knob.addEventListener('pointerdown', this.onPointerDown);
      this.knob.addEventListener('keydown', this.onKeyDown);
    }
  }

  private getTemplate(): string {
    const { orientation = 'horizontal', color = 'orange' } = this.state;

    return `
      <div class="slider__knob slider__knob_${orientation} slider__knob_${color}" 
        data-id="knob" role="slider" tabindex="0"></div>
    `;
  }
}

export default Knob;
