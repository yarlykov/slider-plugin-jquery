import defaultState from '../../../../defaultState';
import { KnobEvents } from '../../../../Observer/events';
import { fromValueToPercent, getValueWithStep } from '../../../../utils/utils';
import { IOptions } from '../../../interfaces';
import SliderComponent from '../SliderComponent';
import { SecondTooltip } from '../Tooltips/Tooltips';
import './knobs.scss';

class SecondKnob extends SliderComponent {
  scale!: HTMLElement | null;

  secondKnob!: HTMLElement | null;

  knob!: HTMLElement | null;

  public init(): void {
    this.scale = this.root.querySelector('.js-slider__scale');
    if (!this.scale) throw new Error('Scale element is not found');

    this.knob = this.root.querySelector('.js-slider__knob');
    this.secondKnob = this.root.querySelector('.js-slider__second-knob');

    const { color, orientation, tooltips } = this.state;

    if (this.secondKnob && tooltips) {
      this.secondKnob.insertAdjacentHTML('afterbegin', SecondTooltip.getTemplate(orientation, color));
    }

    this.addEventListeners();
  }

  public update(state: Partial<IOptions>): void {
    this.state = { ...state };
    const { orientation = defaultState.orientation } = this.state;

    if (this.secondKnob) {
      const directionOfMove = orientation === 'horizontal' ? 'left' : 'bottom';
      const { valueTo = defaultState.valueTo } = state;

      this.secondKnob.style[directionOfMove] = `${fromValueToPercent(
        state,
        valueTo,
      )}%`;
    }
  }

  public handleSecondKnobPointerDown(): void {
    const {
      min,
      max,
      step,
      orientation = defaultState.orientation,
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
    const { valueTo = defaultState.valueTo, step = defaultState.step } = this.state;
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

  public static getTemplate(orientation = 'horizontal', color = 'orange'): string {
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
