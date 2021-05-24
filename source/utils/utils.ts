import { IOptions } from '../components/interfaces';

function createElement(tag: string, className?: string[]): HTMLElement {
  const element = document.createElement(tag);

  if (className) element.classList.add(...className);

  return element;
}
/* 
* Этот алгоритм работает когда 
* передаются значения положения ползунка на странице
*/
function calcStepForElementRender(state: IOptions): number {
  let { min = 0, max = 0, step = 0, currentValue = 0 } = state;

  let stepCount = (max - min) / step;
  let stepPercent = 100 / stepCount;
  let position = Math.round(currentValue / stepPercent) * stepPercent;
  let elemPosition = Number(position.toFixed());

  if (elemPosition < 0) elemPosition = 0;
  if (elemPosition > 100) elemPosition = 100;

  return Number(elemPosition);
}
/* 
* Этот алгоритм работает когда 
* значения ползунка нужно пересчитать в значения шкалы
*/

function fromPercentToValue(state: IOptions): number {
  let { min = 0, max = 0, step = 0, currentValue = 0 } = state;

  if (currentValue < 0) currentValue = 0;
  if (currentValue > 100) currentValue = 100;

  let stepCount = (max - min) / step;
  let stepPercent = 100 / stepCount;
  let elemPosition = Math.round(currentValue / stepPercent) * stepPercent;
  let interimValue = (elemPosition / stepPercent) * step;
  let value = interimValue + min;

  if (value > max) value = max;

  return Number(value);
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
  let percent = Math.round(((currentValue - min) / step) * stepPercent);
  
  if (percent > 100) percent = 100;
  if (percent < 0) percent = 0;

  return percent;
}

 function getCoords(elem: HTMLElement): Object {
    let boxLeft = elem.getBoundingClientRect().left;
    let boxRight = elem.getBoundingClientRect().right;

    return {
      left: boxLeft + pageXOffset,
      width: boxRight - boxLeft,
    };
  }

export {
  createElement,
  calcStepForElementRender,
  fromPercentToValue,
  fromValueToPercent,
  getCoords
};
