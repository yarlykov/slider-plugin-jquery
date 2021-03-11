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
    this.tooltipValue = $(this.$tooltip.find('[data-id="tooltip-value"]'));
    this.setTooltip(this.state.value); // refactor

    this.$on('lever:mousemove', this.setTooltip.bind(this));
    this.$on('input:current', this.setTooltip.bind(this));
  }

  setTooltip(currentPosition = 0) {
    this.tooltipValue.text(`${Math.ceil(currentPosition.toString())} ¥`);
  }
}
Tooltip.id = '[data-id="tooltip"]';

export default Tooltip;
