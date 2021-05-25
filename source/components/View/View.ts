import { IOptions } from '../interfaces';
import Emitter from '../../Emitter';
import SliderFactory from '../factories';

class View extends Emitter {
  root: HTMLElement;
  public type!: string;
  public componentList!: any;
  private components!: any[];

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

    this.bind();
  }

  public update(data: Object) {
    this.components.forEach((component) => component.update(data));
  }

  private displaySlider() {
    this.components.forEach((element) => element.display());
  }

  bind() {
    if (this.type === 'simple') {
      this.componentList.Knob.subscribe('mousemove', (data: number) =>
        this.emit('slider:mousemove', data),
      );
      this.componentList.Scale.subscribe('scale:click', (data) =>
        console.log(data),
      );
    } else {
      this.componentList.FirstKnob.subscribe('mousemove', (data) =>
        this.emit('firstKnob:mousemove', data),
      );
      this.componentList.SecondKnob.subscribe('mousemove', (data) =>
        this.emit('secondKnob:mousemove', data),
      );
    }
  }

  private createComponentList() {
    this.componentList = {};

    this.components.forEach((element) => {
      this.componentList[element.constructor.name] = element;
    });
  }
}

export default View;
