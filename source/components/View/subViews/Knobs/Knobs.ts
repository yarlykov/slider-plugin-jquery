import { fromValueToPercent, getValueWithStep } from 'Source/utils/utils';
import { KnobEvents } from 'Source/Observer/events';
import defaultState from 'Source/defaultState';
import SliderComponent from 'Components/View/subViews/SliderComponent';
import { SecondTooltip, Tooltip } from 'Components/View/subViews/Tooltips/Tooltips';
import { IOptions } from 'Components/interfaces';
import './knobs.scss';

class Knobs extends SliderComponent {
  public scale!: HTMLElement | null;

  public valueFrom!: HTMLElement | null;

  public valueTo!: HTMLElement | null;

  public init(): void {
    this.scale = this.root.querySelector('.js-slider__scale');
    if (!this.scale) throw new Error('Scale element is not found');
    this.valueFrom = this.root.querySelector('.js-slider__knob');
    this.valueTo = this.root.querySelector('.js-slider__second-knob');

    const { tooltips } = this.state;
    if (tooltips) this.addTooltips();
  }

  public update(state: Partial<IOptions>, target: string): void {
    this.state = { ...state };

    const targetValue = target === KnobEvents.VALUE_FROM_CHANGED 
      ? 'valueFrom'
      : 'valueTo'
    const { orientation = defaultState.orientation} = this.state;

    if (this[targetValue]) {
      const directionOfMove = orientation === 'horizontal' ? 'left' : 'bottom';
      const value  = state[targetValue];

      this[targetValue]!.style[directionOfMove] = `${fromValueToPercent(
        state,
        Number(value),
      )}%`;
    }
  }

  public handleKnobsPointerDown(target: string): void {
    const {
      min,
      max,
      step,
      orientation = defaultState.orientation,
    } = this.state;

    const zIndex = target === KnobEvents.VALUE_FROM_CHANGED ? '1' : '0'
    
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
      const scaleCoords = this.scale ? this.getCoords(this.scale) : {};
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

  public handleKnobsKeyDown(event: KeyboardEvent, target: string): void {
    const targetValue = target === KnobEvents.VALUE_FROM_CHANGED 
      ? 'valueFrom'
      : 'valueTo'
    const value = this.state[targetValue];
    const { step = defaultState.step } = this.state;
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
    const hasFirstTooltip = this.valueFrom?.querySelector('.js-slider__tooltip-first')
    const hasSecondTooltip = this.valueTo?.querySelector('.js-slider__tooltip-second')

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
    orientation = 'horizontal',
    color = 'orange',
    target: string
  ): string {
    let knobElementClass = 'knob'

    if (target === KnobEvents.VALUE_TO) {
      knobElementClass = 'second-knob'
    }

    return `
      <div
        class="slider__knob
        js-slider__${knobElementClass}
        slider__knob_${orientation}
        slider__knob_${color}" 
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

  public update(state: Partial<IOptions>): void {
    super.update(state, KnobEvents.VALUE_FROM_CHANGED)
  }

  public handleKnobPointerDown(): void {
    super.handleKnobsPointerDown(KnobEvents.VALUE_FROM_CHANGED)
  }

  private handleKnobKeyDown(event: KeyboardEvent): void {
    super.handleKnobsKeyDown(event, KnobEvents.VALUE_FROM_CHANGED);
  }

  private addEventListeners(): void {
    if (this.valueFrom) {
      this.valueFrom.addEventListener('pointerdown', this.handleKnobPointerDown.bind(this));
      this.valueFrom.addEventListener('keydown', this.handleKnobKeyDown.bind(this));
    }
  }

  public static getTemplate(color = 'orange', orientation = 'horizontal'): string {
    return super.getTemplate(color, orientation, KnobEvents.VALUE_FROM)
  }
}

class SecondKnob extends Knobs {
  public init():void {
    super.init();

    this.addEventListeners();
  }

  public update(state: Partial<IOptions>): void {
    super.update(state, KnobEvents.VALUE_TO_CHANGED)
  }

  public handleSecondKnobPointerDown(): void {
    super.handleKnobsPointerDown(KnobEvents.VALUE_TO_CHANGED)
  }

  private handleSecondKnobKeyDown(event: KeyboardEvent): void {
    super.handleKnobsKeyDown(event, KnobEvents.VALUE_TO_CHANGED);
  }

  private addEventListeners(): void {
    if (this.valueTo) {
      this.valueTo.addEventListener('pointerdown', this.handleSecondKnobPointerDown.bind(this));
      this.valueTo.addEventListener('keydown', this.handleSecondKnobKeyDown.bind(this));
    }
  }

  public static getTemplate(orientation = 'horizontal', color = 'orange'): string {
    return super.getTemplate(color, orientation, KnobEvents.VALUE_TO)
  }
}

export { Knob, SecondKnob };