import { IOptions } from '../interfaces';
import Model from '../Model/Model';
import View from '../View/View';

class Presenter {
  public model: any;
  public view: any;
  root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    this.model = new Model();
    this.view = new View(root);
    this.view.init(this.model.state);
    this.view.update(this.model.state);

    this.bind();
  }

  bind() {
    this.model.subscribe('stateChanged', (data: IOptions) => {
      this.view.init(data);
      this.view.update(data);

      this.root.dispatchEvent(
        new CustomEvent('onChange', {
          detail: this.model.state,
        }),
      );
    });

    this.model.subscribe('valueChanged', (data: IOptions) => {
      this.view.update(data);

      this.root.dispatchEvent(
        new CustomEvent('onChange', {
          detail: this.model.state,
        }),
      );
    });

    this.view.subscribe('slider:mousemove', (data: number) => {
      this.model.setValue('current', Number(data));
    });

    this.view.subscribe('secondKnob:mousemove', (data: number) => {
      this.model.setValue('rangeMax', Number(data));
    });
  }
}

export default Presenter;
