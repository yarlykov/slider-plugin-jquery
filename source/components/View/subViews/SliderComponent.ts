import Emitter from '../../../Emitter';
import { IOptions } from '../../interfaces';

abstract class SliderComponent extends Emitter {
  state: IOptions;
  root: HTMLElement;

  constructor(options: IOptions, root: HTMLElement) {
    super();
    if (new.target === SliderComponent) {
      throw new Error('Can`t instantiate SliderComponent, only concrete one');
    }

    this.root = root;
    this.state = options || {};
  }

  update(state: IOptions): void {
    this.state = state;
  }
}

export default SliderComponent;
