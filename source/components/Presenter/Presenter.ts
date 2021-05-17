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
  }
}

export default Presenter;
