import { fromValueToPercent, getValueWithStep } from 'Source/utils/utils';
import { KnobEvents } from 'Source/Observer/events';
import SliderComponent from 'Components/View/subViews/SliderComponent';
import { SecondTooltip, Tooltip } from 'Components/View/subViews/Tooltips/Tooltips';
import { Color, IOptions, Orientation } from 'Components/interfaces';
import './knobs.scss';

type KnobEventTarget = KnobEvents.KNOB_VALUE_FROM_CHANGED | KnobEvents.KNOB_VALUE_TO_CHANGED;

class Knobs extends SliderComponent {
  public scale!: HTMLElement | null;

  public valueFrom!: HTMLElement | null;

  public valueTo!: HTMLElement | null;

  public init(): void {
    this.scale = this.root.querySelector('.js-slider__scale');
    this.valueFrom = this.root.querySelector('[data-id="knob"]');
    this.valueTo = this.root.querySelector('[data-id="second-knob"]');

    const { hasTooltips } = this.state;
    if (hasTooltips) this.addTooltips();
  }

  public update(state: IOptions, target: string): void {
    this.state = { ...state };

    const targetValue = target === KnobEvents.KNOB_VALUE_FROM_CHANGED 
      ? 'valueFrom'
      : 'valueTo'
    const { orientation} = this.state;

    const directionOfMove = orientation === 'horizontal' ? 'left' : 'bottom';
    const value  = state[targetValue];
    const isValueFromTarget = targetValue === 'valueFrom';
    const isValueToTarget = targetValue === 'valueTo';
    
    if (this.valueFrom && isValueFromTarget) {
      this.valueFrom.style[directionOfMove] = `${fromValueToPercent(
        state,
        Number(value),
      )}%`;
    }
    if (this.valueTo && isValueToTarget) {
      this.valueTo.style[directionOfMove] = `${fromValueToPercent(
        state,
        Number(value),
      )}%`;
    }
  }

  public handleKnobsPointerDown(target: KnobEventTarget): void {
    const {
      min,
      max,
      step,
      orientation,
    } = this.state;

    const zIndex = target === KnobEvents.KNOB_VALUE_FROM_CHANGED ? '1' : '0'
    
    const handleKnobsPointerMove = (pointerEvent: PointerEvent):void => {
      pointerEvent.preventDefault();
      if (this.valueFrom) {
        this.valueFrom.ondragstart = () => false;
        this.valueFrom.style.zIndex = zIndex;
      } 
      if (this.valueFrom && this.valueTo){
        this.valueTo.ondragstart = () => false;
        this.valueFrom.style.zIndex = zIndex;
      }
      
      const scaleCoords = this.scale ? this.getCoords(this.scale) : null;
      const pageCoords = this.getPageCoords(pointerEvent);
      const position = this.getPosition(orientation, scaleCoords, pageCoords);
      const correctValue = getValueWithStep(min, max, step, position);
      
      this.emit(target, correctValue.toFixed());
    }

    const handleKnobsPointerUp = (): void => {
      document.removeEventListener('pointerup', handleKnobsPointerUp)
      document.removeEventListener('pointermove', handleKnobsPointerMove);
    }
    
    document.addEventListener('pointermove', handleKnobsPointerMove)
    document.addEventListener('pointerup', handleKnobsPointerUp);
  }

  public handleKnobsKeyDown(event: KeyboardEvent, target: KnobEventTarget): void {
    const targetValue = target === KnobEvents.KNOB_VALUE_FROM_CHANGED 
      ? 'valueFrom'
      : 'valueTo'
    const value = this.state[targetValue];
    const { step } = this.state;
    const { code } = event;

    if (code === 'ArrowRight' || code === 'ArrowUp') {
      const newValue = Number(value) + step;
      this.emit(target, newValue);
    }
    if (code === 'ArrowLeft' || code === 'ArrowDown') {
      const newValue = Number(value) - step;
      this.emit(target, newValue);
    }
  }

  public addTooltips(): void {
    const { color, orientation } = this.state;
    const hasFirstTooltip = this.valueFrom?.querySelector('[data-id="tooltip-first"]')
    const hasSecondTooltip = this.valueTo?.querySelector('[data-id="tooltip-second"]')

    if (this.valueFrom && !hasFirstTooltip) {
      this.valueFrom.insertAdjacentHTML(
        'afterbegin',
        Tooltip.getTemplate(orientation, color)
      );
    }
    if (this.valueTo && !hasSecondTooltip) {
      this.valueTo.insertAdjacentHTML(
        'afterbegin',
        SecondTooltip.getTemplate(orientation, color)
      );
    }
  }

  public static getTemplate(
    color: Color,
    orientation: Orientation,
    target: string
  ): string {
    let knobElementClass = 'knob'

    if (target === KnobEvents.VALUE_TO) {
      knobElementClass = 'second-knob'
    }

    return `
      <div
        class="slider__knob
        slider__knob_${orientation}
        slider__knob_${color}" 
        data-id=${knobElementClass}
        role="slider"
        tabindex="0"
      ></div>
    `;
  }
}

class Knob extends Knobs {
  public init():void {
    super.init();

    this.addEventListeners();
  }

  public update(state: IOptions): void {
    super.update(state, KnobEvents.KNOB_VALUE_FROM_CHANGED)
  }

  public handleKnobPointerDown(): void {
    super.handleKnobsPointerDown(KnobEvents.KNOB_VALUE_FROM_CHANGED)
  }

  private handleKnobKeyDown(event: KeyboardEvent): void {
    super.handleKnobsKeyDown(event, KnobEvents.KNOB_VALUE_FROM_CHANGED);
  }

  private addEventListeners(): void {
    if (this.valueFrom) {
      this.valueFrom.addEventListener('pointerdown', this.handleKnobPointerDown.bind(this));
      this.valueFrom.addEventListener('keydown', this.handleKnobKeyDown.bind(this));
    }
  }

  public static getTemplate(color: Color, orientation: Orientation): string {
    return super.getTemplate(color, orientation, KnobEvents.VALUE_FROM)
  }
}

class SecondKnob extends Knobs {
  public init():void {
    super.init();

    this.addEventListeners();
  }

  public update(state: IOptions): void {
    super.update(state, KnobEvents.KNOB_VALUE_TO_CHANGED)
  }

  public handleSecondKnobPointerDown(): void {
    super.handleKnobsPointerDown(KnobEvents.KNOB_VALUE_TO_CHANGED)
  }

  private handleSecondKnobKeyDown(event: KeyboardEvent): void {
    super.handleKnobsKeyDown(event, KnobEvents.KNOB_VALUE_TO_CHANGED);
  }

  private addEventListeners(): void {
    if (this.valueTo) {
      this.valueTo.addEventListener('pointerdown', this.handleSecondKnobPointerDown.bind(this));
      this.valueTo.addEventListener('keydown', this.handleSecondKnobKeyDown.bind(this));
    }
  }

  public static getTemplate(color: Color, orientation: Orientation): string {
    return super.getTemplate(color, orientation, KnobEvents.VALUE_TO)
  }
}

export { Knob, SecondKnob };
