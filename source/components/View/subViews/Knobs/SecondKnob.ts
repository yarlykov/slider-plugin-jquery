import './knobs.scss';
import SliderComponent from '../SliderComponent';
import { IOptions } from '../../../interfaces';
import {
  fromValueToPercent,
  getValueWithStep,
} from '../../../../utils/utils';

class SecondKnob extends SliderComponent {
  scale!: HTMLElement;

  secondKnob!: HTMLElement;

  public display(): void {
    this.scale = this.root.querySelector('[data-id="scale"]') as HTMLElement;
    if (!this.scale) throw new Error('Scale element is not found');

    this.scale.insertAdjacentHTML('beforeend', this.getTemplate());
    this.secondKnob = this.root.querySelector(
      '[data-knob="second"]',
    ) as HTMLElement;

    this.addEventListeners();
  }

  public update(state: IOptions): void {
    this.state = { ...state };
    const { orientation = 'horizontal' } = this.state;

    if (this.secondKnob) {
      const directionOfMove = orientation === 'horizontal' ? 'left' : 'bottom';
      const { valueTo = 0 } = state;

      this.secondKnob.style[directionOfMove] = `${fromValueToPercent(
        state,
        valueTo,
      )}%`;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onPointerDown(_pointerEvent?: PointerEvent): void {
    const {
      min = 0,
      max = 100,
      step = 1,
      orientation = 'horizontal',
    } = this.state;

    document.onpointermove = (pointerEvent) => {
      pointerEvent.preventDefault();
      this.secondKnob.ondragstart = () => false;
      const scaleCoords = this.getCoords(this.scale);

      const pageCoords = this.getPageCoords(pointerEvent);
      const position = this.getPosition(orientation, scaleCoords, pageCoords);
      const correctValue = getValueWithStep(min, max, step, position);

      this.emit('changeValue', correctValue.toFixed());
    };

    document.onmouseup = () => {
      document.onpointermove = null;
      document.onmouseup = null;
    };
  }

  private onKeyDown(event: KeyboardEvent): void {
    const { valueTo = 0, step = 1 } = this.state;
    const { code } = event;

    let newValue = 0;

    if (code === 'ArrowRight' || code === 'ArrowUp') {
      newValue = valueTo + step;
      this.emit('changeValue', newValue);
    }
    if (code === 'ArrowLeft' || code === 'ArrowDown') {
      newValue = valueTo - step;
      this.emit('changeValue', newValue);
    }
  }

  private addEventListeners(): void {
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.secondKnob.addEventListener('pointerdown', this.onPointerDown);
    this.secondKnob.addEventListener('keydown', this.onKeyDown);
  }

  private getTemplate(): string {
    const { orientation = 'horizontal', color = 'orange' } = this.state;

    return `
      <div class="slider__knob slider__knob_${orientation} slider__knob_${color}" 
      data-knob="second" role="slider" tabindex="0"></div>
    `;
  }
}

export default SecondKnob;
