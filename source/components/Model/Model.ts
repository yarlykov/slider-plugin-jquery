import Observer from '../../Observer/Observer';
import defaultState from '../../defaultState';
import { IOptions } from '../interfaces';
import Validation from './Validation';

type stateValue = number | string | boolean | undefined;

class Model extends Observer {
  public state: IOptions = defaultState;

  private validation: Validation;

  constructor() {
    super();
    this.validation = new Validation();
  }

  public setState(state: IOptions): void {
    const newState = { ...this.state, ...state };
    this.state = this.validation.checkState(newState);

    this.emit('stateChanged', this.state);
  }

  public getState(): IOptions {
    return this.state;
  }

  public getValue<K extends keyof IOptions>(keyState: K): stateValue {
    return this.state[keyState];
  }

  public setValue<K extends keyof IOptions>(
    keyState: K,
    valueState: IOptions[K],
  ): void {
    this.checkStateValue(keyState, valueState);
    this.state = this.validation.checkState(this.state);

    if (this.isValue(keyState)) {
      this.emit('valueChanged', this.state);
    } else {
      this.emit('stateChanged', this.state);
    }
  }

  private checkStateValue<K extends keyof IOptions>(
    keyState: K,
    valueState: IOptions[K],
  ): void {
    const { range } = this.state;
    const isValueTypeOfNumber = typeof valueState === 'number';
    const isRangeValueFrom =
      keyState === 'valueFrom' && range && isValueTypeOfNumber;
    const isValueFrom = keyState === 'valueFrom' && isValueTypeOfNumber;
    const isValueTo = keyState === 'valueTo' && isValueTypeOfNumber;

    if (isRangeValueFrom) {
      this.state.valueFrom = this.validation.checkMinRange(valueState);
    } else if (isValueFrom) {
      this.state.valueFrom = this.validation.checkValue(valueState);
    } else if (isValueTo) {
      this.state.valueTo = this.validation.checkMaxRange(valueState);
    } else {
      this.state[keyState] = valueState;
    }
  }

  private isValue<K extends keyof IOptions>(keyState: K): boolean {
    return keyState === 'valueFrom' || keyState === 'valueTo';
  }
}

export default Model;
