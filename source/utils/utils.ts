import { IOptions, MainStateSettings } from 'Components/interfaces';

const fromValueToPercent = (state: IOptions | MainStateSettings, value: number): number => {
  const { min, max, step } = state;

  const stepCount = (max - min) / step;
  const stepPercent = 100 / stepCount;
  const percent = ((value - min) / step) * stepPercent;

  if (percent > 100) return 100;
  if (percent < 0) return 0;

  return percent;
}

const getValueWithStep = (
  min: number,
  max: number,
  step: number,
  valueInPercent: number,
): number => {
  const stepCount = (max - min) / step;
  const stepPercent = 100 / stepCount;
  const stepPosition = Math.round(valueInPercent / stepPercent) * step;
  const valueWithStep = stepPosition + min;
  
  if (valueInPercent >= 100) return valueInPercent * valueWithStep;  
  
  return valueWithStep;
}

const changeFirstLetterToLower = (str: string): string => str[0].toLowerCase() + str.slice(1);

const checkColor = (color: string): boolean => ['orange', 'green'].includes(color);
const checkOrientation = (orientation: string): boolean => ['vertical', 'horizontal'].includes(orientation);

export {
  fromValueToPercent,
  getValueWithStep,
  changeFirstLetterToLower,
  checkColor,
  checkOrientation
};
