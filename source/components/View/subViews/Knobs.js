import createKnob from '../templates/knob.template';
import View from '../View';

class Knobs extends View {
  constructor(root, options) {
    super(root, options);
    this.root = root;
  }

  render() {
    const scale = this.root.querySelector('[data-id="scale"]');
    if (!scale) {
      throw new Error('Ooops... scale is not found');
    }
    this.knob = createKnob();

    scale.insertAdjacentHTML('beforeend', this.knob);
  }
}

export default Knobs;
