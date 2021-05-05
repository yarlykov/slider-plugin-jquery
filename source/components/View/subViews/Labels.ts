import { IOptions } from '../../interfaces';

class Labels {
  display(options: IOptions, root: HTMLElement) {
    const scale = root.querySelector('[data-id="scale"]');

    if (!scale) throw new Error('Ooops... scale is not found');
    const labels = this.createLabels(options);
    if (options.labels) scale.insertAdjacentHTML('beforeend', labels);
  }

  toLabel(
    minLabelCount: number = 0,
    maxLabelCount: number = 100,
    step: number = 1,
    orientation: string = 'horizontal',
  ): string {
    const stepValue = step === 0 ? 1 : step;
    const labels = [];
    const nextLabelCount = (maxLabelCount * stepValue) / 100;

    if (orientation === 'horizontal') {
      for (let i = minLabelCount; i <= maxLabelCount; i += nextLabelCount) {
        const label = `<div class="slider__labels-item">${i}</div>`;
        labels.push(label);
      }
    } else {
      for (let i = maxLabelCount; i >= minLabelCount; i -= nextLabelCount) {
        const label = `<div class="slider__labels-item">${i}</div>`;
        labels.push(label);
      }
    }

    return labels.join('');
  }

  createLabels(options: IOptions) {
    const { orientation = 'horizontal', min, max, step } = options;
    return `
      <div class="slider__labels slider__labels_${orientation}" data-id="labels">
        ${this.toLabel(min, max, step, orientation)}
      </div>
    `;
  }
}

export default Labels;
