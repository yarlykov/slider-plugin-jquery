import SliderComponent from '../../core/SliderComponent';

class Labels extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'Labels',
      listeners: [],
      ...options,
    });
  }
}
Labels.className = 'slider__labels';

export default Labels;
