import SliderComponent from '../../core/SliderComponent';
import movesTheSlider from './slider.movesTheSlider';
import clickedOnSliderScale from './slider.clickedOnSliderScale';

class Slider extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'slider',
      listeners: ['mousedown'],
      ...options,
    });
  }

  init() {
    super.init();
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
