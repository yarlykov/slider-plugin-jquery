/* eslint max-classes-per-file: "off" */
import { changeFirstLetterToLower } from 'Source/utils/utils';
import { IOptions, RangeSliderType, SimpleSliderType } from 'Components/interfaces';
import Scale from 'Components/View/subViews/Scale/Scale';
import Fill from 'Components/View/subViews/Fill/Fill';
import Labels from 'Components/View/subViews/Labels/Labels';
import { Tooltip, SecondTooltip } from 'Components/View/subViews/Tooltips/Tooltips';
import { Knob, SecondKnob } from 'Components/View/subViews/Knobs/Knobs';

class SimpleSlider {
  public createComponents(options: Partial<IOptions>, root: HTMLElement): SimpleSliderType {
    const elements = [Scale, Fill, Knob, Labels, Tooltip];
    const components = {};

    elements.forEach((Element) => {
      const element = new Element(options, root);
      if (element) {
        const elementName = changeFirstLetterToLower(element.constructor.name);
        components[elementName] = element;
      }
    });
    return <SimpleSliderType>components;
  }
}

class RangeSlider {
  public createComponents(options: Partial<IOptions>, root: HTMLElement): RangeSliderType {
    const elements = [
      Scale,
      Fill,
      Knob,
      SecondKnob,
      Tooltip,
      SecondTooltip,
      Labels,
    ];
    const components = {};

    elements.forEach((Element) => {
      const element = new Element(options, root);
      if (element) {
        const elementName = changeFirstLetterToLower(element.constructor.name);
        components[elementName] = element;
      }
    });
    return <RangeSliderType>components;
  }
}

class SliderFactory {
  static list = {
    simple: SimpleSlider,
    range: RangeSlider,
  };

  public static create(type: string): SimpleSlider | RangeSlider {
    const sliderType = type === 'range' ? 'range' : 'simple';
    const Slider = SliderFactory.list[sliderType];
    const slider = new Slider();
    return slider;
  }
}

export { SliderFactory, SimpleSlider, RangeSlider };
