import Observer from '../../../Observer/Observer';
import { IOptions } from '../../interfaces';

abstract class SliderComponent extends Observer {
  public state: IOptions;

  public root: HTMLElement;

  constructor(options: IOptions, root: HTMLElement) {
    super();
    if (new.target === SliderComponent) {
      throw new Error('Can`t instantiate SliderComponent, only concrete one');
    }

    this.root = root;
    this.state = options || {};
  }

  public update(state: IOptions): void {
    this.state = { ...state };
  }
}

export default SliderComponent;
