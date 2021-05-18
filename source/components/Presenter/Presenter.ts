import { IOptions } from '../interfaces';
import Model from '../Model/Model';
import View from '../View/View';

class Presenter {
  public model: any;
  public view: any;

  constructor(root: HTMLElement) {
    this.model = new Model();
    this.view = new View(root);
    this.view.init(this.model.state);

    this.model.subscribe('changeState', (data: IOptions) => {
      this.view.init(data);
    });

    this.model.subscribe('changeValue', (data: IOptions) => {
      this.view.update(data);
    });

    const control = root.previousElementSibling as Element;
    const input = control.querySelector(
      '[data-title="current"]',
    ) as HTMLElement;
    
    input.addEventListener('change', (event: Event) => {
      let value = event.target.value;
      this.model.setValue('currentValue', Number(value));
    });
  }
}

export default Presenter;
