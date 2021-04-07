import SliderFactory from './Factories/SliderFactory';

class View {
  constructor(root, options) {
    this.root = root;
    this.options = options;
  }

  init() {
    this.options.orientation = this.options.orientation === 'vertical'
      ? 'vertical'
      : 'horizontal';
    this.options.color = this.options.color === 'green'
      ? 'green'
      : 'orange';

    const factory = new SliderFactory();
    factory.create(this.options, this.root);
  }
}

export default View;
