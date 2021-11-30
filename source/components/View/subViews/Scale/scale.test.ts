/**
 * @jest-environment jsdom
 */

import defaultState from '../../../../defaultState';
import { ScaleEvents } from '../../../../Observer/events';
import View from '../../View';
import Scale from './Scale';

describe('Scale: init ', () => {
  let scale: Scale;
  let root: HTMLElement;
  let view: View;
  let event: PointerEvent;

  beforeEach(() => {
    root = document.createElement('div');
    view = new View(root, defaultState);
    event = new Event('pointerdown') as PointerEvent;
  });

  test('should return Scale instance', () => {
    expect(new Scale({}, root)).toBeInstanceOf(Scale);
  });

  test('the target must be correctly determined ("scale" or "fill")', () => {
    const scale = root.querySelector('.js-slider__scale');
    const fill = root.querySelector('.js-slider__fill');

    if (scale) scale.dispatchEvent(event);
    if (fill) fill.dispatchEvent(event);
  });

  test('handleScalePointerDown method should emit valueFrom if range slider scale ', () => {
    const newState = Object.assign({}, defaultState, {
      range: true,
    });
    scale = new Scale(newState, root);
    const spyEmit = jest.spyOn(scale, 'emit')
    scale.init();
    if (scale.scaleNode) scale.scaleNode.dispatchEvent(event);
    expect(spyEmit).toHaveBeenCalledWith(ScaleEvents.VALUE_FROM_CHANGED, 'NaN');
  });
});
