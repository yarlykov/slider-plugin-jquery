import {OptionsInterface} from '../interfaces'

type optionsValue = number & string & boolean;

class Model {
  state: OptionsInterface;

  constructor() {
    this.state = {};
  }

  setState(state: OptionsInterface) {
    this.state = state;
  }

  getState(): OptionsInterface {
    return this.state;
  }

  setValue<K extends keyof OptionsInterface>(key: K, value: optionsValue) {
    this.state[key] = value;
  }

  getValue<K extends keyof OptionsInterface>(key: K) {
    return this.state[key];
  }

}

export default Model;

