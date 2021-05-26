import { fromValueToPercent } from '../../utils/utils';
import { IOptions } from '../interfaces';

class Validation {
  min!: number;
  max!: number;
  rangeMin!: number;
  rangeMax!: number;
  step!: number;
  value!: number;

  checkState(state: IOptions) {
    this.min = state.min || 0;
    this.max = state.max || 0;
    this.rangeMin = state.rangeMin || 0;
    this.rangeMax = state.rangeMax || 0;
    this.step = state.step || 1;
    this.value = state.currentValue || 0;

    this.checkMinMax(this.min, this.max);
    this.checkStep(this.max, this.step);
    this.checkRangeMinMax(this.rangeMin, this.rangeMax);

    return {
      ...state,
      min: this.min,
      max: this.max,
      step: this.step,
      currentValue: this.checkValue(this.value),
      rangeMin: this.rangeMin,
      rangeMax: this.rangeMax,
    };
  }

  checkValue(value: number) {
    const stepCount = (this.max - this.min) / this.step;
    const stepPercent = 100 / stepCount;

    const valueInPercent = fromValueToPercent({
      min: this.min,
      max: this.max,
      step: this.step,
      currentValue: value,
    });
    
    const stepPosition = Math.round(valueInPercent / stepPercent) * this.step;
    let correctValue = stepPosition + this.min;
    
    return correctValue;
  }

  checkStep(max: number, step: number) {
    if (step < 0) this.step = 1;
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

  checkRangeMinMax(rangeMin: number, rangeMax: number) {
    let swap = 0;
    if (rangeMin >= rangeMax) {
      swap = rangeMin;
      rangeMin = rangeMax;
      rangeMax = swap;
    }
    if (rangeMin <= this.min) rangeMin = this.min;
    if (rangeMax >= this.max) rangeMax = this.max;
    this.rangeMin = rangeMin;
    this.rangeMax = rangeMax;
  }
}

export default Validation;
