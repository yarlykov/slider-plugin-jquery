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
      <div class="slider_horizontal" id="slider">
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
      <div class="slider_vertical" id="slider">
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

    return horizontalSlider;
  }

  onMousedown(mouseEvent) {
    if (mouseEvent.target.dataset.leverComponent === 'lever') {
      const $lever = $(mouseEvent.target);
      const $leverParent = $($lever.closest('[data-scale-component="scale"]'));
      const coords = $leverParent.getCoords();
      const $tooltipValue = $($lever.querySelector('[data-lever-component="tooltip-value"]'));
      const $fill = $($lever.prev());

      document.onmousemove = (moveEvent) => {
        const delta = moveEvent.pageX - coords.left;
        let currentPosition = (delta * 100) / coords.width;

        if (currentPosition < 0) {
          currentPosition = 0;
        } else if (currentPosition > 100) {
          currentPosition = 100;
        }

        $lever.$nativeElement.style.left = `${currentPosition}%`;
        $tooltipValue.$nativeElement.textContent = `${Math.ceil(currentPosition.toString())} ¥`;
        $fill.$nativeElement.style.width = `${currentPosition}%`;
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
Slider.className = 'slider';

export default Slider;
