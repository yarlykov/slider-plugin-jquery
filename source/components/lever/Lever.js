import SliderComponent from '../../core/SliderComponent';

class Lever extends SliderComponent {
  constructor($root, options = {}) {
    super($root, {
      name: 'Lever',
      listeners: [],
      ...options,
    });
  }

  init() {
    super.init();
    this.$lever = this.$root;

    this.subscribe('lever:mousemove', this.setLever.bind(this));
    this.subscribe('input:current', this.setLever.bind(this));
  }

  setLever(currentPosition) {
    const isHorizontal = this.$lever.closest('.slider__lever_horizontal') !== null;

    if (isHorizontal) {
      this.$lever.css({ left: `${currentPosition}%` });
    } else {
      this.$lever.css({ bottom: `${currentPosition}%` });
    }
  }
}
Lever.id = '[data-id="lever"]';

export default Lever;
