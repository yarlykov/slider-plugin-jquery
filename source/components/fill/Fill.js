import SliderComponent from '../../core/SliderComponent';

class Fill extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'Fill',
      listeners: [],
      ...options,
    });
  }
}
Fill.className = 'slider__fill';

export default Fill;
