import SliderComponent from '../../core/SliderComponent';

class Lever extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'Lever',
      listeners: ['input'],
      ...options,
    });
  }
}
Lever.className = 'slider__lever';

export default Lever;
