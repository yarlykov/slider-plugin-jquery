import Observer from 'Source/Observer/Observer';
import { KnobEvents, LabelsEvents, ScaleEvents, ViewEvents } from 'Source/Observer/events';
import { IOptions, RangeSliderType, SimpleSliderType } from 'Components/interfaces';
import { SliderFactory } from './Factories/factories';

type ViewEvent = 
  | { type: ViewEvents.VALUE_FROM_CHANGED, data: number | string }
  | { type: ViewEvents.VALUE_TO_CHANGED, data: number | string }

class View extends Observer<ViewEvent> {
  private root: HTMLElement;

  private type!: string;

  public components!: SimpleSliderType & RangeSliderType;

  constructor(root: HTMLElement, options: IOptions) {
    super();
    this.root = root;
    this.init(options)
  }

  public init(options: IOptions): void {
    this.type = options.range ? 'range' : 'simple';
    const slider = SliderFactory.create(this.type);

    this.components = slider.createComponents(options, this.root);

    this.displaySlider();
    this.bindEvents();
    this.update(options);
  }

  public update(state: Partial<IOptions>): void {
    const componentInstances = Object.values(this.components)
    componentInstances.forEach((component) => {
      if (component) component.update(state);
    });
  }

  private displaySlider(): void {
    const componentInstances = Object.values(this.components)
    componentInstances.forEach((element) => {
      if (element) element.init();
    });
  }

  private bindEvents(): void {
    this.bindScaleEvents();
    this.bindKnobsEvents();
    this.bindLabelsEvents();
  }

  /* istanbul ignore next */
  private bindScaleEvents(): void {
    if (!this.components.scale) return;

    this.components.scale.subscribe(ScaleEvents.SCALE_VALUE_FROM_CHANGED, (valueFrom) =>
      this.emit(ViewEvents.VALUE_FROM_CHANGED, valueFrom),
    );

    this.components.scale.subscribe(ScaleEvents.SCALE_VALUE_TO_CHANGED, (valueTo) =>
      this.emit(ViewEvents.VALUE_TO_CHANGED, valueTo),
    );

    this.components.scale.subscribe(ScaleEvents.TARGET_TRIGGERED, () => {
      if (this.components.knob)
        this.components.knob.handleKnobPointerDown();
    });

    this.components.scale.subscribe(ScaleEvents.TARGET_MAX_VALUE_TRIGGERED, () => {
      if (this.components.secondKnob)
        this.components.secondKnob.handleSecondKnobPointerDown();
    });
  }
  /* istanbul ignore next */
  private bindKnobsEvents(): void {
    if (this.components.knob) {
      this.components.knob.subscribe(KnobEvents.KNOB_VALUE_FROM_CHANGED, (valueFrom) =>
        this.emit(ViewEvents.VALUE_FROM_CHANGED, valueFrom),
      );
    }

    if (this.type === 'range' && this.components.secondKnob) {
      this.components.secondKnob.subscribe(KnobEvents.KNOB_VALUE_TO_CHANGED, (valueTo) =>
        this.emit(ViewEvents.VALUE_TO_CHANGED, valueTo),
      );
    }
  }
  /* istanbul ignore next */
  private bindLabelsEvents(): void {
    if (!this.components.labels) return;
    
    this.components.labels.subscribe(LabelsEvents.LABELS_VALUE_FROM_CHANGED, (valueFrom) =>
      this.emit(ViewEvents.VALUE_FROM_CHANGED, valueFrom),
    );

    this.components.labels.subscribe(LabelsEvents.LABELS_VALUE_TO_CHANGED, (valueTo) =>
      this.emit(ViewEvents.VALUE_TO_CHANGED, valueTo),
    );
  }
}

export default View;
