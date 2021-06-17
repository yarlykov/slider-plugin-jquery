import { fromValueToPercent, getValueWithStep } from '../../utils/utils';
import { IOptions } from '../interfaces';

class Validation {
  min!: number;

  max!: number;

  step!: number;

  valueFrom!: number;

  valueTo!: number;

  checkState(state: IOptions) {
    this.min = state.min || 0;
    this.max = state.max || 1;
    this.step = state.step || 1;
    this.valueFrom = state.valueFrom || 0;
    this.valueTo = state.valueTo || 0;

    this.checkMinMax(this.min, this.max);
    this.checkStep(this.max, this.step);

    if (state.range) {
      this.checkMinRange(this.valueFrom);
      this.checkMaxRange(this.valueTo);
      this.checkRangeMinMax(this.valueFrom, this.valueTo);
    }

    const result = {
      ...state,
      min: this.min,
      max: this.max,
      step: this.step,
      valueFrom: this.checkValue(this.valueFrom),
      valueTo: this.valueTo,
    };

    return result;
  }

  checkValue(value: number): number {
    const valueInPercent = fromValueToPercent(
      {
        min: this.min,
        max: this.max,
        step: this.step,
      },
      value,
    );

    let correctValue = getValueWithStep(
      this.min,
      this.max,
      this.step,
      valueInPercent,
    );

    if (valueInPercent >= 100 && correctValue !== this.max) correctValue = this.max;

    return correctValue;
  }

  checkMinRange(value: number): number {
    if (value >= this.valueTo) value = this.valueTo;
    return this.checkValue(value);
  }

  checkMaxRange(value: number): number {
    if (value <= this.valueFrom) value = this.valueFrom;
    return this.checkValue(value);
  }

  checkStep(max: number, step: number) {
    if (step <= 0) this.step = 1;
    if (step > max) this.step = max;
  }

  checkMinMax(min: number, max: number) {
    let swap = 0;
    if (min >= max) {
      swap = min;
      min = max;
      max = swap;
    }
    this.min = min;
    this.max = max;
  }

  checkRangeMinMax(valueFrom: number, valueTo: number) {
    let swap = 0;

    if (valueFrom >= valueTo) {
      swap = valueFrom;
      valueFrom = valueTo;
      valueTo = swap;
    }
    if (valueFrom <= this.min) valueFrom = this.min;
    if (valueTo >= this.max) valueTo = this.max;
    this.valueFrom = this.checkValue(valueFrom);
    this.valueTo = this.checkValue(valueTo);
  }
}

export default Validation;
