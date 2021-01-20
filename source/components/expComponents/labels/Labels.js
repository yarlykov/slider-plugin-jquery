import SliderComponent from '../../../core/SliderComponent';

class Labels extends SliderComponent {
  toHTML() {
    return `
      <div class="slider__labels-item">0</div>
      <div class="slider__labels-item">25</div>
      <div class="slider__labels-item">50</div>
      <div class="slider__labels-item">75</div>
      <div class="slider__labels-item">100</div>
    `;
  }
}
Labels.className = 'slider__labels';

export default Labels;
