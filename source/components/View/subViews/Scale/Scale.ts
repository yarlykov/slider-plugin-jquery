import defaultState from 'Source/defaultState';
import { ScaleEvents } from 'Source/Observer/events';
import { getValueWithStep } from 'Source/utils/utils';
import Fill from 'Components/View/subViews/Fill/Fill';
import { Knob, SecondKnob } from 'Components/View/subViews/Knobs/Knobs';
import Labels from 'Components/View/subViews/Labels/Labels';
import SliderComponent from 'Components/View/subViews/SliderComponent';
import './scale.scss';

class Scale extends SliderComponent {
  public scaleNode!: HTMLElement | null;

  public init(): void {
    this.root.innerHTML = '';
    this.root.insertAdjacentHTML('afterbegin', this.getTemplate());

    this.scaleNode = this.root.querySelector('.js-slider__scale');

    this.addScaleElements();
  }

  public handleScalePointerDown(event: PointerEvent): void {
    if (this.isTarget(event)) {
      const {
        min,
        max,
        valueFrom,
        valueTo,
        step,
        orientation,
        range,
      } = { ...defaultState, ...this.state };

      const scaleCoords = this.scaleNode ? this.getCoords(this.scaleNode) : {};
      const pageCoords = this.getPageCoords(event);
      const position = this.getPosition(orientation, scaleCoords, pageCoords);
      const correctValue = getValueWithStep(min, max, step, position);

      if (range) {
        const delta = (valueTo - valueFrom) / 2;
        const leftHalfOfScale = valueFrom + delta;
        if (correctValue >= leftHalfOfScale) {
          this.emit(ScaleEvents.VALUE_TO_CHANGED, correctValue.toFixed());
          this.emit(ScaleEvents.TARGET_MAX_VALUE_TRIGGERED, event);
        } else {
          this.emit(ScaleEvents.VALUE_FROM_CHANGED, correctValue.toFixed());
          this.emit(ScaleEvents.TARGET_TRIGGERED, event);
        }
      } else {
        this.emit(ScaleEvents.VALUE_FROM_CHANGED, correctValue.toFixed());
        this.emit(ScaleEvents.TARGET_TRIGGERED, event);
      }
    }
  }

  private addScaleElements() {
    const { color, orientation, fill, range, labels, min, max, step } = this.state;

    if (this.scaleNode) {
      this.scaleNode.addEventListener(
        'pointerdown',
        this.handleScalePointerDown.bind(this)
      );
      
      this.scaleNode.insertAdjacentHTML(
        'beforeend',
        Knob.getTemplate(color, orientation)
      );

      if (fill) {
        this.scaleNode.insertAdjacentHTML(
          'afterbegin',
          Fill.getTemplate(color, orientation)
        );
      }

      if (range) {
        this.scaleNode.insertAdjacentHTML(
          'beforeend',
          SecondKnob.getTemplate(color, orientation)
        );
      }

      if (labels) {
        this.scaleNode.insertAdjacentHTML('beforeend', Labels.getTemplate(
          orientation,
          min,
          max,
          step,
        ));
      }
    }
  }

  private isTarget(event: PointerEvent): boolean | unknown {
    if (event.target instanceof HTMLElement) {
      const target =
        event.target.dataset.id === 'scale' ||
        event.target.dataset.id === 'fill';
      return target;
    }
  }

  private getTemplate(): string {
    const { orientation } = this.state;
    return `
      <div class="slider slider_${orientation}">
        <div
          class="slider__scale
          js-slider__scale
          slider__scale_${orientation}"
          data-id="scale"
        ></div>
      </div>
    `;
  }
}

export default Scale;
