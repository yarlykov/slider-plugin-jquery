import { IOptions } from './interfaces';
import Scale from './View/subViews/Scale/Scale';
import Fill from './View/subViews/Fill/Fill';
import { FirstKnob, Knob, SecondKnob } from './View/subViews/Knobs/Knobs';
import {
  FirstTooltip,
  SecondTooltip,
  Tooltip,
} from './View/subViews/Tooltips/Tooltips';
import Labels from './View/subViews/Labels/Labels';

class SimpleSlider {
  createComponents(options: IOptions, root: HTMLElement) {
    const elements = [Scale, Fill, Knob, Labels, Tooltip];
    const components: any[] = [];

    elements.forEach((Element) => {
      const element = new Element(options, root);
      components.push(element);
    });
    return components;
  }
}

class RangeSlider {
  createComponents(options: IOptions, root: HTMLElement) {
    const elements = [
      Scale,
      Fill,
      FirstKnob,
      SecondKnob,
      FirstTooltip,
      SecondTooltip,
      Labels,
    ];
    const components: any[] = [];

    elements.forEach((Element) => {
      const element = new Element(options, root);
      components.push(element);
    });
    return components;
  }
}

class SliderFactory {
  static list = {
    simple: SimpleSlider,
    range: RangeSlider,
  };

  create(type = 'simple') {
    const Slider = SliderFactory.list[type] || SliderFactory.list.simple;
    const slider = new Slider();
    return slider;
  }
}

export default SliderFactory;
