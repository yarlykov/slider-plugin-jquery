import { KnobEvents } from '../../../../Observer/events';
import { fromValueToPercent, getValueWithStep } from '../../../../utils/utils';
import { IOptions } from '../../../interfaces';
import SliderComponent from '../SliderComponent';
import './knobs.scss';

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
  public handleKnobPointerDown(_pointerEvent: PointerEvent): void {
    const {
      min = 0,
      max = 100,
      step = 1,
      orientation = 'horizontal',
    } = this.state;

    document.onpointermove = (pointerEvent) => {
      pointerEvent.preventDefault();
      if (this.knob) {
        this.knob.ondragstart = () => false;
        this.knob.style.zIndex = '1';
      }
      const scaleCoords = this.scale ? this.getCoords(this.scale) : {};
      const pageCoords = this.getPageCoords(pointerEvent);
      const position = this.getPosition(orientation, scaleCoords, pageCoords);
      const correctValue = getValueWithStep(min, max, step, position);

      this.emit(KnobEvents.VALUE_CHANGED, correctValue.toFixed());
    };

    document.onpointerup = () => {
      document.onpointermove = null;
      document.onpointerup = null;
    };
  }

  private handleKnobKeyDown(event: KeyboardEvent): void {
    const { valueFrom = 0, step = 1 } = this.state;
    const { code } = event;

    if (code === 'ArrowRight' || code === 'ArrowUp') {
      const newValue = valueFrom + step;
      this.emit(KnobEvents.VALUE_CHANGED, newValue);
    }
    if (code === 'ArrowLeft' || code === 'ArrowDown') {
      const newValue = valueFrom - step;
      this.emit(KnobEvents.VALUE_CHANGED, newValue);
    }
  }

  private addEventListeners(): void {
    if (this.knob) {
      this.knob.addEventListener('pointerdown', this.handleKnobPointerDown.bind(this));
      this.knob.addEventListener('keydown', this.handleKnobKeyDown.bind(this));
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
