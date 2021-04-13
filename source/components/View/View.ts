import SliderFactory from './Factories/SliderFactory';

interface OptionsInterface {
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
  root: HTMLElement | null;
  options: OptionsInterface;

  constructor(root: HTMLElement | null, options: OptionsInterface) {
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

export { OptionsInterface, View };
