import SliderComponent from '../../core/SliderComponent';
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

  init() {
    super.init();
  }

  onMousedown(mouseEvent) {
    mouseEvent.preventDefault();
    if (this.isScale(mouseEvent)) {
      this.clickedOnSliderScale(mouseEvent);
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
    const $scale = $(this.$root.find('[data-id="scale"]'));
    const scaleCoords = $scale.getCoords();

    document.onmousemove = (moveEvent) => {
      if (orientation === 'horizontal') {
        const delta = moveEvent.pageX - scaleCoords.left;
        const positionInPercent = (delta * 100) / scaleCoords.width;
        const currentPosition = checkOnExtremeValues(positionInPercent);

        this.$emit('lever:mousemove', currentPosition);
      } else if (orientation === 'vertical') {
        const delta = scaleCoords.bottom - moveEvent.pageY;
        const positionInPercent = (delta * 100) / scaleCoords.height;
        const currentPosition = checkOnExtremeValues(positionInPercent);

        this.$emit('lever:mousemove', currentPosition);
      }
    };
    this.onMouseup();
  }

  clickedOnSliderScale(mouseEvent) {
    const $scale = mouseEvent.target.dataset.scaleComponent === 'scale' ? $(mouseEvent.target) : $(mouseEvent.target.parentNode);
    const scaleCoords = $scale.getCoords();
    const delta = mouseEvent.pageX - scaleCoords.left;
    const positionInPercent = (delta * 100) / scaleCoords.width;
    const currentPosition = checkOnExtremeValues(positionInPercent);

    this.$emit('lever:mousemove', currentPosition);
    this.onMouseup();
    this.movesTheSlider(mouseEvent);
  }

  onMouseup() {
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }
}
Slider.id = '[data-id="slider"]';

export default Slider;
