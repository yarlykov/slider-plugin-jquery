import { IOptions } from '../../interfaces';
import { coords } from '../../interfaces';
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

  public getCoords(elem: HTMLElement): coords {
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

  public getPageCoords(event: PointerEvent): coords {
    const { pageX } = event;
    const { pageY } = event;

    return {
      pageX,
      pageY,
    };
  }

  public getPosition(
    orientation: string,
    sliderCoords: coords,
    pageCoords: coords,
  ): number {
    const horizontal = orientation === 'horizontal';
    let position = 0;
    const { pageX = 0, pageY = 0 } = pageCoords;
    const { left = 0, bottom = 0, width = 0, height = 0 } = sliderCoords;

    if (horizontal) {
      position = ((pageX - left) / width) * 100;
    } else {
      position = ((bottom - pageY) / height) * 100;
    }

    return position;
  }
}

export default SliderComponent;
