import { IOptions } from '../../interfaces';

abstract class SliderComponent {
  options: IOptions;
  root: HTMLElement;

  constructor(options: IOptions, root: HTMLElement) {
    if (new.target === SliderComponent) {
      throw new Error('Can`t instantiate SliderComponent, only concrete one');
    }

    this.options = options || {};
    this.root = root;
  }
}

export default SliderComponent;
