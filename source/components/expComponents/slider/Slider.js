import SliderComponent from '../../../core/SliderComponent';
import $ from '../../../core/dom';

class Slider extends SliderComponent {
  constructor($root) {
    super($root, {
      name: 'slider',
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    const horizontalSlider = `
      <div class="slider slider_horizontal" data-slider="horizontal">
        <div class="slider__scale slider__scale_horizontal" data-scale-component="scale">
          <div class="slider__fill slider__fill_horizontal slider__fill_orange" data-component="fill"></div>
          <div class="slider__lever slider__lever_orange slider__lever_horizontal" data-lever-component="lever">
            <div class="slider__tooltip slider__tooltip_horizontal slider__tooltip_orange" data-lever-component="tooltip">
              <span class="tooltip__value" data-lever-component="tooltip-value">53 ¥</span>
              <div class="slider__tooltip_arrow"></div>
            </div>
          </div>
          <div class="slider__labels slider__labels_horizontal" data-component="labels">
            <div class="slider__labels-item" data-label="0">0</div>
            <div class="slider__labels-item" data-label="25">25</div>
            <div class="slider__labels-item" data-label="50">50</div>
            <div class="slider__labels-item" data-label="75">75</div>
            <div class="slider__labels-item" data-label="100">100</div>
          </div>
        </div>
      </div>
    `;

    const verticalSlider = `
      <div class=" slider slider_vertical" data-slider="vertical">
        <div class="slider__scale slider__scale_vertical" data-scale-component="scale">
          <div class="slider__fill slider__fill_vertical slider__fill_orange" data-component="fill"></div>
          <div class="slider__lever slider__lever_vertical slider__lever_orange" data-lever-component="lever">
            <div class="slider__tooltip slider__tooltip_vertical slider__tooltip_orange" data-lever-component="tooltip">
              <span class="tooltip__value" data-lever-component="tooltip-value">53 ¥</span>
              <div class="slider__tooltip_arrow slider__tooltip_arrow_vertical"></div>
            </div>
          </div>
          <div class="slider__labels slider__labels_vertical" data-component="labels">
            <div class="slider__labels-item" data-label="100">100</div>
            <div class="slider__labels-item" data-label="75">75</div>
            <div class="slider__labels-item" data-label="50">50</div>
            <div class="slider__labels-item" data-label="25">25</div>
            <div class="slider__labels-item" data-label="0">0</div>
          </div>
        </div>
      </div>
    `;

    return verticalSlider;
    return horizontalSlider;
  }

  onMousedown(mouseEvent) {
    mouseEvent.preventDefault();
    const isLever = mouseEvent.target.dataset.leverComponent === 'lever';

    if (isLever) {
      const orientation = mouseEvent.target.closest('[data-slider="horizontal"]')
        ? 'horizontal'
        : 'vertical';
      const $lever = $(mouseEvent.target);
      const $leverParent = $($lever.closest('[data-scale-component="scale"]'));
      const scaleCoords = $leverParent.getCoords();
      const $tooltipValue = $($lever.querySelector('[data-lever-component="tooltip-value"]'));
      const $fill = $($lever.prev());

      document.onmousemove = (moveEvent) => {
        if (orientation === 'horizontal') {
          const delta = moveEvent.pageX - scaleCoords.left;
          const positionInPercent = (delta * 100) / scaleCoords.width;
          const currentPosition = this._checkOnExtremeValues(positionInPercent);

          $lever.css({ left: `${currentPosition}%` });
          $tooltipValue.text(`${Math.ceil(currentPosition.toString())} ¥`);
          $fill.css({ width: `${currentPosition}%` });
        } else if (orientation === 'vertical') {
          const delta = scaleCoords.bottom - moveEvent.pageY;
          const positionInPercent = (delta * 100) / scaleCoords.height;
          const currentPosition = this._checkOnExtremeValues(positionInPercent);

          $lever.css({ bottom: `${currentPosition}%` });
          $tooltipValue.text(`${Math.ceil(currentPosition.toString())} ¥`);
          $fill.css({ height: `${currentPosition}%` });
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }

  _checkOnExtremeValues(currentLeverValue) {
    let newValue = 0;

    if (currentLeverValue < 0) {
      newValue = 0;
    } else if (currentLeverValue > 100) {
      newValue = 100;
    } else {
      newValue = currentLeverValue;
    }
    return newValue;
  }
}
Slider.className = 'slider';

export default Slider;
