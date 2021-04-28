import SliderFactory from './Factories/SliderFactory';
import { IOptions } from '../interfaces';

class View {
  root: HTMLElement | null;
  options: IOptions;

  constructor(root: HTMLElement | null, options: IOptions) {
    this.root = root;
    this.options = options;
  }

  public init(): void {
    const factory = new SliderFactory();
    factory.create(this.options, this.root);
  }
}

export { IOptions, View };
