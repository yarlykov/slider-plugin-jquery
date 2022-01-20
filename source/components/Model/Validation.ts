/* eslint-disable no-param-reassign */
import defaultState from 'Root/source/defaultState';
import { fromValueToPercent, getValueWithStep } from 'Root/source/utils/utils';
import { IOptions } from 'Components/interfaces';

class Validation {
  private min!: number;

  private max!: number;

  private step!: number;

  private valueFrom!: number;

  private valueTo!: number;

  public checkState(state: IOptions): IOptions {
    const { min, max, step, valueFrom, valueTo } = state;
    this.min = min;
    this.max = max;
    this.step = step;
    this.valueFrom = valueFrom;
    this.valueTo = valueTo;
    
    this.checkMinMax(this.min, this.max);
    this.step = this.checkStep(this.min, this.max, this.step);

    if (state.isRange) {
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

  public checkValue(value: number): number {
    const valueInPercent = fromValueToPercent(
      {
        min: this.min,
        max: this.max,
        step: this.step,
      },
      value,
    );

    return this.fromPercentToCorrect(valueInPercent);
  }

  public fromPercentToCorrect(percentValue: number): number {
    const correctValue = getValueWithStep(
      this.min,
      this.max,
      this.step,
      percentValue,
    );

    if (correctValue > this.max) return this.max;

    return correctValue;
  }

  public checkMinRange(value: number): number {
    if (value >= this.valueTo) value = this.valueTo;
    return this.checkValue(value);
  }

  public checkMaxRange(value: number): number {
    if (value <= this.valueFrom) value = this.valueFrom;
    return this.checkValue(value);
  }

  public checkStep(min: number, max: number, step: number): number {
    const difference = max - min;
    const correctStep = Math.round(step);
    
    if (correctStep <= 0) return defaultState.step;
    if (max === 0) return defaultState.step;
    if (correctStep > difference) return difference;
    return correctStep;
  }

  public checkMinMax(min: number, max: number): void {
    let swap;
    let correctMin = Math.round(min);
    let correctMax = Math.round(max);

    if (correctMin === correctMax) {
      correctMax += 1;
    }
    if (correctMin >= correctMax) {
      swap = correctMin;
      correctMin = correctMax;
      correctMax = swap;
    }
    
    this.min = correctMin;
    this.max = correctMax;
  }

  public checkRangeMinMax(valueFrom: number, valueTo: number): void {
    let swap;

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
