import Fill from '../subViews/Fill';
import Scale from '../subViews/Scale';
import Wrapper from '../subViews/Wrapper/Wrapper';
import { OptionsInterface } from '../../View/View';

class SliderFactory {
  static baseComponent: any;

  public create(options: OptionsInterface, root: HTMLElement | null): void {
    const { elements } = options;

    SliderFactory.baseComponent.forEach((Component: new () => any) => {
      const component = new Component();
      component.create(options, root);
    });

    if (typeof elements?.fill === 'boolean' && elements.fill) {
      const fill = new Fill();
      fill.create(options);
    }
  }
}

SliderFactory.baseComponent = [Wrapper, Scale];

export default SliderFactory;
