import Observer from 'Source/Observer/Observer';
import { IOptions, ScaleCoords, PageCoords, Orientation } from 'Components/interfaces';
import { KnobEvents, LabelsEvents, ScaleEvents } from 'Root/source/Observer/events';
import { TargetType } from 'Components/View/Slider/Slider';

type SliderComponentEvent = 
  | {
      type: KnobEvents.KNOB_VALUE_FROM_CHANGED | KnobEvents.KNOB_VALUE_TO_CHANGED,
      data: number | string
    }
  | { 
      type: LabelsEvents.LABELS_VALUE_FROM_CHANGED,
      data: number
    }
  | { 
      type: LabelsEvents.LABELS_VALUE_TO_CHANGED,
      data: number
    }
  | {
      type: ScaleEvents.SCALE_VALUE_FROM_CHANGED,
      data: number | string
    }
  | {
      type: ScaleEvents.SCALE_VALUE_TO_CHANGED,
      data: number | string
    }
  | {
      type: ScaleEvents.TARGET_TRIGGERED,
      data: PointerEvent
    }
  | {
      type: ScaleEvents.TARGET_MAX_VALUE_TRIGGERED,
      data: PointerEvent
    }

class SliderComponent extends Observer<SliderComponentEvent> {
  public state: IOptions;

  public root: HTMLElement;

  public target: TargetType;

  constructor(options: IOptions, root: HTMLElement, target: TargetType) {
    super();
    this.root = root;
    this.state = options;
    this.target = target;
  }

  public update(state: IOptions, target?: string): void
  public update(state: IOptions): void {
    this.state = { ...state };
  }

  public getCoords(elem: HTMLElement): ScaleCoords {
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

  public getPageCoords(event: PointerEvent): PageCoords {
    const { pageX } = event;
    const { pageY } = event;

    return {
      pageX,
      pageY,
    };
  }

  public getPosition(
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
