import SliderComponent from '../../core/SliderComponent';
import movesTheSlider from './slider.movesTheSlider';
import clickedOnSliderScale from './slider.clickedOnSliderScale';

class Slider extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'Slider',
      listeners: ['mousedown'],
      ...options,
    });
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
Slider.dataId = '[data-id="slider"]';

export default Slider;
