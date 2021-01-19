import SliderComponent from '../../../core/SliderComponent';

class Labels extends SliderComponent {
  toHTML() {
    return '<h1>Labels</h1>';
  }
}
Labels.className = '.slider__labels';

export default Labels;
