import { IOptions } from '../components/interfaces';

function createElement(tag: string, className?: string[]): HTMLElement {
  const element = document.createElement(tag);

  if (className) element.classList.add(...className);

  return element;
}

/*
 * Этот алгоритм пересчитывает
 * переданные значения в проценты
 * исходя из диапазона
 * например если задавать значения из контрольной панели
 */
function fromValueToPercent(state: IOptions) {
  let { min = 0, max = 0, step = 0, currentValue = 0 } = state;

  let stepCount = (max - min) / step;
  let stepPercent = 100 / stepCount;
  let percent = ((currentValue - min) / step) * stepPercent;

  if (percent > 100) percent = 100;
  if (percent < 0) percent = 0;

  return percent;
}

function getSliderCoords(elem: HTMLElement): Object {
  let boxLeft = elem.getBoundingClientRect().left;
  let boxTop = elem.getBoundingClientRect().top;
  let boxRight = elem.getBoundingClientRect().right;
  let boxBottom = elem.getBoundingClientRect().bottom;

  return {
    left: boxLeft + pageXOffset,
    bottom: boxBottom + pageYOffset,
    width: boxRight - boxLeft,
    height: boxBottom - boxTop,
  };
}

function getPageCoords(event: Event) {
  const pageX = event.pageX;
  const pageY = event.pageY;

  return {
    pageX,
    pageY,
  };
}

function getPosition(
  orientation: string,
  sliderCoords: object,
  pageCoords: object,
): number {
  const horizontal = orientation === 'horizontal';
  let position = 0;

  if (horizontal) {
    position =
      ((pageCoords.pageX - sliderCoords.left) / sliderCoords.width) * 100;
  } else {
    position =
      ((sliderCoords.bottom - pageCoords.pageY) / sliderCoords.height) * 100;
  }

  return position;
}

export {
  createElement,
  fromValueToPercent,
  getSliderCoords,
  getPageCoords,
  getPosition,
};
