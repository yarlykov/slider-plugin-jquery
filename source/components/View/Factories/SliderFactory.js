import Fill from '../subViews/Fill';
import Scale from '../subViews/Scale';
import Wrapper from '../subViews/Wrapper';

class SliderFactory {
  create(options, root) {
    const { elements } = options;

    SliderFactory.baseComponent.forEach((Component) => {
      const component = new Component();
      component.create(options, root);
    });

    if (typeof elements.fill === 'boolean' && elements.fill) {
      const fill = new Fill();
      fill.create(options);
    }
  }
}

SliderFactory.baseComponent = [
  Wrapper,
  Scale,
];

export default SliderFactory;
