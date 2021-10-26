import { IOptions } from '../components/interfaces';

function fromValueToPercent(state: IOptions, value: number): number {
  const { min = 0, max = 1, step = 1 } = state;

  const stepCount = (max - min) / step;
  const stepPercent = 100 / stepCount;
  const percent = ((value - min) / step) * stepPercent;

  if (percent > 100) return 100;
  if (percent < 0) return 0;

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

export { fromValueToPercent, getValueWithStep };
