import createLabels from '../templates/labels.template';
import View from '../View';

class Labels extends View {
  constructor(root, options) {
    super(root, options);
    this.root = root;
  }

  render() {
    const scale = this.root.querySelector('[data-id="scale"]');
    if (!scale) {
      throw new Error('Ooops... scale is not found');
    }
    this.labels = createLabels();

    scale.insertAdjacentHTML('beforeend', this.labels);
  }
}

export default Labels;
