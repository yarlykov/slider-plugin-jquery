import defaultState from 'Root/source/defaultState';
import Observer from 'Source/Observer/Observer';
import { ModelEvents } from 'Source/Observer/events';
import { IOptions, OptionValue } from 'Components/interfaces';
import Validation from './Validation';

type Option = keyof IOptions;

class Model extends Observer {
  public state: IOptions = defaultState;

  private validation: Validation;

  constructor() {
    super();
    this.validation = new Validation();
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

  private checkStateValue<Option extends keyof IOptions>(
    option: Option,
    optionValue: IOptions[Option],
  ): void {
    const { range } = this.state;
    const isValueTypeOfNumber = typeof optionValue === 'number';
    const isRangeValueFrom =
      option === 'valueFrom' && range && isValueTypeOfNumber;
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
