/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import defaultState from 'Source/defaultState';
import { Slider, SliderType, TargetType } from 'Components/View/Slider/Slider';
import Labels from './Labels';
import { LabelsEvents } from 'Root/source/Observer/events';

const root: HTMLElement = document.createElement('div');

describe('Labels:', () => {
  let components: SliderType;
  let slider: Slider;
  let labels: Labels;
  let labelsNode: HTMLDivElement;
  let event: PointerEvent;
  
  beforeEach(() => {
    slider = new Slider(defaultState, root, TargetType.simple);
    components = slider.getComponents();
    event = new Event('pointerdown') as PointerEvent;
  });
  
  test('should return Labels instance', () => {
    expect(components.labels).toBeInstanceOf(Labels);
  });

  test('should render correct orientation', () => {
    // @ts-ignore: Unreachable code error
    slider = new Slider({ ...defaultState, orientation: ''}, root, TargetType.simple)
    components = slider.getComponents();
    labels = components.labels;
    labelsNode = labels.getLabelsNode();
    
    expect(labelsNode.parentElement?.querySelectorAll('.slider__labels_horizontal').length).toBe(1);
  });

  test('should be correct markup', () => {
    expect(root.querySelectorAll('.slider__labels').length).toBe(1);
    expect(root.querySelectorAll('[data-id="labels"]').length).toBe(1);
  });

  test('should be 6 label items', () => {
    const labelsNode = root.querySelectorAll('.slider__labels-item');
    expect(labelsNode.length).toBe(6);
  });

  test(
    'when you click on the scale, an event should be triggered LabelsEvents.LABELS_VALUE_FROM_CHANGED',
  () => {
    // @ts-ignore: Unreachable code error
    const spyEmit = jest.spyOn(labels, 'emit')
    labels.update(defaultState);
    labelsNode.dispatchEvent(event);

    expect(spyEmit).toHaveBeenCalledWith(LabelsEvents.LABELS_VALUE_FROM_CHANGED, NaN);
  });
});
