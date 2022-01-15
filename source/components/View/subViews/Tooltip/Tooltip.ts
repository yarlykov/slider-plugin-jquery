import { checkColor, checkOrientation } from 'Root/source/utils/utils';
import { Color, IOptions, Orientation } from 'Components/interfaces';
import { TargetType } from 'Components/View/Slider/Slider';
import SliderComponent from 'Components/View/subViews/SliderComponent';
import './tooltip.scss';

class Tooltip extends SliderComponent {
  private tooltip!: HTMLDivElement;
  private tooltipValue!: HTMLSpanElement;

  constructor(options: IOptions, root: HTMLElement, target: TargetType, id?: string) {
    super(options, root, target, id);
    this.init();
  }

  public getTooltipNode(): HTMLDivElement {
    return this.tooltip;
  }

  public update(state: IOptions): void {
    const targetValue = this.target === TargetType.simple 
    ? 'valueFrom'
    : 'valueTo'
    
    this.tooltipValue.innerText = String(state[targetValue]);
  }

  private init(): void {
    const { orientation, color } = this.state;
    const orientationMod = checkOrientation(orientation) ? orientation : 'horizontal';
    const colorMod = checkColor(color) ? color : 'orange';

    this.tooltip = this.createTooltip(colorMod, orientationMod);
  }

  private createTooltip(color: Color, orientation: Orientation ): HTMLDivElement {
    const tooltipId = this.id ? this.id : 'tooltip-first';
    const tooltip = document.createElement('div');
    tooltip.classList.add(
      'slider__tooltip',
      `slider__tooltip_${orientation}`,
      `slider__tooltip_${color}`,
      )
      tooltip.setAttribute('data-id', `${tooltipId}`);
      
    const tooltipValueId = this.id === 'tooltip-second' 
        ? 'tooltip-value-second'
        : 'tooltip-value-first'
    this.tooltipValue = document.createElement('span');
    this.tooltipValue.classList.add('tooltip__value');
    this.tooltipValue.setAttribute('data-id', `${tooltipValueId}`);

    const verticalTooltipClass =  orientation === 'vertical'
      ? 'slider__tooltip_arrow_vertical'
      : '';
    const tooltipArrow = document.createElement('div');
    tooltipArrow.className = `slider__tooltip_arrow ${verticalTooltipClass}`
  
    tooltip.insertAdjacentElement('afterbegin', this.tooltipValue);
    tooltip.insertAdjacentElement('beforeend', tooltipArrow);

    return tooltip;
  }
}

export default Tooltip;
