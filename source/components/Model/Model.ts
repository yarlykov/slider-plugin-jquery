import defaultState from 'Root/source/defaultState';
import Observer from 'Source/Observer/Observer';
import { ModelEvents } from 'Source/Observer/events';
import { IOptions, OptionValue } from 'Components/interfaces';
import Validation from './Validation';

type Option = keyof IOptions;
type ModelEvent = 
  | { type: ModelEvents.VALUE_CHANGED, data: IOptions } 
  | { type: ModelEvents.STATE_CHANGED, data: IOptions }

class Model extends Observer<ModelEvent> {
  private state: IOptions = defaultState;

  private validation: Validation;

  constructor(options: IOptions) {
    super();
    this.validation = new Validation();
    this.setState(options);
  }

  public setState(state: IOptions): void {
    const newState = { ...this.state, ...state };
    this.state = { ...newState, ...this.validation.checkState(newState)};

    this.emit(ModelEvents.STATE_CHANGED, this.state);
  }

  public getState(): IOptions {
    return this.state;
  }

  public getValue(option: Option): OptionValue {
    return this.state[option];
  }

  public setValue(option: Option, optionValue: OptionValue): void {
    this.checkStateValue(option, optionValue);
    this.state = { ...this.state, ...this.validation.checkState(this.state)};

    if (this.isValue(option)) {
      this.emit(ModelEvents.VALUE_CHANGED, this.state);
    } else {
      this.emit(ModelEvents.STATE_CHANGED, this.state);
    }
  }

  public processPercentValue(valueName: 'valueFrom' | 'valueTo', value: number): void {
    const {min, max, step} = this.state;
    const correctValue = this.validation.getValueWithStep(min, max, step, value);
    
    this.setValue(valueName, correctValue);
  }

  public processNearValue(value: number): string {
    const { min, max, step, isRange, valueTo, valueFrom } = this.state;
    const correctValue = this.validation.getValueWithStep(min, max, step, value);

    if (isRange) {
      const delta = (valueTo - valueFrom) / 2;
      const leftHalfOfScale = valueFrom + delta;

      if (correctValue >= leftHalfOfScale) {
        this.setValue('valueTo', correctValue);
        return 'valueTo'
      }
    }
    this.setValue('valueFrom', correctValue);
    return 'valueFrom'
  }

  public increment(valueName: 'valueFrom' | 'valueTo'): void {
    const newValue = this.state[valueName] + this.state.step;
    this.setValue(valueName, newValue)
  }

  public decrement(valueName: 'valueFrom' | 'valueTo'): void {
    const newValue = this.state[valueName] - this.state.step;
    this.setValue(valueName, newValue)
  }

  private checkStateValue<Option extends keyof IOptions>(
    option: Option,
    optionValue: IOptions[Option],
  ): void {
    const { isRange } = this.state;
    const isValueTypeOfNumber = typeof optionValue === 'number';
    const isRangeValueFrom =
      option === 'valueFrom' && isRange && isValueTypeOfNumber;
    const isValueFrom = option === 'valueFrom' && isValueTypeOfNumber;
    const isValueTo = option === 'valueTo' && isValueTypeOfNumber;

    if (isRangeValueFrom) {
      this.state.valueFrom = this.validation.checkMinRange(optionValue);
    } else if (isValueFrom) {
      this.state.valueFrom = this.validation.checkValue(optionValue);
    } else if (isValueTo) {
      this.state.valueTo = this.validation.checkMaxRange(optionValue);
    } else {
      this.state[option] = optionValue;
    }
  }

  private isValue(option: Option): boolean {
    return option === 'valueFrom' || option === 'valueTo';
  }
}

export default Model;
