import SliderComponent from '../../../core/SliderComponent';
import movesTheSlider from '../slider/slider.movesTheSlider';
import Tooltip from '../tooltip/Tooltip';

class Lever {
  constructor(options) {
    this.options = options;
    this.prepare();
  }

  prepare() {
    this.$tooltip = new Tooltip(this.options);
  }

  toHTML() {
    const { orientation } = this.options;

    return `
      <div class="slider__lever slider__lever_orange slider__lever_${orientation}" data-lever-component="lever">
        ${this.$tooltip.toHTML()}
      </div>
    `;
  }
}
Lever.className = 'slider__lever';

export default Lever;
