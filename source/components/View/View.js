import SliderFactory from './Factories/SliderFactory';

class View {
  constructor(root, options) {
    this.root = root;
    this.options = options;
  }

  init() {
    this.options.display.type = this.options.display.type === 'vertical'
      ? 'vertical'
      : 'horizontal';
    this.options.display.color = this.options.display.color === 'green'
      ? 'green'
      : 'orange';
    this.type = this.options.display.range ? 'range' : 'simple';

    const factory = new SliderFactory();
    const slider = factory.create(this.options, this.type);
    this.root.innerHTML = slider.getTemplate();
  }
}

export default View;
