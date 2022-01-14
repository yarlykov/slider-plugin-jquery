import Observer from 'Source/Observer/Observer';
import { KnobEvents, LabelsEvents, ScaleEvents, ViewEvents } from 'Source/Observer/events';
import { IOptions } from 'Components/interfaces';
import Knob from './subViews/Knob/Knob';
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
    this.checkKnobZIndex();
  }

  public update(state: IOptions): void {
    const componentInstances = Object.values(this.sliderComponents)
    componentInstances.forEach((component) => {
      if (component) component.update(state);
    });
  }

  private checkKnobZIndex() {
    const { knob } = this.sliderComponents;
    let secondKnob: Knob;
    let secondKnobNode: HTMLDivElement;
    
    if ('secondKnob' in this.sliderComponents) {
      secondKnob = this.sliderComponents.secondKnob;
      secondKnobNode = secondKnob.getKnobNode();

      knob.subscribe(KnobEvents.KNOB_VALUE_FROM_CHANGED, () => {
        knob.getKnobNode().style.zIndex = '1';
        secondKnobNode.style.zIndex = '0';
      });

      secondKnob.subscribe(KnobEvents.KNOB_VALUE_TO_CHANGED, () => {
        knob.getKnobNode().style.zIndex = '0';
        secondKnob.getKnobNode().style.zIndex = '1';
      })
    }
  }

  private bindEvents(): void {
    this.bindScaleEvents();
    this.bindKnobsEvents();
    this.bindLabelsEvents();
  }

  /* istanbul ignore next */
  private bindScaleEvents(): void {
    this.sliderComponents.scale.subscribe(ScaleEvents.SCALE_VALUE_FROM_CHANGED, (valueFrom) =>
      this.emit(ViewEvents.VALUE_FROM_CHANGED, valueFrom),
    );

    this.sliderComponents.scale.subscribe(ScaleEvents.SCALE_VALUE_TO_CHANGED, (valueTo) =>
      this.emit(ViewEvents.VALUE_TO_CHANGED, valueTo),
    );
  }
  /* istanbul ignore next */
  private bindKnobsEvents(): void {
    const { knob } = this.sliderComponents;

    knob.subscribe(KnobEvents.KNOB_VALUE_FROM_CHANGED, (valueFrom) =>
      this.emit(ViewEvents.VALUE_FROM_CHANGED, valueFrom),
    );

    if (this.type === TargetType.range && this.sliderComponents['secondKnob']) {
      if ('secondKnob' in this.sliderComponents) {
        const { secondKnob } = this.sliderComponents

        secondKnob.subscribe(KnobEvents.KNOB_VALUE_TO_CHANGED, (valueTo) => 
          this.emit(ViewEvents.VALUE_TO_CHANGED, valueTo),
        );
      }
    }
  }
  /* istanbul ignore next */
  private bindLabelsEvents(): void {
    this.sliderComponents.labels.subscribe(LabelsEvents.LABELS_VALUE_FROM_CHANGED, (valueFrom) =>
      this.emit(ViewEvents.VALUE_FROM_CHANGED, valueFrom),
    );

    this.sliderComponents.labels.subscribe(LabelsEvents.LABELS_VALUE_TO_CHANGED, (valueTo) =>
      this.emit(ViewEvents.VALUE_TO_CHANGED, valueTo),
    );
  }
}

export default View;
