import { IOptions } from '../interfaces';
import Scale from './subViews/Scale/Scale';
import Fill from './subViews/Fill';

class View {
  root: HTMLElement;
  options: IOptions;
  orientation: string;

  constructor(root: HTMLElement, options: IOptions) {
    this.root = root;
    this.options = options;
    this.orientation = this.options.orientation || 'horizontal';

    this.init();
  }

  public init(): void {
    const scale = new Scale();
    const fill = new Fill();

    scale.display(this.orientation, this.root);

    if (this.options.fill) {
      fill.display(this.options);
    }
  }
}

export default View ;
