import Observer from 'Source/Observer/Observer';
import { IOptions, ScaleCoords, PageCoords } from 'Components/interfaces';

class SliderComponent extends Observer {
  public state: Partial<IOptions>;

  public root: HTMLElement;

  constructor(options: Partial<IOptions>, root: HTMLElement) {
    super();
    this.root = root;
    this.state = options;
  }

  public update(state: Partial<IOptions>, target?:string): void {
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
    orientation: string,
    scaleCoords: ScaleCoords,
    pageCoords: PageCoords,
  ): number {
    const horizontal = orientation === 'horizontal';
    const { pageX, pageY } = pageCoords;
    const { left, bottom, width, height } = scaleCoords;

    if (horizontal) {
      return ((pageX - left) / width) * 100;
    }
    return ((bottom - pageY) / height) * 100;
  }
}

export default SliderComponent;
