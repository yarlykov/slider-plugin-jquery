import {
  checkColor,
  checkOrientation,
  fromValueToPercent,
  getValueWithStep
} from 'Source/utils/utils';
import { KnobEvents } from 'Source/Observer/events';
import SliderComponent from 'Components/View/subViews/SliderComponent';
import { TargetType } from 'Components/View/Slider/Slider';
import { Color, IOptions, Orientation } from 'Components/interfaces';
import './knob.scss';

class Knob extends SliderComponent {
  private currentState!: IOptions;

  private knob!: HTMLDivElement;

  constructor(options: IOptions, root: HTMLElement, target: TargetType, id?: string) {
    super(options, root, target, id);
    this.init();
  }

  public init(): void {
    const { color, orientation } = this.state;
    const colorMod = checkColor(color) ? color : 'orange';
    const orientationMod = checkOrientation(orientation) ? orientation : 'horizontal';

    this.knob = this.createKnob(colorMod, orientationMod);
    this.knob.addEventListener('pointerdown', this.handleKnobPointerDown.bind(this));
    this.knob.addEventListener('keydown', this.handleKnobKeyDown.bind(this));
  }

  public update(state: IOptions): void {
    this.currentState = { ...state };

    const targetValue = this.target === TargetType.simple 
      ? 'valueFrom'
      : 'valueTo'
    const { orientation } = this.state;

    const directionOfMove = orientation === 'horizontal' ? 'left' : 'bottom';
    const value  = state[targetValue];
    
    this.knob.style[directionOfMove] = `${fromValueToPercent(
      state,
      Number(value),
    )}%`;
  }

  public getKnobNode(): HTMLDivElement {
    return this.knob;
  }

  public handleKnobPointerDown(event: PointerEvent): void {
    const knobTarget =  this.isFirstKnob(event)
      ? KnobEvents.KNOB_VALUE_FROM_CHANGED
      : KnobEvents.KNOB_VALUE_TO_CHANGED
    
    const {
      min,
      max,
      step,
      orientation,
    } = this.currentState;
    const scale: HTMLElement | null = this.root.querySelector('.js-slider__scale');
    
    const handleKnobsPointerMove = (pointerEvent: PointerEvent):void => {
      pointerEvent.preventDefault();
      this.knob.ondragstart = () => false;
  
      const scaleCoords = scale ? this.getCoords(scale) : null;
      const pageCoords = this.getPageCoords(pointerEvent);
      const position = this.getPosition(orientation, scaleCoords, pageCoords);
      const correctValue = getValueWithStep(min, max, step, position);
      
      this.emit(knobTarget, correctValue.toFixed());
    }

    const handleKnobsPointerUp = (): void => {
      document.removeEventListener('pointerup', handleKnobsPointerUp)
      document.removeEventListener('pointermove', handleKnobsPointerMove);
    }
    
    document.addEventListener('pointermove', handleKnobsPointerMove)
    document.addEventListener('pointerup', handleKnobsPointerUp);
  }

  private handleKnobKeyDown(event: KeyboardEvent): void {
    const knobTarget =  this.isFirstKnob(event)
      ? KnobEvents.KNOB_VALUE_FROM_CHANGED
      : KnobEvents.KNOB_VALUE_TO_CHANGED
    const targetValue =  this.isFirstKnob(event) ? 'valueFrom' : 'valueTo'
    
    const value = this.currentState[targetValue];
    const { step } = this.currentState;
    const { code } = event;
    
    if (code === 'ArrowRight' || code === 'ArrowUp') {
      const newValue = Number(value) + step;
      this.emit(knobTarget, newValue);
    }
    if (code === 'ArrowLeft' || code === 'ArrowDown') {
      const newValue = Number(value) - step;
      this.emit(knobTarget, newValue);
    }
  }

  private isFirstKnob(event: PointerEvent | KeyboardEvent): boolean {
    if (event.target instanceof HTMLElement) {
      const { target } = event;
      return target.dataset.id === 'knob'
        || target.dataset.id === 'tooltip-first'
        || target.dataset.id === 'tooltip-value-first'
    }
    return false;
  }

  private createKnob( color: Color, orientation: Orientation ): HTMLDivElement {
    const knobElementClass = this.id ? this.id : 'knob';
    const knob = document.createElement('div');
    knob.classList.add(
      'slider__knob',
      `slider__knob_${orientation}`,
      `slider__knob_${color}`
    );
    knob.setAttribute('data-id', `${knobElementClass}`);
    knob.setAttribute('role', 'slider');
    knob.setAttribute('tabindex', '0');

    return knob;
  }
}

export default Knob;
