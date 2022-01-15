/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import defaultState from 'Source/defaultState';
import { Slider, SliderType, TargetType } from 'Components/View/Slider/Slider';
import Tooltip from './Tooltip';

const root = document.createElement('div');

describe('Tooltip:', () => {
  let tooltip: Tooltip;
  let slider: Slider;
  let components: SliderType;

  beforeEach(() => {
    slider = new Slider(defaultState, root, TargetType.simple);
    components = slider.getComponents();
    tooltip = components.tooltip;
  });

  test('should return Tooltip instance', () => {
    expect(tooltip).toBeInstanceOf(Tooltip);
  });

  test('should render correct color', () => {
    // @ts-ignore: Unreachable code error
    slider = new Slider({ ...defaultState, color: ''}, root, TargetType.simple)
    components = slider.getComponents();
    const tooltip = components.tooltip.getTooltipNode();
    
    expect(tooltip.parentElement?.querySelectorAll('.slider__tooltip_orange').length).toBe(1);
  });

  test('should update tooltip value', () => {
    tooltip.update({ ...defaultState, valueFrom: 10 });
    const tooltipValue: HTMLElement | null = root.querySelector(
      '[data-id="tooltip-value-first"]',
    );
    if (tooltipValue) expect(tooltipValue.innerText).toBe('10');
  });

  test('should not update tooltip value', () => {
    root.innerHTML = '';
    tooltip.update({ ...defaultState, valueTo: 10 });
    const tooltipValue: HTMLElement | null = root.querySelector(
      '[data-id="tooltip-value-first"]',
    );
    if (tooltipValue) expect(tooltipValue).toBeNull();
  });

  test('should render vertical arrow', () => {
    slider = new Slider({ ...defaultState, orientation: 'vertical' }, root, TargetType.simple)

    expect(
      root.querySelectorAll('.slider__tooltip_arrow_vertical').length,
    ).toBe(1);
  });
});

describe('SecondTooltip:', () => {
  let secondTooltip: Tooltip;
  let slider: Slider;
  let components: SliderType;

  beforeEach(() => {
    slider = new Slider(defaultState, root, TargetType.range)
    components = slider.getComponents();
    if ('secondTooltip' in components) {
      secondTooltip = components.secondTooltip;
    }
  });

  test('should return SecondTooltip instance', () => {
    expect(secondTooltip).toBeInstanceOf(Tooltip);
  });
});
