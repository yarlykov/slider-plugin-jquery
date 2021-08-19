/**
 * @jest-environment jsdom
 */

import { Tooltip, SecondTooltip } from './Tooltips';

const root = document.createElement('div');

describe('Tooltip:', () => {
  let tooltip: Tooltip;
  const slider = `<div class="slider slider_horizontal">
      <div class="slider__scale slider__scale_horizontal" data-id="scale">
        <div
          class="slider__fill slider__fill_horizontal slider__fill_orange "
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

    tooltip = new Tooltip({ tooltips: true }, root);
    tooltip.display();
  });

  test('should return Tooltip instance', () => {
    expect(tooltip).toBeInstanceOf(Tooltip);
  });

  test('should return error if the knob is not found', () => {
    root.innerHTML = '';
    expect(() => tooltip.display()).toThrow('Knob element is not found');
  });

  test('should render default template', () => {
    expect(root.querySelectorAll('.slider__tooltip_horizontal').length).toBe(1);
    expect(root.querySelectorAll('.slider__tooltip_orange').length).toBe(1);
  });

  test('should update tooltip value', () => {
    tooltip.update({ valueFrom: 10 });
    const tooltipValue: HTMLElement | null = root.querySelector(
      '[data-id="tooltip-value"]',
    );
    if (tooltipValue) expect(tooltipValue.innerText).toBe('10');
  });

  test('should not update tooltip value', () => {
    root.innerHTML = '';
    tooltip.update({ valueTo: 10 });
    const tooltipValue: HTMLElement | null = root.querySelector(
      '[data-id="tooltip-value"]',
    );
    if (tooltipValue) expect(tooltipValue).toBeNull();
  });

  test('should render vertical arrow', () => {
    root.innerHTML = slider;
    tooltip = new Tooltip({ tooltips: true, orientation: 'vertical' }, root);
    tooltip.display();

    expect(
      root.querySelectorAll('.slider__tooltip_arrow_vertical').length,
    ).toBe(1);
  });
});

describe('SecondTooltip:', () => {
  let secondTooltip: SecondTooltip;
  const rangeSlider = `<div class="slider slider_horizontal">
      <div class="slider__scale slider__scale_horizontal" data-id="scale">
        <div
          class="slider__fill slider__fill_horizontal slider__fill_orange "
          data-id="fill"
        ></div>
        <div
          class="slider__knob slider__knob_horizontal slider__knob_orange"
          data-id="knob"
        ></div>
        <div 
          class="slider__knob slider__knob_horizontal slider__knob_orange" data-knob="second"></div
        ></div>
      </div>
    </div>`;

  beforeEach(() => {
    root.innerHTML = rangeSlider;

    secondTooltip = new SecondTooltip({ tooltips: true, range: true }, root);
    secondTooltip.display();
  });

  test('should return SecondTooltip instance', () => {
    expect(secondTooltip).toBeInstanceOf(SecondTooltip);
  });

  test('should return error if the Second knob is not found', () => {
    root.innerHTML = '';
    expect(() => secondTooltip.display()).toThrow(
      'Second knob element is not found',
    );
  });

  test('should render default template', () => {
    expect(root.querySelectorAll('.slider__tooltip_horizontal').length).toBe(1);
    expect(root.querySelectorAll('.slider__tooltip_orange').length).toBe(1);
  });

  test('should update secondTooltip value', () => {
    secondTooltip.update({ valueTo: 10 });
    const tooltipValue: HTMLElement | null = root.querySelector(
      '[data-id="tooltip-value-second"]',
    );
    if (tooltipValue) expect(tooltipValue.innerText).toBe('10');
  });

  test('should not update secondTooltip value', () => {
    root.innerHTML = '';
    secondTooltip.update({ valueTo: 10 });
    const tooltipValue = root.querySelector(
      '[data-id="tooltip-value-second"]',
    );
    expect(tooltipValue).toBeNull();
  });

  test('should render vertical arrow', () => {
    root.innerHTML = rangeSlider;
    secondTooltip = new SecondTooltip(
      { tooltips: true, orientation: 'vertical' },
      root,
    );
    secondTooltip.display();

    expect(
      root.querySelectorAll('.slider__tooltip_arrow_vertical').length,
    ).toBe(1);
  });
});
