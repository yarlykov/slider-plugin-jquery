/* eslint max-classes-per-file: "off" */
import { changeFirstLetterToLower, checkOrientation } from 'Source/utils/utils';
import { IOptions, Orientation, RangeSliderType, SimpleSliderType } from 'Components/interfaces';
import Scale from 'Components/View/subViews/Scale/Scale';
import Fill from 'Components/View/subViews/Fill/Fill';
import Labels from 'Components/View/subViews/Labels/Labels';
import Tooltip from 'Components/View/subViews/Tooltip/Tooltip';
import Knob from 'Components/View/subViews/Knob/Knob';

type SliderType = SimpleSliderType | RangeSliderType;

enum TargetType {
  'simple',
  'range'
}

class Slider {
  private options: IOptions;
  private root: HTMLElement;
  private type: TargetType;
  private components!: SliderType;
  private scale!: HTMLElement; 

  constructor(options: IOptions, root: HTMLElement, type: TargetType) {
    this.options = options;
    this.root = root;
    this.type = type;

    this.init();
  }

  public getComponents(): SliderType {
    return this.components;
  }

  private init() {
    const { orientation } = this.options;
    const orientationModifier = checkOrientation(orientation) ? orientation : 'horizontal';
    const slider = this.createSlider(orientationModifier);
    this.components = this.createComponents();
    this.scale = this.components.scale.getScaleNode();
    
    slider.insertAdjacentElement('afterbegin', this.scale)
    this.root.innerHTML = '';
    this.root.insertAdjacentElement('afterbegin', slider);
  
    this.addScaleElements();
  }

  private addScaleElements() {
    const { isRange } = this.options;
    const knob = this.components.knob.getKnobNode();
    const hasSecondKnob = Object.prototype.hasOwnProperty.call(this.components, 'secondKnob')
    const secondKnob = hasSecondKnob ? this.components['secondKnob'].getKnobNode() : null;
    
    this.scale.insertAdjacentElement(
      'afterbegin',
      knob
    );    

      if (isRange && secondKnob) {
        this.scale.insertAdjacentElement(
          'beforeend',
          secondKnob
        );
      }
  }


  private createComponents(): SimpleSliderType {
    const elements = [Scale, Fill, Knob, Labels, Tooltip];
    const components = {};

    elements.forEach((Element) => {
      const element = new Element(this.options, this.root, TargetType.simple);
      const elementName = changeFirstLetterToLower(element.constructor.name);
      components[elementName] = element;
    });
    if (this.type === TargetType.range) {
      Object.defineProperties(components, {
        secondKnob: {
          value: new Knob(this.options, this.root, TargetType.range, 'second-knob'),
          enumerable: true,
        },
        secondTooltip: {
          value: new Tooltip(this.options, this.root, TargetType.range),
          enumerable: true,
        }
      })
    }

    return <SliderType>components;
  }

  private createSlider(orientation: Orientation): HTMLElement {
    const slider = document.createElement('div');
    slider.classList.add('slider', `slider_${orientation}`)

    return slider;
  } 
}

export { Slider, SliderType, TargetType };
