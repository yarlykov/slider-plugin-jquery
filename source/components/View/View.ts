import Observer from 'Source/Observer/Observer';
import { KnobEvents, LabelsEvents, ScaleEvents, ViewEvents } from 'Source/Observer/events';
import { IOptions } from 'Components/interfaces';
import { Slider, SliderType, TargetType } from './Slider/Slider';

type ViewEvent = 
  | { type: ViewEvents.VALUE_FROM_CHANGED, data: number | string }
  | { type: ViewEvents.VALUE_TO_CHANGED, data: number | string }

class View extends Observer<ViewEvent> {
  private root: HTMLElement;

  private type!: TargetType;

  private sliderComponents!: SliderType;

  constructor(root: HTMLElement, options: IOptions) {
    super();
    this.root = root;
    this.init(options)
  }

  public init(options: IOptions): void {
    this.type = options.isRange ? TargetType.range : TargetType.simple;
    const slider = new Slider(options, this.root, this.type);
    this.sliderComponents = slider.getComponents();
    
    this.bindEvents();
    this.update(options);
  }

  public update(state: IOptions): void {
    const componentInstances = Object.values(this.sliderComponents)
    componentInstances.forEach((component) => {
      if (component) component.update(state);
    });
  }

  private bindEvents(): void {
    this.bindScaleEvents();
    this.bindKnobsEvents();
    this.bindLabelsEvents();
  }

  /* istanbul ignore next */
  private bindScaleEvents(): void {
    if (!this.sliderComponents.scale) return;

    this.sliderComponents.scale.subscribe(ScaleEvents.SCALE_VALUE_FROM_CHANGED, (valueFrom) =>
      this.emit(ViewEvents.VALUE_FROM_CHANGED, valueFrom),
    );

    this.sliderComponents.scale.subscribe(ScaleEvents.SCALE_VALUE_TO_CHANGED, (valueTo) =>
      this.emit(ViewEvents.VALUE_TO_CHANGED, valueTo),
    );
  }
  /* istanbul ignore next */
  private bindKnobsEvents(): void {
    if (this.sliderComponents.knob) {
      this.sliderComponents.knob.subscribe(KnobEvents.KNOB_VALUE_FROM_CHANGED, (valueFrom) =>
        this.emit(ViewEvents.VALUE_FROM_CHANGED, valueFrom),
      );
    }

    if (this.type === TargetType.range && this.sliderComponents['secondKnob']) {
      if ('secondKnob' in this.sliderComponents) {
        this.sliderComponents.secondKnob.subscribe(KnobEvents.KNOB_VALUE_TO_CHANGED, (valueTo) =>
          this.emit(ViewEvents.VALUE_TO_CHANGED, valueTo),
        );
      }
    }
  }
  /* istanbul ignore next */
  private bindLabelsEvents(): void {
    if (!this.sliderComponents.labels) return;
    
    this.sliderComponents.labels.subscribe(LabelsEvents.LABELS_VALUE_FROM_CHANGED, (valueFrom) =>
      this.emit(ViewEvents.VALUE_FROM_CHANGED, valueFrom),
    );

    this.sliderComponents.labels.subscribe(LabelsEvents.LABELS_VALUE_TO_CHANGED, (valueTo) =>
      this.emit(ViewEvents.VALUE_TO_CHANGED, valueTo),
    );
  }
}

export default View;
