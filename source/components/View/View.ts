import SliderFactory from './Factories/SliderFactory';

  interface Options {
    min?: number;
    max?: number;
    step?: number;
    currentValue?: number;
    rangeMin?: number;
    rangeMax?: number;
    orientation?: string;
    range?: boolean;
    elements?: {
      fill?: boolean;
    };
    units?: string;
    color?: string;
  }

class View {  
  root: HTMLElement;
  options: Options;

  constructor(root: HTMLElement, options: Options) {
    this.root = root;
    this.options = options;
  }

  init() {
    this.options.orientation =
      this.options.orientation === 'vertical' ? 'vertical' : 'horizontal';
    this.options.color = this.options.color === 'green' ? 'green' : 'orange';

    const factory = new SliderFactory();
    factory.create(this.options, this.root);
  }
}

export default View;
