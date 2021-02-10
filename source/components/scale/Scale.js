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
Scale.className = 'slider__scale';

export default Scale;
