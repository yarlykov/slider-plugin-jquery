import { fromValueToPercent, getValueWithStep } from '../../../../utils/utils';
import defaultState from '../../../../defaultState';
import { KnobEvents } from '../../../../Observer/events';
import { IOptions } from '../../../interfaces';
import SliderComponent from '../SliderComponent';
import './knobs.scss';
import { Tooltip } from '../Tooltips/Tooltips';

class Knob extends SliderComponent {
  private scale!: HTMLElement | null;

  private knob!: HTMLElement | null;

  public init(): void {
    this.scale = this.root.querySelector('.js-slider__scale');
    if (!this.scale) throw new Error('Scale element is not found');
    this.knob = this.root.querySelector('.js-slider__knob');

    const { tooltips } = this.state;

    if (tooltips) this.addTooltips();

    this.addEventListeners();
  }

  public update(state: Partial<IOptions>): void {
    this.state = { ...state };
    const { orientation } = this.state;

    if (this.knob) {
      const directionOfMove = orientation === 'horizontal' ? 'left' : 'bottom';
      const { valueFrom = defaultState.valueFrom } = state;

      this.knob.style[directionOfMove] = `${fromValueToPercent(
        state,
        valueFrom,
      )}%`;
    }
  }

  public handleKnobPointerDown(): void {
    const {
      min,
      max,
      step,
      orientation = defaultState.orientation,
    } = this.state;
    
    const handleKnobPointerMove = (pointerEvent: PointerEvent):void => {
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
    }

    const handleKnobPointerUp = ():void => {
      document.removeEventListener('pointerup', handleKnobPointerUp)
      document.removeEventListener('pointermove', handleKnobPointerMove);
    }
    
    document.addEventListener('pointermove', handleKnobPointerMove)
    document.addEventListener('pointerup', handleKnobPointerUp);
  }

  private handleKnobKeyDown(event: KeyboardEvent): void {
    const { valueFrom = defaultState.valueFrom, step = defaultState.step } = this.state;
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

  private addTooltips() {
    const { color, orientation } = this.state;

    if (this.knob) {
      this.knob.insertAdjacentHTML('afterbegin', Tooltip.getTemplate(orientation, color));
    }
  }

  public static getTemplate(color = 'orange', orientation = 'horizontal'): string {
    return `
      <div
        class="slider__knob
        js-slider__knob
        slider__knob_${orientation}
        slider__knob_${color}" 
        data-id="knob"
        role="slider"
        tabindex="0"
      ></div>
    `;
  }
}

export default Knob;
