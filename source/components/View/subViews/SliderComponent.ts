import Emitter from '../../../Emitter';
import { IOptions } from '../../interfaces';

abstract class SliderComponent extends Emitter {
  options: IOptions;
  root: HTMLElement;

  constructor(options: IOptions, root: HTMLElement) {
    super();
    if (new.target === SliderComponent) {
      throw new Error('Can`t instantiate SliderComponent, only concrete one');
    }

    this.options = options || {};
    this.root = root;
  }

  update(data: Object): void {}
}

export default SliderComponent;
