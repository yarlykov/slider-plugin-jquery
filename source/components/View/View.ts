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
    this.options.orientation =
      this.options.orientation === 'vertical' ? 'vertical' : 'horizontal';
    this.options.color = this.options.color === 'green' ? 'green' : 'orange';

    const factory = new SliderFactory();
    factory.create(this.options, this.root);
  }
}

export { IOptions, View };
