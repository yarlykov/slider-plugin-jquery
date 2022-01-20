import {
  checkColor,
  checkOrientation,
  fromValueToPercent,
} from 'Source/utils/utils';
import { KnobEvents } from 'Source/Observer/events';
import { Color, IOptions, Orientation } from 'Components/interfaces';
import { TargetType } from 'Components/View/Slider/Slider';
import SliderComponent from 'Components/View/subViews/SliderComponent';
import './knob.scss';

type KnobEventTarget = KnobEvents.KNOB_VALUE_FROM_CHANGED | KnobEvents.KNOB_VALUE_TO_CHANGED;

class Knob extends SliderComponent {
  private knobTarget!: KnobEventTarget; 

  private knob!: HTMLDivElement;

  constructor(options: IOptions, root: HTMLElement, target: TargetType, id?: string) {
    super(options, root, target, id);
    this.init();
  }

  public update(state: IOptions): void {
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
    const handleKnobPointerMove = (pointerEvent: PointerEvent):void => {
      pointerEvent.preventDefault();
      this.knob.ondragstart = () => false;
  
      const position = this.getPosition(pointerEvent);
      
      this.emit(this.knobTarget, Number(position.toFixed(3)));
    }

    const handleKnobPointerUp = (): void => {
      document.removeEventListener('pointerup', handleKnobPointerUp)
      document.removeEventListener('pointermove', handleKnobPointerMove);
    }

    document.addEventListener('pointermove', handleKnobPointerMove)
    document.addEventListener('pointerup', handleKnobPointerUp);
  }

  private init(): void {
    const { color, orientation } = this.state;
    const colorMod = checkColor(color) ? color : 'orange';
    const orientationMod = checkOrientation(orientation) ? orientation : 'horizontal';

    this.knob = this.createKnob(colorMod, orientationMod);
    this.knob.addEventListener('pointerdown', this.handleKnobCheckTarget.bind(this));
    this.knob.addEventListener('pointerdown', this.handleKnobPointerDown.bind(this));
    this.knob.addEventListener('keydown', this.handleKnobCheckTarget.bind(this));
    this.knob.addEventListener('keydown', this.handleKnobKeyDown.bind(this));
  }

  private handleKnobKeyDown(event: KeyboardEvent): void {
    const targetValue = this.knobTarget === KnobEvents.KNOB_VALUE_FROM_CHANGED
      ? 'valueFrom'
      : 'valueTo'
    const { code } = event;

    if (code !== 'Tab') event.preventDefault();
    
    if (code === 'ArrowRight' || code === 'ArrowUp') {
      this.emit(KnobEvents.KNOB_INCREMENT, targetValue);
    }
    if (code === 'ArrowLeft' || code === 'ArrowDown') {
      this.emit(KnobEvents.KNOB_DECREMENT, targetValue);
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
