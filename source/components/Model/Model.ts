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

  public setValue<K extends keyof IOptions>(key: K, value: optionsValue) {
    this.state[key] = value;

    this.emit('changeValue', {key, ...this.state});
  }

  public getValue<K extends keyof IOptions>(key: K) {
    return this.state[key];
  }
}

export default Model;
