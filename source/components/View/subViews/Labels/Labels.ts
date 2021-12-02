import { LabelsEvents } from 'Source/Observer/events';
import { fromValueToPercent, getValueWithStep } from 'Source/utils/utils';
import defaultState from 'Source/defaultState';
import SliderComponent from 'Components/View/subViews/SliderComponent';
import './labels.scss';

class Labels extends SliderComponent {
  public init(): void {
    const scale = this.root.querySelector('.js-slider__scale');
    if (!scale) throw new Error('Scale element is not found');

    if (this.state.labels) {
      const labels: HTMLElement | null = this.root.querySelector(
        '.js-slider__labels',
      );

      if (labels) labels.addEventListener('pointerdown', this.handleLabelsPointerDown.bind(this));
    }
  }

  private handleLabelsPointerDown(event: PointerEvent) {
    if (event.target instanceof HTMLElement) {
      const {
        min = defaultState.min,
        max = defaultState.max,
        step = defaultState.step,
        valueFrom = defaultState.valueFrom,
        valueTo = defaultState.valueTo,
        range = defaultState.range,
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

  public static getTemplate(
    orientation = 'horizontal',
    min = 0,
    max = 0,
    step = 1
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

  private static getLabels(orientation = 'horizontal', min = 0, max = 0, step = 1): string {
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
    orientation = 'horizontal',
    labelPosition = 0,
    min = 0,
    max = 0,
    step = 1
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
