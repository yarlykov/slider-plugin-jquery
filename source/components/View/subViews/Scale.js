import View from '../View';
import createScale from '../templates/scale.template';

class Scale extends View {
  constructor(root, options) {
    super(root, options);
    this.root = root;
  }

  render() {
    const slider = this.root.querySelector('[data-id="slider"]');
    if (!slider) {
      throw new Error('Ooops... slider is not found');
    }
    this.createScale = createScale();

    slider.insertAdjacentHTML('afterbegin', this.createScale);
  }
}

export default Scale;
