import { KnobEvents } from '../../../../Observer/events';
import { fromValueToPercent, getValueWithStep } from '../../../../utils/utils';
import { IOptions } from '../../../interfaces';
import SliderComponent from '../SliderComponent';
import './knobs.scss';

class SecondKnob extends SliderComponent {
  scale!: HTMLElement | null;

  secondKnob!: HTMLElement | null;

  knob!: HTMLElement | null;

  public display(): void {
    this.scale = this.root.querySelector('.js-slider__scale');
    if (!this.scale) throw new Error('Scale element is not found');

    this.scale.insertAdjacentHTML('beforeend', this.getTemplate());
    this.knob = this.root.querySelector('.js-slider__knob');
    this.secondKnob = this.root.querySelector('.js-slider__second-knob');

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
  public handleSecondKnobPointerDown(_pointerEvent?: PointerEvent): void {
    const {
      min = 0,
      max = 100,
      step = 1,
      orientation = 'horizontal',
    } = this.state;

    document.onpointermove = (pointerEvent) => {
      pointerEvent.preventDefault();
      if (this.secondKnob) this.secondKnob.ondragstart = () => false;
      if (this.knob) this.knob.style.zIndex = '0';
      const scaleCoords = this.scale ? this.getCoords(this.scale) : {};

      const pageCoords = this.getPageCoords(pointerEvent);
      const position = this.getPosition(orientation, scaleCoords, pageCoords);
      const correctValue = getValueWithStep(min, max, step, position);

      this.emit(KnobEvents.VALUE_CHANGED, correctValue.toFixed());
    };

    document.onmouseup = () => {
      document.onpointermove = null;
      document.onmouseup = null;
    };
  }

  private handleSecondKnobKeyDown(event: KeyboardEvent): void {
    const { valueTo = 0, step = 1 } = this.state;
    const { code } = event;

    if (code === 'ArrowRight' || code === 'ArrowUp') {
      const newValue = valueTo + step;
      this.emit(KnobEvents.VALUE_CHANGED, newValue);
    }
    if (code === 'ArrowLeft' || code === 'ArrowDown') {
      const newValue = valueTo - step;
      this.emit(KnobEvents.VALUE_CHANGED, newValue);
    }
  }

  private addEventListeners(): void {
    if (this.secondKnob) {
      this.secondKnob.addEventListener('pointerdown', this.handleSecondKnobPointerDown.bind(this));
      this.secondKnob.addEventListener('keydown', this.handleSecondKnobKeyDown.bind(this));
    }
  }

  private getTemplate(): string {
    const { orientation = 'horizontal', color = 'orange' } = this.state;

    return `
      <div
        class="slider__knob
        js-slider__second-knob
        slider__knob_${orientation}
        slider__knob_${color}" 
        data-knob="second"
        role="slider"
        tabindex="0"
      ></div>
    `;
  }
}

export default SecondKnob;
