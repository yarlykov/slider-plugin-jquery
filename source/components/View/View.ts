import Observer from 'Source/Observer/Observer';
import { KnobEvents, LabelsEvents, ScaleEvents, ViewEvents } from 'Source/Observer/events';
import { IOptions, TooltipCoords } from 'Components/interfaces';
import Knob from './subViews/Knob/Knob';
import { Slider, SliderType, TargetType } from './Slider/Slider';

type ViewEvent = 
  | { type: ViewEvents.VALUE_FROM_CHANGED, data: number | string }
  | { type: ViewEvents.VALUE_TO_CHANGED, data: number | string }

class View extends Observer<ViewEvent> {
  private root: HTMLElement;

  private options: IOptions;

  private type!: TargetType;

  private sliderComponents!: SliderType;

  constructor(root: HTMLElement, options: IOptions) {
    super();
    this.options = options;
    this.root = root;
    this.init(options)
  }

  public init(options: IOptions): void {
    this.type = options.isRange ? TargetType.range : TargetType.simple;

    const slider = new Slider(options, this.root, this.type);
    this.sliderComponents = slider.getComponents();
    
    this.bindEvents();
    this.update(options);
    this.checkKnobZIndex();
  }

  public update(state: IOptions): void {
    const componentInstances = Object.values(this.sliderComponents)
    componentInstances.forEach((component) => {
      if (component) component.update(state);
    });
    if (this.options.hasTooltips) this.createDoubleTooltip(state);
  }

  private bindEvents(): void {
    this.bindScaleEvents();
    this.bindKnobsEvents();
    this.bindLabelsEvents();
  }

  /* istanbul ignore next */
  private bindScaleEvents(): void {
    this.sliderComponents.scale.subscribe(ScaleEvents.SCALE_VALUE_FROM_CHANGED, (valueFrom) =>
      this.emit(ViewEvents.VALUE_FROM_CHANGED, valueFrom),
    );

    this.sliderComponents.scale.subscribe(ScaleEvents.SCALE_VALUE_TO_CHANGED, (valueTo) =>
      this.emit(ViewEvents.VALUE_TO_CHANGED, valueTo),
    );
  }
  /* istanbul ignore next */
  private bindKnobsEvents(): void {
    const { knob } = this.sliderComponents;

    knob.subscribe(KnobEvents.KNOB_VALUE_FROM_CHANGED, (valueFrom) =>
      this.emit(ViewEvents.VALUE_FROM_CHANGED, valueFrom),
    );

    if (this.type === TargetType.range && this.sliderComponents['secondKnob']) {
      if ('secondKnob' in this.sliderComponents) {
        const { secondKnob } = this.sliderComponents

        secondKnob.subscribe(KnobEvents.KNOB_VALUE_TO_CHANGED, (valueTo) => 
          this.emit(ViewEvents.VALUE_TO_CHANGED, valueTo),
        );
      }
    }
  }
  /* istanbul ignore next */
  private bindLabelsEvents(): void {
    this.sliderComponents.labels.subscribe(LabelsEvents.LABELS_VALUE_FROM_CHANGED, (valueFrom) =>
      this.emit(ViewEvents.VALUE_FROM_CHANGED, valueFrom),
    );

    this.sliderComponents.labels.subscribe(LabelsEvents.LABELS_VALUE_TO_CHANGED, (valueTo) =>
      this.emit(ViewEvents.VALUE_TO_CHANGED, valueTo),
    );
  }
  
  private checkKnobZIndex() {
    const { knob } = this.sliderComponents;
    let secondKnob: Knob;
    let secondKnobNode: HTMLDivElement;
    
    if ('secondKnob' in this.sliderComponents) {
      secondKnob = this.sliderComponents.secondKnob;
      secondKnobNode = secondKnob.getKnobNode();

      knob.subscribe(KnobEvents.KNOB_VALUE_FROM_CHANGED, () => {
        knob.getKnobNode().style.zIndex = '1';
        secondKnobNode.style.zIndex = '0';
      });

      secondKnob.subscribe(KnobEvents.KNOB_VALUE_TO_CHANGED, () => {
        knob.getKnobNode().style.zIndex = '0';
        secondKnob.getKnobNode().style.zIndex = '1';
      })
    }
  }

  private getTooltipsCoords(): TooltipCoords | null {
    const { hasTooltips } = this.options;
    const { tooltip } = this.sliderComponents;
    let secondTooltip;

    if (hasTooltips && 'secondTooltip' in this.sliderComponents) {
      secondTooltip = this.sliderComponents.secondTooltip;

      return {
        firstRight: tooltip.getTooltipNode().getBoundingClientRect().right,
        firstTop: tooltip.getTooltipNode().getBoundingClientRect().top,
        secondLeft: secondTooltip.getTooltipNode().getBoundingClientRect().left,
        secondBottom: secondTooltip.getTooltipNode().getBoundingClientRect().bottom,
      }
    }
    return null;
  }

  private createDoubleTooltip(state: IOptions): void {
    const { hasTooltips, isRange, orientation, valueFrom, valueTo } = state;
    let secondTooltipNode;
    let secondTooltipValueNode;
  
    const coords = this.getTooltipsCoords();
    if (!coords) return;
    
    const { firstRight, firstTop, secondLeft, secondBottom } = coords;
    
    if (isRange && 'secondKnob' in this.sliderComponents) {
      secondTooltipNode = this.sliderComponents.secondTooltip.getTooltipNode();
      secondTooltipValueNode = secondTooltipNode.children.item(0);
    }
  
    const hasTwoTooltips = hasTooltips && secondTooltipNode;
    const hasTwoHorizontalNearby = orientation === 'horizontal' 
      && firstRight >= secondLeft
    const hasTwoVerticalNearby = orientation === 'vertical' 
      && secondBottom >= firstTop
    const hasTooltipsNearby = hasTwoHorizontalNearby  || hasTwoVerticalNearby;

    if (hasTwoTooltips) {
      const tooltipNode = this.sliderComponents.tooltip.getTooltipNode();
  
      if (hasTooltipsNearby && secondTooltipNode) {
        tooltipNode.style.visibility = 'hidden'
        secondTooltipNode.classList.add('slider__tooltip_double')
        
        if (secondTooltipValueNode) {
          secondTooltipValueNode.textContent= `${valueFrom} \u2013 ${valueTo}`
        }
      } else if (secondTooltipNode && secondTooltipValueNode) {
        tooltipNode.style.visibility = 'visible'
        secondTooltipNode.classList.remove('slider__tooltip_double');

        secondTooltipValueNode.textContent = `${state.valueTo}`
      }
    } else if (secondTooltipNode && secondTooltipValueNode) {
      secondTooltipValueNode.textContent = `${state.valueTo}`
    }
  }
}

export default View;
