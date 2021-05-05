import { IOptions } from '../interfaces';
import Scale from './subViews/Scale/Scale';
import Fill from './subViews/Fill';
import Labels from './subViews/Labels';
import Knobs from './subViews/Knobs';
import Tooltips from './subViews/Tooltips';

class View {
  root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  public init(options: IOptions): void {
    if (!options) throw new Error('options is not defined');
    const elements = [Scale, Fill, Knobs, Labels, Tooltips];

    elements.forEach(Element => {
      const element = new Element();
      element.display(options, this.root)
    })
  }
}

export default View;
