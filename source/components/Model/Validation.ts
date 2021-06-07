import { fromValueToPercent } from '../../utils/utils';
import { IOptions } from '../interfaces';

class Validation {
  min!: number;
  max!: number;
  step!: number;
  current!: number;
  rangeMax!: number;

  checkState(state: IOptions) {
    this.min = state.min || 0;
    this.max = state.max || 0;
    this.step = state.step || 1;
    this.current = state.current || 0;
    this.rangeMax = state.rangeMax || 0;

    this.checkMinMax(this.min, this.max);
    this.checkStep(this.max, this.step);

    if (state.range) {
      this.checkMinRange(this.current);
      this.checkMaxRange(this.rangeMax);
      this.checkRangeMinMax(this.current, this.rangeMax);
    }
    
    const result = {
      ...state,
      min: this.min,
      max: this.max,
      step: this.step,
      current: this.checkValue(this.current),
      rangeMax: this.rangeMax,
    };
    
    return result;
  }

  checkValue(value: number): number {
    const stepCount = (this.max - this.min) / this.step;
    const stepPercent = 100 / stepCount;

    const valueInPercent = fromValueToPercent(
      {
        min: this.min,
        max: this.max,
        step: this.step,
      },
      value,
    );

    const stepPosition = Math.round(valueInPercent / stepPercent) * this.step;
    let correctValue = stepPosition + this.min;

    if (valueInPercent >= 100 && correctValue !== this.max)
      correctValue = this.max;

    return correctValue;
  }

  checkMinRange(value: number): number {
    if (value >= this.rangeMax) value = this.rangeMax;
    return this.checkValue(value);
  }

  checkMaxRange(value: number): number {
    if (value <= this.current) value = this.current;
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

  checkRangeMinMax(current: number, rangeMax: number) {
    let swap = 0;

    if (current >= rangeMax) {
      swap = current;
      current = rangeMax;
      rangeMax = swap;
    }
    if (current <= this.min) current = this.min;
    if (rangeMax >= this.max) rangeMax = this.max;
    this.current = this.checkValue(current);
    this.rangeMax = this.checkValue(rangeMax);
  }
}

export default Validation;
