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
    if (!options) throw new Error('options is not defined')
    const orientation: string = options.orientation || 'horizontal';

    const scale = new Scale();
    const fill = new Fill();
    const knob = new Knobs();
    const labels = new Labels();
    const tooltips = new Tooltips();

    scale.display(orientation, this.root);
    if (options.fill) {
      fill.display(options);
    }
    knob.display(options);
    if (options.labels) {
      labels.display(options);
    }
    if (options.tooltips) {
      tooltips.display(options);
    }
  }
}

export default View ;
