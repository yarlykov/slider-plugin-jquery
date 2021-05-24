import { IOptions } from '../interfaces';
import Emitter from '../../Emitter';
import SliderFactory from '../factories';

class View extends Emitter {
  root: HTMLElement;
  public type!: string;
  public componentList!: {};
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
    // this.componentList.knobs.subscribe('mousemove', (data) =>
    //   this.emit('mousemove', data),
    // );
    console.log(this.components);
  }

  public update(data: Object) {
    this.components.forEach((component) => component.update(data));
  }

  private displaySlider() {
    this.components.forEach((element) => element.display());
  }

  private createComponentList() {
    this.componentList = {};

    this.components.forEach((element) => {
      this.componentList[element.constructor.name.toLowerCase()] = element;
    });
  }
}

export default View;
