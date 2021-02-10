import SliderComponent from '../../../core/SliderComponent';
import movesTheSlider from './slider.movesTheSlider';
import clickedOnSliderScale from './slider.clickedOnSliderScale';
import Scale from '../scale/Scale';

class Slider extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'slider',
      listeners: ['mousedown'],
      ...options,
    });
  }

  prepare() {
    this.options = {
      orientation: 'horizontal',
      labels: ['0', '25', '50', '75', '100'],
    };
    this.$scale = new Scale(this.options);
  }

  init() {
    super.init();
  }

  toHTML() {
    const { orientation } = this.options;

    return `
      <div class="slider slider_${orientation}" data-slider="${orientation}">
        ${this.$scale.toHTML()}
      </div>
    `;
  }

  onMousedown(mouseEvent) {
    mouseEvent.preventDefault();
    if (this.isScale(mouseEvent)) {
      clickedOnSliderScale(mouseEvent);
    }

    if (this.isLever(mouseEvent)) {
      movesTheSlider(mouseEvent);
    }
  }

  isScale(mouseEvent) {
    return mouseEvent.target.dataset.scaleComponent || null;
  }

  isLever(mouseEvent) {
    return mouseEvent.target.dataset.leverComponent === 'lever';
  }
}
Slider.className = 'slider';

export default Slider;
