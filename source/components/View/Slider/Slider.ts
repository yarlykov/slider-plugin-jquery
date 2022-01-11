/* eslint max-classes-per-file: "off" */
import { changeFirstLetterToLower } from 'Source/utils/utils';
import { IOptions, RangeSliderType, SimpleSliderType } from 'Components/interfaces';
import Scale from 'Components/View/subViews/Scale/Scale';
import Fill from 'Components/View/subViews/Fill/Fill';
import Labels from 'Components/View/subViews/Labels/Labels';
import { Tooltip, SecondTooltip } from 'Components/View/subViews/Tooltips/Tooltips';
import Knob from 'Root/source/components/View/subViews/Knob/Knob';

type SliderType = SimpleSliderType | RangeSliderType;

enum TargetType {
  'simple',
  'range'
}

class Slider {
  public createComponents(options: IOptions, root: HTMLElement, type: TargetType): SimpleSliderType {
    const elements = [Scale, Fill, Knob, Labels, Tooltip];
    const components = {};

    elements.forEach((Element) => {
      const element = new Element(options, root, TargetType.simple);
      const elementName = changeFirstLetterToLower(element.constructor.name);
      components[elementName] = element;
    });
    if (type === TargetType.range) {
      components['secondKnob'] = new Knob(options, root, TargetType.range);
      components['secondTooltip'] = new SecondTooltip(options, root, TargetType.range);
    }

    return <SliderType>components;
  }
}

export { Slider, TargetType };
