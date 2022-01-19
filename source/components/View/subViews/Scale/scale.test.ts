/**
 * @jest-environment jsdom
 */

import defaultState from 'Source/defaultState';
import { ScaleEvents } from 'Source/Observer/events';
import { TargetType } from 'Components/View/Slider/Slider';
import Scale from './Scale';

describe('Scale: init ', () => {
  let scale: Scale;
  let root: HTMLElement;
  let event: PointerEvent;

  beforeEach(() => {
    root = document.createElement('div');
    event = new Event('pointerdown') as PointerEvent;
  });

  test('should return Scale instance', () => {
    expect(new Scale(defaultState, root, TargetType.simple)).toBeInstanceOf(Scale);
  });

  test('handleScalePointerDown method should emit valueFrom if range slider scale ', () => {
    const newState = Object.assign({}, defaultState, {
      isRange: true,
    });
    scale = new Scale(newState, root, TargetType.simple);
    const spyEmit = jest.spyOn(scale, 'emit')
    const scaleNode = scale.getScaleNode();
    if (scaleNode) scaleNode.dispatchEvent(event);
    expect(spyEmit).toHaveBeenCalledWith(ScaleEvents.SCALE_VALUE_CHANGED, NaN);
  });
});
