import $ from '../../../core/dom';
import ControlPanel from '../control-panel/ControlPanel';

class Slider {
  constructor(selector, options) {
    this.init(selector);
    this.components = options.components || [];
  }

  init(mainHtmlNode) {
    this.$mainHtmlNode = $(mainHtmlNode);
  }

  toHTML() {
    return `
      <div class="slider slider_horizontal" id="slider">
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

  getRoot() {
    const $root = $.create('div', 'demo-page__block');
    const controlPanel = new ControlPanel();
    const $controlPanel = $.create('div', ControlPanel.className);
    $controlPanel.html(controlPanel.toHTML());

    const $slider = $.create('div', 'slider');
    $slider.$nativeElement.classList.add('slider_horizontal');
    $slider.html(this.toHTML());

    $root.append($controlPanel);
    $root.append($slider);

    return $root;
  }

  render() {
    this.$mainHtmlNode.append(this.getRoot());
  }
}

export default Slider;
