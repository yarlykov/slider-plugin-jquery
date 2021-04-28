import Fill from '../subViews/Fill';
import Scale from '../subViews/Scale/Scale';
import { IOptions } from '../../View/View';

class SliderFactory {
  static baseComponent: any;

  public create(options: IOptions, root: HTMLElement | null): void {
    const { fill } = options;

    SliderFactory.baseComponent.forEach((Component: new () => any) => {
      const component = new Component();
      component.display(options, root);
    });

    if (typeof fill === 'boolean' && fill) {
      const fill = new Fill();
      fill.display(options);
    }
  }
}

SliderFactory.baseComponent = [Scale];

export default SliderFactory;
