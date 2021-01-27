import SliderComponent from '../../../core/SliderComponent';
import movesTheSlider from './slider.movesTheSlider';

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

    // return verticalSlider;
    return horizontalSlider;
  }

  onMousedown(mouseEvent) {
    mouseEvent.preventDefault();

    if (this.isLever(mouseEvent)) {
      movesTheSlider(mouseEvent);
    }
  }

  isLever(mouseEvent) {
    return mouseEvent.target.dataset.leverComponent === 'lever';
  }
}
Slider.className = 'slider';

export default Slider;
