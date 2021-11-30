import { IOptions } from '../components/interfaces';

const fromValueToPercent = (state: Partial<IOptions>, value: number): number => {
  const { min = 0, max = 1, step = 1 } = state;

  const stepCount = (max - min) / step;
  const stepPercent = 100 / stepCount;
  const percent = ((value - min) / step) * stepPercent;

  if (percent > 100) return 100;
  if (percent < 0) return 0;

  return percent;
}

const getValueWithStep = (
  min = 0,
  max = 0,
  step = 1,
  valueInPercent = 0,
): number => {
  const stepCount = (max - min) / step;
  const stepPercent = 100 / stepCount;
  const stepPosition = Math.round(valueInPercent / stepPercent) * step;
  const valueWithStep = stepPosition + min;

  return valueWithStep;
}

const changeFirstLetterToLower = (str: string): string => str[0].toLowerCase() + str.slice(1);

export { fromValueToPercent, getValueWithStep, changeFirstLetterToLower };
