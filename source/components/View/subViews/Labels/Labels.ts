import { IOptions, Orientation } from 'Root/source/components/interfaces';
import { LabelsEvents } from 'Source/Observer/events';
import { checkOrientation, fromValueToPercent } from 'Source/utils/utils';
import { TargetType } from 'Components/View/Slider/Slider';
import SliderComponent from 'Components/View/subViews/SliderComponent';
import './labels.scss';

class Labels extends SliderComponent {
  private labels!: HTMLDivElement

  constructor(options: IOptions, root: HTMLElement, target: TargetType) {
    super(options, root, target);
    this.init();
  }

  public getLabelsNode(): HTMLDivElement {
    return this.labels;
  }

  private init(): void {
    const { orientation, min, max, step } = this.state;
    const orientationMod = checkOrientation(orientation) ? orientation : 'horizontal';

    this.labels = this.createLabels(orientationMod, min, max, step);
    this.labels.addEventListener('pointerdown', this.handleLabelsPointerDown.bind(this));
  }

  private handleLabelsPointerDown(event: PointerEvent) {
    if (event.target instanceof HTMLElement) {
      const targetValue = Number(event.target.dataset.value);
      // let correctValue = getValueWithStep(min, max, step, targetValue);
      // if (targetValue === 100) correctValue = max;

      // if (isRange) {
      //   const delta = (valueTo - valueFrom) / 2;
      //   const leftHalfOfScale = valueFrom + delta;
      //   if (correctValue >= leftHalfOfScale) {
      //     this.emit(LabelsEvents.LABELS_VALUE_TO_CHANGED, correctValue);
      //   } else {
      //     this.emit(LabelsEvents.LABELS_VALUE_FROM_CHANGED, correctValue);
      //   }
      // } else {
      // }
      this.emit(LabelsEvents.LABELS_VALUE_FROM_CHANGED, targetValue);
    }
  }

  private createLabels(
    orientation: Orientation,
    min: number,
    max: number,
    step: number
  ): HTMLDivElement {
    const labels = document.createElement('div');
    labels.classList.add(
      'slider__labels',
      `slider__labels_${orientation}`
    );
    labels.setAttribute('data-id', 'labels');

    const labelsList = this.getLabels(orientation, min, max, step);
    labelsList.forEach((label) => labels.insertAdjacentElement('afterbegin', label));

    return labels;
  }

  private getLabels(
    orientation: Orientation,
    min: number,
    max: number,
    step: number
  ): HTMLDivElement[] {
    const itemLabels: HTMLDivElement[] = [];
    let labelValues: number[] = [20, 40, 60, 80];

    labelValues = labelValues
      .map((value) => {
        const stepCount = (max - min) / step;
        const stepPercent = 100 / stepCount;
        const stepPosition = Math.round(value / stepPercent) * step;
        const valueWithStep = stepPosition + min;
        return valueWithStep;
      })
      .concat(min, max)
      .sort((a, b) => a - b);

    labelValues.forEach((value) => {
      itemLabels.push(this.createLabel(orientation, value, min, max, step));
    });

    return itemLabels;
  }

  private createLabel(
    orientation: Orientation,
    labelPosition: number,
    min: number,
    max: number,
    step: number
  ): HTMLDivElement {
    const directionOfMove = orientation === 'horizontal' ? 'left' : 'bottom';
    const labelPosWithPercent = fromValueToPercent(
      { min, max, step },
      labelPosition,
    ).toFixed(2);

    const label = document.createElement('div');
    label.classList.add('slider__labels-item');
    label.setAttribute('data-value', `${labelPosWithPercent}`);
    label.style[directionOfMove] = `${labelPosWithPercent}%`
    label.textContent = `${labelPosition}`

    return label;
  }
}

export default Labels;
