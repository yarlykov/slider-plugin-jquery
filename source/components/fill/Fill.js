import SliderComponent from '../../core/SliderComponent';
import $ from '../../core/dom';

class Fill extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'Fill',
      listeners: [],
      ...options,
    });
  }

  init() {
    super.init();
    this.$fill = this.$root;

    this.subscribe('lever:mousemove', this.setFill.bind(this));
    this.subscribe('input:current', this.setFill.bind(this));
  }

  setFill(currentPosition) {
    this.$fill.css({ width: `${currentPosition}%` });
  }
}
Fill.id = '[data-id="fill"]';

export default Fill;
