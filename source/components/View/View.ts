import { Components, ComponentsList, IOptions } from '../interfaces';
import Emitter from '../../Emitter/Emitter';
import { SliderFactory } from './Factories/factories';

class View extends Emitter {
  root: HTMLElement;

  public type!: string;

  public componentList!: ComponentsList;

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

  public update(data: IOptions): void {
    this.components.forEach((component) => {
      if (component) component.update(data);
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

  private bindScaleEvents(): void {
    if (this.componentList.Scale) {
      this.componentList.Scale.subscribe('scale:valueFrom', (valueFrom) =>
        this.emit('slider:mousemove', valueFrom),
      );

      this.componentList.Scale.subscribe('scale:valueTo', (valueTo) =>
        this.emit('secondKnob:mousemove', valueTo),
      );

      this.componentList.Scale.subscribe('scale:target', (event) => {
        if (this.componentList.Knob)
          this.componentList.Knob.onMouseDown(event as MouseEvent);
      });

      this.componentList.Scale.subscribe('scale:targetMax', (event) => {
        if (this.componentList.SecondKnob)
          this.componentList.SecondKnob.onMouseDown(event as MouseEvent);
      });
    }
  }

  private bindKnobsEvents(): void {
    if (this.componentList.Knob) {
      this.componentList.Knob.subscribe('changeValue', (valueFrom) =>
        this.emit('slider:mousemove', valueFrom),
      );
    }

    if (this.type === 'range' && this.componentList.SecondKnob) {
      this.componentList.SecondKnob.subscribe('changeValue', (valueFrom) =>
        this.emit('secondKnob:mousemove', valueFrom),
      );
    }
  }

  private bindLabelsEvents(): void {
    if (this.componentList.Labels) {
      this.componentList.Labels.subscribe('labels:valueFrom', (valueFrom) =>
        this.emit('slider:mousemove', valueFrom),
      );

      this.componentList.Labels.subscribe('labels:valueTo', (valueTo) =>
        this.emit('secondKnob:mousemove', valueTo),
      );
    }
  }
}

export default View;
