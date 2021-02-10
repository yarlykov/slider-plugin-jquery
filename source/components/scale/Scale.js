import SliderComponent from '../../core/SliderComponent';

class Scale extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'Scale',
      listeners: [],
      ...options,
    });
  }
}
Scale.dataId = '[data-id="scale"]';

export default Scale;
