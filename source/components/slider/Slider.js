import SliderComponent from '../../core/SliderComponent';
// import movesTheSlider from './slider.movesTheSlider';
import clickedOnSliderScale from './slider.clickedOnSliderScale';
import { checkOnExtremeValues } from '../../core/utils';
import $ from '../../core/dom';

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
      this.movesTheSlider(mouseEvent);
    }
  }

  isScale(mouseEvent) {
    return mouseEvent.target.dataset.scaleComponent || null;
  }

  isLever(mouseEvent) {
    return mouseEvent.target.dataset.id === 'lever';
  }

  movesTheSlider(mouseEvent) {
    const orientation = mouseEvent.target.closest('[data-slider="horizontal"]')
      ? 'horizontal'
      : 'vertical';
    const $lever = $(mouseEvent.target);
    const $leverParent = $($lever.closest('[data-id="scale"]'));
    const scaleCoords = $leverParent.getCoords();

    document.onmousemove = (moveEvent) => {
      if (orientation === 'horizontal') {
        const delta = moveEvent.pageX - scaleCoords.left;
        const positionInPercent = (delta * 100) / scaleCoords.width;
        const currentPosition = checkOnExtremeValues(positionInPercent);

        this.$emit('lever:mousemove', currentPosition, $lever);
      } else if (orientation === 'vertical') {
        const delta = scaleCoords.bottom - moveEvent.pageY;
        const positionInPercent = (delta * 100) / scaleCoords.height;
        const currentPosition = checkOnExtremeValues(positionInPercent);

        this.$emit('lever:mousemove', currentPosition, $lever);
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }
}
Slider.id = '[data-id="slider"]';

export default Slider;
