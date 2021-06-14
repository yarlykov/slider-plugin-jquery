import './labels.scss';
import SliderComponent from '../SliderComponent';
import { fromValueToPercent, getValueWithStep } from '../../../../utils/utils';

class Labels extends SliderComponent {
  display() {
    const scale = this.root.querySelector('[data-id="scale"]');
    if (!scale) throw new Error('Ooops... scale is not found');

    if (this.state.labels) {
      scale.insertAdjacentHTML('beforeend', this.getTemplate());
      const labels = this.root.querySelector(
        '[data-id="labels"]',
      ) as HTMLElement;

      this.onMouseDown = this.onMouseDown.bind(this);
      labels.addEventListener('mousedown', this.onMouseDown);
    }
  }

  getTemplate() {
    const { orientation = 'horizontal' } = this.state;

    return `
      <div class="slider__labels slider__labels_${orientation}" data-id="labels">
        ${this.getLabels()}
      </div>
    `;
  }

  getLabels(): string {
    const { min = 0, max = 0, step = 1 } = this.state;

    const itemLabels: string[] = [];
    let labelValues: number[] = [20, 40, 60, 80];

    labelValues = labelValues
      .map((value) => getValueWithStep(min, max, step, value))
      .concat(min, max)
      .sort((a, b) => a - b);

    labelValues.forEach((value) => {
      itemLabels.push(this.createLabel(value));
    });

    return itemLabels.join('');
  }

  createLabel(labelPosition: number = 0): string {
    const { orientation } = this.state;
    const directionOfMove = orientation === 'horizontal' ? 'left' : 'bottom';
    const labelPosWithPercent = fromValueToPercent(
      this.state,
      labelPosition,
    ).toFixed(2);

    const label = `
      <div class="slider__labels-item" 
      style="${directionOfMove}: ${labelPosWithPercent}%;"
      data-value=${labelPosWithPercent}>
        ${labelPosition}
      </div>
    `;

    return label;
  }

  onMouseDown(event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      const {
        min,
        max = 0,
        step = 1,
        valueFrom = 0,
        valueTo = 0,
        range = false,
      } = this.state;

      const targetValue = Number(event.target.dataset.value);
      let correctValue = getValueWithStep(min, max, step, targetValue);
      if (targetValue === 100) correctValue = max;

      if (range) {
        const delta = (valueTo - valueFrom) / 2;
        const leftHalfOfScale = valueFrom + delta;
        if (correctValue >= leftHalfOfScale) {
          this.emit('labels:valueTo', correctValue);
        } else {
          this.emit('labels:valueFrom', correctValue);
        }
      } else {
        this.emit('labels:valueFrom', correctValue);
      }
    }
  }
}

export default Labels;
