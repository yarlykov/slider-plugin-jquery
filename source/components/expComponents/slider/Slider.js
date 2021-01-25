import SliderComponent from '../../../core/SliderComponent';

class Slider extends SliderComponent {
  toHTML() {
    return `
      <div class="slider_horizontal" id="slider">
        <div class="slider__scale slider__scale_horizontal">
          <div class="slider__fill slider__fill_horizontal slider__fill_orange" id="fill"></div>
          <div class="slider__lever slider__lever_orange slider__lever_horizontal" id='lever'>
            <div class="slider__tooltip slider__tooltip_horizontal slider__tooltip_orange">
              <span class="tooltip__value">53 ¥</span>
              <div class="slider__tooltip_arrow"></div>
            </div>
          </div>
          <div class="slider__labels slider__labels_horizontal">
            <div class="slider__labels-item">0</div>
            <div class="slider__labels-item">25</div>
            <div class="slider__labels-item">50</div>
            <div class="slider__labels-item">75</div>
            <div class="slider__labels-item">100</div>
          </div>
        </div>
      </div>
    `;
  }
}
Slider.className = 'slider';

export default Slider;
