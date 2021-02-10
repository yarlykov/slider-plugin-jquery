import SliderComponent from '../../core/SliderComponent';

class Tooltip extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'slider',
      listeners: [],
      ...options,
    });
  }
}
Tooltip.className = 'slider__tooltip';

export default Tooltip;
