import Observer from 'Source/Observer/Observer';
import { IOptions, ScaleCoords, PageCoords, Orientation } from 'Components/interfaces';
import { KnobEvents, LabelsEvents, ScaleEvents } from 'Root/source/Observer/events';
import { TargetType } from 'Components/View/Slider/Slider';

type SliderComponentEvent = 
  | {
      type: KnobEvents.KNOB_VALUE_FROM_CHANGED | KnobEvents.KNOB_VALUE_TO_CHANGED,
      data: number
    }
  | {
      type: KnobEvents.KNOB_INCREMENT,
      data: 'valueFrom' | 'valueTo'
    }
  | {
      type: KnobEvents.KNOB_DECREMENT,
      data: 'valueFrom' | 'valueTo'
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

  protected getCoords(elem: HTMLElement): ScaleCoords {
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

  protected getPageCoords(event: PointerEvent): PageCoords {
    const { pageX } = event;
    const { pageY } = event;

    return {
      pageX,
      pageY,
    };
  }

  protected getPosition(
    orientation: Orientation,
    scaleCoords: ScaleCoords | null,
    pageCoords: PageCoords,
  ): number {
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
}

export default SliderComponent;
