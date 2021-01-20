import SliderComponent from '../../../core/SliderComponent';

class Lever extends SliderComponent {
  toHTML() {
    return `
      <div class="slider__tooltip slider__tooltip_horizontal slider__tooltip_orange">
        <span class="tooltip__value">53 ¥</span>
        <div class="slider__tooltip_arrow"></div>
      </div>
    `;
  }
}
Lever.className = 'slider__lever';

export default Lever;
