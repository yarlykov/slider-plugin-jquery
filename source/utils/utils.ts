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
function fromValueToPercent(state: IOptions, value: number) {
  const { min = 0, max = 0, step = 1 } = state;

  const stepCount = (max - min) / step;
  const stepPercent = 100 / stepCount;
  let percent = ((value - min) / step) * stepPercent;

  if (percent > 100) percent = 100;
  if (percent < 0) percent = 0;

  return percent;
}

function getValueWithStep(
  min = 0,
  max = 0,
  step = 1,
  valueInPercent = 0,
) {
  const stepCount = (max - min) / step;
  const stepPercent = 100 / stepCount;
  const stepPosition = Math.round(valueInPercent / stepPercent) * step;
  const valueWithStep = stepPosition + min;

  return valueWithStep;
}

function getCoords(elem: HTMLElement): Object {
  const boxLeft = elem.getBoundingClientRect().left;
  const boxTop = elem.getBoundingClientRect().top;
  const boxRight = elem.getBoundingClientRect().right;
  const boxBottom = elem.getBoundingClientRect().bottom;

  return {
    left: boxLeft + pageXOffset,
    bottom: boxBottom + pageYOffset,
    width: boxRight - boxLeft,
    height: boxBottom - boxTop,
  };
}

function getPageCoords(event: Event) {
  const { pageX } = event;
  const { pageY } = event;

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
    position = ((pageCoords.pageX - sliderCoords.left) / sliderCoords.width) * 100;
  } else {
    position = ((sliderCoords.bottom - pageCoords.pageY) / sliderCoords.height) * 100;
  }

  return position;
}

export {
  createElement,
  fromValueToPercent,
  getCoords,
  getPageCoords,
  getPosition,
  getValueWithStep,
};
