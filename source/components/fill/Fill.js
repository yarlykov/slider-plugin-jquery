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

    this.subscribe('lever:mousemove', this.setFill);
  }

  setFill(currentPosition, $element) {
    const $fill = $($element.prev());
    $fill.css({ width: `${currentPosition}%` });
  }
}
Fill.id = '[data-id="fill"]';

export default Fill;
