import { LabelsEvents } from 'Source/Observer/events';
import { fromValueToPercent, getValueWithStep } from 'Source/utils/utils';
import SliderComponent from 'Components/View/subViews/SliderComponent';
import './labels.scss';

class Labels extends SliderComponent {
  public init(): void {
    if (this.state.hasLabels) {
      const labels: HTMLElement | null = this.root.querySelector(
        '.js-slider__labels',
      );

      if (labels) labels.addEventListener('pointerdown', this.handleLabelsPointerDown.bind(this));
    }
  }

  private handleLabelsPointerDown(event: PointerEvent) {
    if (event.target instanceof HTMLElement) {
      const {
        min,
        max,
        step,
        valueFrom,
        valueTo,
        isRange,
      } = this.state;

      const targetValue = Number(event.target.dataset.value);
      let correctValue = getValueWithStep(min, max, step, targetValue);
      if (targetValue === 100) correctValue = max;

      if (isRange) {
        const delta = (valueTo - valueFrom) / 2;
        const leftHalfOfScale = valueFrom + delta;
        if (correctValue >= leftHalfOfScale) {
          this.emit(LabelsEvents.LABELS_VALUE_TO_CHANGED, correctValue);
        } else {
          this.emit(LabelsEvents.LABELS_VALUE_FROM_CHANGED, correctValue);
        }
      } else {
        this.emit(LabelsEvents.LABELS_VALUE_FROM_CHANGED, correctValue);
      }
    }
  }

  public static getTemplate(
    orientation: string,
    min: number,
    max: number,
    step: number
  ): string {
    return `
      <div class="slider__labels
        js-slider__labels
        slider__labels_${orientation}"
        data-id="labels"
      >
        ${this.getLabels(orientation, min, max, step)}
      </div>
    `;
  }

  private static getLabels(
    orientation: string,
    min: number,
    max: number,
    step: number
  ): string {
    const itemLabels: string[] = [];
    let labelValues: number[] = [20, 40, 60, 80];

    labelValues = labelValues
      .map((value) => getValueWithStep(min, max, step, value))
      .concat(min, max)
      .sort((a, b) => a - b);

    labelValues.forEach((value) => {
      itemLabels.push(this.createLabel(orientation, value, min, max, step));
    });

    return itemLabels.join('');
  }

  private static createLabel(
    orientation: string,
    labelPosition: number,
    min: number,
    max: number,
    step: number
  ): string {
    const directionOfMove = orientation === 'horizontal' ? 'left' : 'bottom';
    const labelPosWithPercent = fromValueToPercent(
      { min, max, step },
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
