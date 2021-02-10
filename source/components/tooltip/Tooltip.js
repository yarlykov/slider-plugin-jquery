import SliderComponent from '../../core/SliderComponent';

class Tooltip extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'Tooltip',
      listeners: [],
      ...options,
    });
  }
}
Tooltip.dataId = '[data-id="tooltip"]';

export default Tooltip;
