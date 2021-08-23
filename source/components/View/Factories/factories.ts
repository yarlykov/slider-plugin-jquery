/* eslint max-classes-per-file: "off" */

import Scale from '../subViews/Scale/Scale';
import Fill from '../subViews/Fill/Fill';
import Knob from '../subViews/Knobs/Knob';
import SecondKnob from '../subViews/Knobs/SecondKnob';
import { Tooltip, SecondTooltip } from '../subViews/Tooltips/Tooltips';
import Labels from '../subViews/Labels/Labels';
import { IOptions, Components } from '../../interfaces';

class SimpleSlider {
  public createComponents(options: IOptions, root: HTMLElement): Components {
    const elements = [Scale, Fill, Knob, Labels, Tooltip];
    const components: Components = [];

    elements.forEach((Element) => {
      const element = new Element(options, root);
      components.push(element);
    });
    return components;
  }
}

class RangeSlider {
  public createComponents(options: IOptions, root: HTMLElement): Components {
    const elements = [
      Scale,
      Fill,
      Knob,
      SecondKnob,
      Tooltip,
      SecondTooltip,
      Labels,
    ];
    const components: Components = [];

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

  public create(type: string): SimpleSlider | RangeSlider {
    const sliderType = type === 'range' ? 'range' : 'simple';
    const Slider = SliderFactory.list[sliderType];
    const slider = new Slider();
    return slider;
  }
}

export { SliderFactory, SimpleSlider, RangeSlider };
