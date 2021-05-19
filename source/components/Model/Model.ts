import Emitter from '../../Emitter';
import defaultState from '../../initialState';
import { IOptions } from '../interfaces';

type optionsValue = number & string & boolean;

class Model extends Emitter {
  private state: IOptions;

  constructor() {
    super();
    this.state = defaultState || {};
  }

  public setState(state: IOptions) {
    this.state = { ...this.state, ...state };
    this.emit('changeState', this.state);
  }

  public getState(): IOptions {
    return this.state;
  }

  public setValue<K extends keyof IOptions>(keyState: K, valueState: optionsValue) {
    this.state[keyState] = valueState;

    if (!Number.isInteger(valueState)) {
      this.emit('changeState', this.state);
    } else {
      this.emit('changeValue', this.state);
    }
  }

  public getValue<K extends keyof IOptions>(keyState: K) {
    return this.state[keyState];
  }
}

export default Model;
