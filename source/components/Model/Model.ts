import Emitter from '../../Emitter/Emitter';
import defaultState from '../../initialState';
import { IOptions } from '../interfaces';
import Validation from './Validation';

type stateValue = number | string | boolean | undefined;

class Model extends Emitter {
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
    let value: number;
    const { range } = this.state;
    const isRangeValueFrom = keyState === 'valueFrom' && range;
    const isValueFrom = keyState === 'valueFrom';
    const isValueTo = keyState === 'valueTo';

    if (isRangeValueFrom) {
      value = this.validation.checkMinRange(valueState as number);
    } else if (isValueFrom) {
      value = this.validation.checkValue(valueState as number);
    } else if (isValueTo) {
      value = this.validation.checkMaxRange(valueState as number);
    } else {
      value = valueState as number;
    }
    this.state[keyState] = value as IOptions[K];
  }

  private isValue<K extends keyof IOptions>(keyState: K): boolean {
    return keyState === 'valueFrom' || keyState === 'valueTo';
  }
}

export default Model;
