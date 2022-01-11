/* eslint max-classes-per-file: "off" */
import { changeFirstLetterToLower } from 'Source/utils/utils';
import { IOptions, RangeSliderType, SimpleSliderType } from 'Components/interfaces';
import Scale from 'Components/View/subViews/Scale/Scale';
import Fill from 'Components/View/subViews/Fill/Fill';
import Labels from 'Components/View/subViews/Labels/Labels';
import { Tooltip, SecondTooltip } from 'Components/View/subViews/Tooltips/Tooltips';
import { Knob, SecondKnob } from 'Components/View/subViews/Knobs/Knobs';

type SliderType = SimpleSliderType | RangeSliderType;

class Slider {
  public createComponents(options: IOptions, root: HTMLElement, type: string): SimpleSliderType {
    const elements = [Scale, Fill, Knob, Labels, Tooltip];
    const components = {};

    elements.forEach((Element) => {
      const element = new Element(options, root);
      const elementName = changeFirstLetterToLower(element.constructor.name);
      components[elementName] = element;
    });
    if (type === 'range') {
      components['secondKnob'] = new SecondKnob(options, root);
      components['secondTooltip'] = new SecondTooltip(options, root);
    }
    return <SliderType>components;
  }
}

export default Slider;
