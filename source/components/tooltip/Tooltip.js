import SliderComponent from '../../core/SliderComponent';
import $ from '../../core/dom';

class Tooltip extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'Tooltip',
      listeners: [],
      ...options,
    });
    this.$tooltip = $root;
  }

  init() {
    super.init();

    this.subscribe('lever:mousemove', this.setTooltip);
  }

  setTooltip(currentPosition = 0, $element) {
    const tooltipValue = $($element.find('[data-id="tooltip-value"]'));
    tooltipValue.text(`${Math.ceil(currentPosition.toString())} ¥`);
  }
}
Tooltip.id = '[data-id="tooltip"]';

export default Tooltip;
