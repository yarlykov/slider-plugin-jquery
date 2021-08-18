import { Components, ComponentsList, IOptions } from '../interfaces';
import Observer from '../../Observer/Observer';
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
      this.componentList.Scale.subscribe('scale:valueFrom', (valueFrom) =>
        this.emit('valueFromChanged', valueFrom),
      );

      this.componentList.Scale.subscribe('scale:valueTo', (valueTo) =>
        this.emit('valueToChanged', valueTo),
      );

      this.componentList.Scale.subscribe('scale:target', (event) => {
        if (this.componentList.Knob)
          this.componentList.Knob.onPointerDown(event as PointerEvent);
      });

      this.componentList.Scale.subscribe('scale:targetMax', (event) => {
        if (this.componentList.SecondKnob)
          this.componentList.SecondKnob.onPointerDown(event as PointerEvent);
      });
    }
  }
  /* istanbul ignore next */
  private bindKnobsEvents(): void {
    if (this.componentList.Knob) {
      this.componentList.Knob.subscribe('changeValue', (valueFrom) =>
        this.emit('valueFromChanged', valueFrom),
      );
    }

    if (this.type === 'range' && this.componentList.SecondKnob) {
      this.componentList.SecondKnob.subscribe('changeValue', (valueFrom) =>
        this.emit('valueToChanged', valueFrom),
      );
    }
  }
  /* istanbul ignore next */
  private bindLabelsEvents(): void {
    if (this.componentList.Labels) {
      this.componentList.Labels.subscribe('labels:valueFrom', (valueFrom) =>
        this.emit('valueFromChanged', valueFrom),
      );

      this.componentList.Labels.subscribe('labels:valueTo', (valueTo) =>
        this.emit('valueToChanged', valueTo),
      );
    }
  }
}

export default View;
