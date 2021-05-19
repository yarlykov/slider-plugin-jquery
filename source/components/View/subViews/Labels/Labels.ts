import './labels.scss';
import SliderComponent from '../SliderComponent';

class Labels extends SliderComponent {
  display() {
    const scale = this.root.querySelector('[data-id="scale"]');
    if (!scale) throw new Error('Ooops... scale is not found');

    if (this.options.labels)
      scale.insertAdjacentHTML('beforeend', this.getTemplate());
  }

  getTemplate() {
    const { orientation = 'horizontal', min, max, step } = this.options;

    return `
      <div class="slider__labels slider__labels_${orientation}" data-id="labels">
        ${this.toLabel(min, max, step)}
      </div>
    `;
  }

  toLabel(
    minLabelCount: number = 0,
    maxLabelCount: number = 100,
    step: number = 25,
  ): string {
    const { orientation } = this.options;
    const stepValue = step === 0 ? 1 : step;
    const labels = [];
    const nextLabelCount = (maxLabelCount * stepValue) / 100;

    for (let i = minLabelCount; i <= maxLabelCount; i += nextLabelCount) {
      const label = `<div class="slider__labels-item">${i}</div>`;
      labels.push(label);
    }

    if (orientation === 'vertical') return labels.reverse().join('');
    return labels.join('');
  } // REFACTOR THIS!!!!!!!!!!
}

export default Labels;
