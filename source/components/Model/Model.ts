import Emitter from '../../Emitter';
import defaultState from '../../initialState';
import { IOptions } from '../interfaces';
import Validation from './Validation';

class Model extends Emitter {
  private state: IOptions = defaultState;

  private validation: Validation;

  constructor() {
    super();
    this.validation = new Validation();
  }

  public setState(state: IOptions) {
    const newState = { ...this.state, ...state };
    this.state = this.validation.checkState(newState);

    this.emit('stateChanged', this.state);
  }

  public getState(): IOptions {
    return this.state;
  }

  public getValue<K extends keyof IOptions>(keyState: K) {
    return this.state[keyState];
  }

  public setValue<K extends keyof IOptions>(
    keyState: K,
    valueState: IOptions[K],
  ) {
    this.checkStateValue(keyState, valueState);
    this.state = this.validation.checkState(this.state);

    if (this.isValue(keyState)) {
      this.emit('valueChanged', this.state);
    } else {
      this.emit('stateChanged', this.state);
      // console.log('state is changed');
    }
  }

  private checkStateValue<K extends keyof IOptions>(
    keyState: K,
    valueState: IOptions[K],
  ): void {
    let value: number;
    const rangeValueFrom = keyState === 'valueFrom' && this.state.range;
    const valueFrom = keyState === 'valueFrom';
    const valueTo = keyState === 'valueTo';

    if (rangeValueFrom) {
      value = this.validation.checkMinRange(valueState as number);
    } else if (valueFrom) {
      value = this.validation.checkValue(valueState as number);
    } else if (valueTo) {
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
