import { changeFirstLetterToLower, checkOrientation, fromValueToPercent } from 'Source/utils/utils';
import { IOptions, Orientation, RangeSliderType, SimpleSliderType } from 'Components/interfaces';
import Scale from 'Components/View/subViews/Scale/Scale';
import Fill from 'Components/View/subViews/Fill/Fill';
import Labels from 'Components/View/subViews/Labels/Labels';
import Tooltip from 'Components/View/subViews/Tooltip/Tooltip';
import Knob from 'Components/View/subViews/Knob/Knob';
import './slider.scss';

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
    const { isRange, hasFill, hasTooltips, hasLabels } = this.options;
  
    const hasSecondKnob = Object.prototype.hasOwnProperty.call(
      this.components,
      'secondKnob'
    );
    const hasSecondTooltip = Object.prototype.hasOwnProperty.call(
      this.components,
      'secondTooltip'
    ) && hasTooltips;
  
    const knob = this.components.knob.getKnobNode();
    const fill = this.components.fill.getFillNode();
    const tooltip = this.components.tooltip.getTooltipNode();
    const labels = this.components.labels.getLabelsNode();
  
    const secondKnob = hasSecondKnob
      ? this.components['secondKnob'].getKnobNode()
      : null;
    const secondTooltip = hasSecondTooltip 
      ? this.components['secondTooltip'].getTooltipNode()
      : null;
    
    this.scale.insertAdjacentElement('beforeend', knob);

    if (hasFill) this.scale.insertAdjacentElement('afterbegin', fill);
    if (hasTooltips) knob.insertAdjacentElement('afterbegin', tooltip);
    if (isRange && secondKnob) {
      const secondKnobElemNodePosition = this.isKnobsPositionMoreThenHalf()
        ? 'afterbegin'
        : 'beforeend';
      this.scale.insertAdjacentElement(secondKnobElemNodePosition, secondKnob);
    }
    if (isRange && hasSecondTooltip) secondKnob.insertAdjacentElement('afterbegin', secondTooltip);
    if (hasLabels) this.scale.insertAdjacentElement('beforeend', labels);
  }

  private isKnobsPositionMoreThenHalf(): boolean {
    const {
      valueFrom,
      valueTo,
    } = this.options;

    const FIFTY_PERCENT = 50;
    const valueFromPercent = fromValueToPercent(this.options, valueFrom)
    const valueToPercent = fromValueToPercent(this.options, valueTo)    

    return  valueFromPercent > FIFTY_PERCENT && valueToPercent > FIFTY_PERCENT;
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
          value: new Tooltip(this.options, this.root, TargetType.range, 'tooltip-second'),
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
