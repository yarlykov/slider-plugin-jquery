import { IOptions, Coords } from '../../interfaces';
import Observer from '../../../Observer/Observer';

class SliderComponent extends Observer {
  public state: IOptions;

  public root: HTMLElement;

  constructor(options: IOptions = {}, root: HTMLElement) {
    super();
    this.root = root;
    this.state = options;
  }

  public update(state: IOptions): void {
    this.state = { ...state };
  }

  public getCoords(elem: HTMLElement): Coords {
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

  public getPageCoords(event: PointerEvent): Coords {
    const { pageX } = event;
    const { pageY } = event;

    return {
      pageX,
      pageY,
    };
  }

  public getPosition(
    orientation: string,
    sliderCoords: Coords,
    pageCoords: Coords,
  ): number {
    const horizontal = orientation === 'horizontal';
    const { pageX = 0, pageY = 0 } = pageCoords;
    const { left = 0, bottom = 0, width = 0, height = 0 } = sliderCoords;

    if (horizontal) {
      return ((pageX - left) / width) * 100;
    }
    return ((bottom - pageY) / height) * 100;
  }
}

export default SliderComponent;
