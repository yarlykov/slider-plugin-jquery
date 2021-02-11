import SliderComponent from '../../core/SliderComponent';

class Scale extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'Scale',
      listeners: [],
      ...options,
    });
  }

  init() {
    super.init();
  }
}
Scale.id = '[data-id="scale"]';

export default Scale;
