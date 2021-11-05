import { KnobEvents, LabelsEvents, ScaleEvents, ViewEvents } from '../../Observer/events';
import Observer from '../../Observer/Observer';
import { Components, ComponentsList, IOptions } from '../interfaces';
import { SliderFactory } from './Factories/factories';

class View extends Observer {
  public componentList!: ComponentsList;

  private root: HTMLElement;

  private type!: string;

  private components!: Components;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
  }

  public init(options: IOptions): void {
    if (!options) throw new Error('options were not passed');

    this.components = [];
    this.type = options.range ? 'range' : 'simple';
    const sliderFactory = new SliderFactory();
    const slider = sliderFactory.create(this.type);

    this.components = slider.createComponents(options, this.root);

    this.displaySlider();
    this.createComponentList();
    this.bindEvents();
  }

  public update(state: IOptions): void {
    this.components.forEach((component) => {
      if (component) component.update(state);
    });
  }

  private displaySlider(): void {
    this.components.forEach((element) => {
      if (element) element.display();
    });
  }

  private bindEvents(): void {
    this.bindScaleEvents();
    this.bindKnobsEvents();
    this.bindLabelsEvents();
  }

  private createComponentList(): void {
    this.componentList = {};

    this.components.forEach((element) => {
      if (element) this.componentList[element.constructor.name] = element;
    });
  }

  /* istanbul ignore next */
  private bindScaleEvents(): void {
    if (this.componentList.Scale) {
      this.componentList.Scale.subscribe(ScaleEvents.VALUE_FROM_CHANGED, (valueFrom) =>
        this.emit(ViewEvents.VALUE_FROM_CHANGED, valueFrom),
      );

      this.componentList.Scale.subscribe(ScaleEvents.VALUE_TO_CHANGED, (valueTo) =>
        this.emit(ViewEvents.VALUE_TO_CHANGED, valueTo),
      );

      this.componentList.Scale.subscribe(ScaleEvents.TARGET_TRIGGERED, (event) => {
        if (this.componentList.Knob)
          this.componentList.Knob.handleKnobPointerDown(event as PointerEvent);
      });

      this.componentList.Scale.subscribe(ScaleEvents.TARGET_MAX_VALUE_TRIGGERED, (event) => {
        if (this.componentList.SecondKnob)
          this.componentList.SecondKnob.handleSecondKnobPointerDown(event as PointerEvent);
      });
    }
  }
  /* istanbul ignore next */
  private bindKnobsEvents(): void {
    if (this.componentList.Knob) {
      this.componentList.Knob.subscribe(KnobEvents.VALUE_CHANGED, (valueFrom) =>
        this.emit(ViewEvents.VALUE_FROM_CHANGED, valueFrom),
      );
    }

    if (this.type === 'range' && this.componentList.SecondKnob) {
      this.componentList.SecondKnob.subscribe(KnobEvents.VALUE_CHANGED, (valueTo) =>
        this.emit(ViewEvents.VALUE_TO_CHANGED, valueTo),
      );
    }
  }
  /* istanbul ignore next */
  private bindLabelsEvents(): void {
    if (this.componentList.Labels) {
      this.componentList.Labels.subscribe(LabelsEvents.VALUE_FROM_CHANGED, (valueFrom) =>
        this.emit(ViewEvents.VALUE_FROM_CHANGED, valueFrom),
      );

      this.componentList.Labels.subscribe(LabelsEvents.VALUE_TO_CHANGED, (valueTo) =>
        this.emit(ViewEvents.VALUE_TO_CHANGED, valueTo),
      );
    }
  }
}

export default View;
