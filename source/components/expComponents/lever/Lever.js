import SliderComponent from '../../../core/SliderComponent';

class Lever extends SliderComponent {
  toHTML() {
    return '<h1>Lever</h1>';
  }
}
Lever.className = '.slider__lever';

export default Lever;
