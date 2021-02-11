import SliderComponent from '../../core/SliderComponent';

class Lever extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'Lever',
      listeners: [],
      ...options,
    });
  }

  init() {
    super.init();

    this.subscribe('lever:mousemove', this.setLever);
  }

  setLever(currentPosition, $element) {
    $element.css({ left: `${currentPosition}%` });
  }
}
Lever.id = '[data-id="lever"]';

export default Lever;
