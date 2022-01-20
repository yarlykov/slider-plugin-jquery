import Observer from 'Source/Observer/Observer';
import { IOptions, ScaleCoords, PageCoords, Orientation, OptionsKnobValues } from 'Components/interfaces';
import { KnobEvents, LabelsEvents, ScaleEvents } from 'Root/source/Observer/events';
import { TargetType } from 'Components/View/Slider/Slider';

type SliderComponentEvent = 
  | {
      type: KnobEvents.KNOB_VALUE_FROM_CHANGED | KnobEvents.KNOB_VALUE_TO_CHANGED,
      data: number
    }
  | {
      type: KnobEvents.KNOB_INCREMENT,
      data: OptionsKnobValues
    }
  | {
      type: KnobEvents.KNOB_DECREMENT,
      data: OptionsKnobValues
    }
  | { 
      type: LabelsEvents.LABELS_VALUE_CHANGED,
      data: number
    }
  | {
      type: ScaleEvents.SCALE_VALUE_CHANGED,
      data: number
    }

abstract class SliderComponent extends Observer<SliderComponentEvent> {
  protected readonly state: IOptions;

  protected readonly root: HTMLElement;

  protected readonly target: TargetType;

  protected readonly id: string | null;

  constructor(
    options: IOptions,
    root: HTMLElement,
    target: TargetType,
    id?: string | null,
  ) {
    super();
    this.root = root;
    this.state = options;
    this.target = target;
    this.id = id || null;
  }

  public update(state: IOptions): void {
    if (!state) throw new Error('The state for updating is not transferred')
  }

  protected getPosition(event: PointerEvent): number {
    const { orientation } = this.state;
    const scaleNode = this.root.querySelector('.js-slider__scale');
    const scaleCoords = scaleNode ? this.getCoords(scaleNode) : null;
    const pageCoords = this.getPageCoords(event);
    const horizontal = orientation === 'horizontal';
    const mockValue = 50;

    if (scaleCoords === null) return mockValue;
    const { pageX, pageY } = pageCoords;
    const { left, bottom, width, height } = scaleCoords;

    if (horizontal) {
      return ((pageX - left) / width) * 100;
    }
    return ((bottom - pageY) / height) * 100;
  }

  private getCoords(elem: Element): ScaleCoords {
    const boxLeft = elem.getBoundingClientRect().left;
    const boxTop = elem.getBoundingClientRect().top;
    const boxRight = elem.getBoundingClientRect().right;
    const boxBottom = elem.getBoundingClientRect().bottom;
    const offsetX = window.pageXOffset;
    const offsetY = window.pageYOffset;

    return {
      left: boxLeft + offsetX,
      bottom: boxBottom + offsetY,
      width: boxRight - boxLeft,
      height: boxBottom - boxTop,
    };
  }

  private getPageCoords(event: PointerEvent): PageCoords {
    const { pageX } = event;
    const { pageY } = event;

    return {
      pageX,
      pageY,
    };
  }
}

export default SliderComponent;
