/**
 * @jest-environment jsdom
 */

import defaultState from 'Source/defaultState';
import { Knob, SecondKnob } from 'Components/View/subViews/Knobs/Knobs';
import { Tooltip, SecondTooltip } from './Tooltips';

const root = document.createElement('div');

describe('Tooltip:', () => {
  let tooltip: Tooltip;
  let knob: Knob;
  const slider = `<div class="slider slider_horizontal">
      <div class="slider__scale js-slider__scale slider__scale_horizontal" data-id="scale">
        <div
          class="slider__fill js-slider__fill slider__fill_horizontal slider__fill_orange"
          data-id="fill"
        ></div>
        <div
          class="slider__knob slider__knob_horizontal slider__knob_orange"
          data-id="knob"
        ></div>
      </div>
    </div>`;

  beforeEach(() => {
    root.innerHTML = slider;
    knob = new Knob(defaultState, root);
    knob.init();
    tooltip = new Tooltip({ ...defaultState, hasTooltips: true }, root);
    tooltip.init();
  });

  test('should return Tooltip instance', () => {
    expect(tooltip).toBeInstanceOf(Tooltip);
  });

  test('should return error if the knob is not found', () => {
    root.innerHTML = '';
    expect(() => tooltip.init()).toThrow('Knob element is not found');
  });

  test('should update tooltip value', () => {
    tooltip.update({ valueFrom: 10 });
    const tooltipValue: HTMLElement | null = root.querySelector(
      '[data-id="tooltip-value-first"]',
    );
    if (tooltipValue) expect(tooltipValue.innerText).toBe('10');
  });

  test('should not update tooltip value', () => {
    root.innerHTML = '';
    tooltip.update({ valueTo: 10 });
    const tooltipValue: HTMLElement | null = root.querySelector(
      '[data-id="tooltip-value-first"]',
    );
    if (tooltipValue) expect(tooltipValue).toBeNull();
  });

  test('should render vertical arrow', () => {
    root.innerHTML = slider;
    knob = new Knob({ ...defaultState, orientation: 'vertical' }, root);
    knob.init();

    expect(
      root.querySelectorAll('.slider__tooltip_arrow_vertical').length,
    ).toBe(1);
  });
});

describe('SecondTooltip:', () => {
  let secondTooltip: SecondTooltip;
  let secondKnob: SecondKnob;
  const rangeSlider = `<div class="slider slider_horizontal">
      <div class="slider__scale js-slider__scale slider__scale_horizontal" data-id="scale">
        <div
          class="slider__fill js-slider__fill slider__fill_horizontal slider__fill_orange "
          data-id="fill"
        ></div>
        <div
          class="slider__knob js-slider__knob slider__knob_horizontal slider__knob_orange"
          data-id="knob"
        ></div>
        <div 
          class="slider__knob
          slider__knob_horizontal
          slider__knob_orange"
          data-id="second-knob"
        ></div
        ></div>
      </div>
    </div>`;

  beforeEach(() => {
    root.innerHTML = rangeSlider;
    secondKnob = new SecondKnob({ ...defaultState, isRange: true }, root);
    secondKnob.init();
    secondTooltip = new SecondTooltip({ ...defaultState, hasTooltips: true, isRange: true }, root);
    secondTooltip.init();
  });

  test('should return SecondTooltip instance', () => {
    expect(secondTooltip).toBeInstanceOf(SecondTooltip);
  });

  test('should return error if the Second knob is not found', () => {
    root.innerHTML = '';
    expect(() => secondTooltip.init()).toThrow(
      'Second knob element is not found',
    );
  });

  test('should not update secondTooltip value', () => {
    root.innerHTML = '';
    secondTooltip.update({ valueTo: 10 });
    const tooltipValue = root.querySelector(
      '[data-id="tooltip-value-second"]',
    );
    expect(tooltipValue).toBeNull();
  });
});
