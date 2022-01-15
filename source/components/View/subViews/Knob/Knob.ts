import {
  checkColor,
  checkOrientation,
  fromValueToPercent,
  getValueWithStep
} from 'Source/utils/utils';
import { KnobEvents } from 'Source/Observer/events';
import { Color, IOptions, Orientation } from 'Components/interfaces';
import { TargetType } from 'Components/View/Slider/Slider';
import SliderComponent from 'Components/View/subViews/SliderComponent';
import './knob.scss';

type KnobEventTarget = KnobEvents.KNOB_VALUE_FROM_CHANGED | KnobEvents.KNOB_VALUE_TO_CHANGED;

class Knob extends SliderComponent {
  private currentState!: IOptions;

  private knobTarget!: KnobEventTarget; 

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
    this.knob.addEventListener('pointerdown', this.handleKnobCheckTarget.bind(this));
    this.knob.addEventListener('pointerdown', this.handleKnobPointerDown.bind(this));
    this.knob.addEventListener('keydown', this.handleKnobCheckTarget.bind(this));
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

  public setKnobTarget(knobEventTarget: KnobEventTarget): void {
    this.knobTarget = knobEventTarget;
  }

  public handleKnobPointerDown(): void {    
    const {
      min,
      max,
      step,
      orientation,
    } = this.currentState;
    const scale: HTMLElement | null = this.root.querySelector('.js-slider__scale');
    
    const handleKnobPointerMove = (pointerEvent: PointerEvent):void => {
      pointerEvent.preventDefault();
      this.knob.ondragstart = () => false;
  
      const scaleCoords = scale ? this.getCoords(scale) : null;
      const pageCoords = this.getPageCoords(pointerEvent);
      const position = this.getPosition(orientation, scaleCoords, pageCoords);
      const correctValue = getValueWithStep(min, max, step, position);
      
      this.emit(this.knobTarget, correctValue.toFixed());
    }

    const handleKnobPointerUp = (): void => {
      document.removeEventListener('pointerup', handleKnobPointerUp)
      document.removeEventListener('pointermove', handleKnobPointerMove);
    }

    document.addEventListener('pointermove', handleKnobPointerMove)
    document.addEventListener('pointerup', handleKnobPointerUp);
  }

  private handleKnobKeyDown(event: KeyboardEvent): void {
    const targetValue = this.knobTarget === KnobEvents.KNOB_VALUE_FROM_CHANGED
      ? 'valueFrom'
      : 'valueTo'
    
    const value = this.currentState[targetValue];
    const { step } = this.currentState;
    const { code } = event;
    
    if (code === 'ArrowRight' || code === 'ArrowUp') {
      const newValue = Number(value) + step;
      this.emit(this.knobTarget, newValue);
    }
    if (code === 'ArrowLeft' || code === 'ArrowDown') {
      const newValue = Number(value) - step;
      this.emit(this.knobTarget, newValue);
    }
  }

  private handleKnobCheckTarget(event: PointerEvent | KeyboardEvent): void {
    if (event.target instanceof HTMLElement) {
    const { target } = event;

    const isFirstKnob = target.dataset.id === 'knob'
        || target.dataset.id === 'tooltip-first'
        || target.dataset.id === 'tooltip-value-first'
    this.knobTarget = isFirstKnob
      ? KnobEvents.KNOB_VALUE_FROM_CHANGED
      : KnobEvents.KNOB_VALUE_TO_CHANGED
    }
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
