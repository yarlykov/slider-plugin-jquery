import { LabelsEvents } from '../../../../Observer/events';
import { fromValueToPercent, getValueWithStep } from '../../../../utils/utils';
import SliderComponent from '../SliderComponent';
import './labels.scss';

class Labels extends SliderComponent {
  public display(): void {
    const scale = this.root.querySelector('[data-id="scale"]');
    if (!scale) throw new Error('Scale element is not found');

    if (this.state.labels) {
      scale.insertAdjacentHTML('beforeend', this.getTemplate());
      const labels: HTMLElement | null = this.root.querySelector(
        '[data-id="labels"]',
      );

      this.onPointerDown = this.onPointerDown.bind(this);
      if (labels) labels.addEventListener('pointerdown', this.onPointerDown);
    }
  }

  private onPointerDown(event: PointerEvent) {
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
          this.emit(LabelsEvents.VALUE_TO_CHANGED, correctValue);
        } else {
          this.emit(LabelsEvents.VALUE_FROM_CHANGED, correctValue);
        }
      } else {
        this.emit(LabelsEvents.VALUE_FROM_CHANGED, correctValue);
      }
    }
  }

  private getTemplate() {
    const { orientation = 'horizontal' } = this.state;

    return `
      <div class="slider__labels slider__labels_${orientation}" data-id="labels">
        ${this.getLabels()}
      </div>
    `;
  }

  private getLabels(): string {
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

  private createLabel(labelPosition = 0): string {
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
}

export default Labels;
