import SliderComponent from '../../core/SliderComponent';
import { checkOnExtremeValues } from '../../core/utils';
import $ from '../../core/dom';
import { SLIDER_POSITION_CHANGE } from '../../redux/types';
import * as actions from '../../redux/actions';

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
    this.sliderPositionChange(mouseEvent);
  }

  isScale(mouseEvent) {
    return mouseEvent.target.dataset.scaleComponent || null;
  }

  // isLever(mouseEvent) {
  //   return mouseEvent.target.dataset.id === 'lever'
  // }

  async sliderPositionChange(mouseEvent) {
    try {
      const data = await this.movesTheSlider(mouseEvent);
      this.$dispatch(actions.changeSlider(data));
      // console.log('Slider data:', sliderData);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  movesTheSlider(mouseEvent) {
    return new Promise((resolve) => {
      const orientation = mouseEvent.target.closest('[data-slider="horizontal"]')
        ? 'horizontal'
        : 'vertical';
      const $scale = $(this.$root.find('[data-id="scale"]'));
      const scaleCoords = $scale.getCoords();
      let currentPosition;

      document.onmousemove = (moveEvent) => {
        if (orientation === 'horizontal') {
          const delta = moveEvent.pageX - scaleCoords.left;
          const positionInPercent = (delta * 100) / scaleCoords.width;
          currentPosition = checkOnExtremeValues(positionInPercent);

          this.$emit('lever:mousemove', currentPosition);
        } else if (orientation === 'vertical') {
          const delta = scaleCoords.bottom - moveEvent.pageY;
          const positionInPercent = (delta * 100) / scaleCoords.height;
          currentPosition = checkOnExtremeValues(positionInPercent);

          this.$emit('lever:mousemove', currentPosition);
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;

        resolve({
          value: Math.ceil(currentPosition),
          id: 'currentPosition',
        });
      };
    });
  }

  clickedOnSliderScale(mouseEvent) {
    const $scale = mouseEvent.target.dataset.scaleComponent === 'scale' ? $(mouseEvent.target) : $(mouseEvent.target.parentNode);
    const scaleCoords = $scale.getCoords();
    const delta = mouseEvent.pageX - scaleCoords.left;
    const positionInPercent = (delta * 100) / scaleCoords.width;
    const currentPosition = checkOnExtremeValues(positionInPercent);

    this.onMouseup();
    // this.movesTheSlider(mouseEvent);
    this.$emit('lever:mousemove', currentPosition);
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
