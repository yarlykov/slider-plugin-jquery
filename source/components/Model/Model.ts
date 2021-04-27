import defaultState from '../../initialState';
import { IOptions } from '../interfaces';

type optionsValue = number & string & boolean;

class Model {
  private state: IOptions;

  constructor() {
    this.state = defaultState || {};
  }

  public setState(state: IOptions) {
    this.state = state;
  }

  public getState(): IOptions {
    return this.state;
  }

  public setValue<K extends keyof IOptions>(key: K, value: optionsValue) {
    this.state[key] = value;
  }

  public getValue<K extends keyof IOptions>(key: K) {
    return this.state[key];
  }
}

export default Model;
