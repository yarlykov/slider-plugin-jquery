import { IOptions } from '../components/interfaces';

type coords = {
  pageX?: number;
  pageY?: number;
  left?: number;
  bottom?: number;
  width?: number;
  height?: number;
};

function createElement(tag: string, className?: string[]): HTMLElement {
  const element = document.createElement(tag);

  if (className) element.classList.add(...className);

  return element; // remove function??
}

function fromValueToPercent(state: IOptions, value: number): number {
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
): number {
  const stepCount = (max - min) / step;
  const stepPercent = 100 / stepCount;
  const stepPosition = Math.round(valueInPercent / stepPercent) * step;
  const valueWithStep = stepPosition + min;

  return valueWithStep;
}

function getCoords(elem: HTMLElement): coords {
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

function getPageCoords(event: PointerEvent): coords {
  const { pageX } = event;
  const { pageY } = event;

  return {
    pageX,
    pageY,
  };
}

function getPosition(
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

export {
  createElement,
  fromValueToPercent,
  getCoords,
  getPageCoords,
  getPosition,
  getValueWithStep,
};
