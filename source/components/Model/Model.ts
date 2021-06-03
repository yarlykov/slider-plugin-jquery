import Emitter from '../../Emitter';
import defaultState from '../../initialState';
import { IOptions } from '../interfaces';
import Validation from './Validation';

type optionsValue = number & string & boolean;

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

  public setValue<K extends keyof IOptions>(
    keyState: K,
    valueState: optionsValue,
  ) {
    let value = 0;
    if (keyState === 'current' && this.state.range) {
      value = this.validation.checkMinRange(valueState);
    } else if (keyState === 'current') {
      value = this.validation.checkValue(valueState);
    } else if (keyState === 'rangeMax') {
      value = this.validation.checkMaxRange(valueState);
    } else {
      value = valueState;
    }
    this.state[keyState] = value;

    if (!Number.isInteger(valueState) || keyState === 'step') {
      console.log('state is changed');
      this.emit('stateChanged', this.validation.checkState(this.state));
    } else {
      this.emit('valueChanged', this.validation.checkState(this.state));
    }
  }

  public getValue<K extends keyof IOptions>(keyState: K) {
    return this.state[keyState];
  }
}

export default Model;
