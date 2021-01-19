import SliderComponent from '../../../core/SliderComponent';

class Tooltip extends SliderComponent {
  toHTML() {
    return '<h1>Tooltip</h1>';
  }
}
Tooltip.className = '.slider__tooltip';

export default Tooltip;
