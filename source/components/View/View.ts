import { IOptions } from '../interfaces';
import Scale from './subViews/Scale/Scale';
import Fill from './subViews/Fill';
import Labels from './subViews/Labels';
import Knobs from './subViews/Knobs';
import Tooltips from './subViews/Tooltips';

class View {
  root: HTMLElement;
  components: any[];

  constructor(root: HTMLElement) {
    this.root = root;
    this.components = [];
  }

  public init(options: IOptions): void {
    if (!options) throw new Error('options were not passed');

    const elements = [Scale, Fill, Knobs, Labels, Tooltips];

    elements.forEach((Element) => {
      const element = new Element(options, this.root);
      this.components.push(element);
      element.display();
    });
  }

  public update(data: Object) {
    this.components.forEach((component) => {
      component.update(data);
    });
  }
}

export default View;
