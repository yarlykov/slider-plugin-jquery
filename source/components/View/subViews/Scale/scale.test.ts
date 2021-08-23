/**
 * @jest-environment jsdom
 */

import Scale from './Scale';
import View from '../../View';
import defaultState from '../../../../defaultState';

describe('Scale: display ', () => {
  let scale: Scale;
  let root: HTMLElement;
  let view: View;
  let event: PointerEvent;

  beforeEach(() => {
    root = document.createElement('div');
    view = new View(root);
    view.init(defaultState);
    event = new Event('pointerdown') as PointerEvent;
  });

  test('should return Scale instance', () => {
    expect(new Scale({}, root)).toBeInstanceOf(Scale);
  });

  test('the target must be correctly determined ("scale" or "fill")', () => {
    const scale = root.querySelector('[data-id="scale"]');
    const fill = root.querySelector('[data-id="fill"]');

    if (scale) scale.dispatchEvent(event);
    if (fill) fill.dispatchEvent(event);
  });

  test('onPointerDown method should emit valueFrom if range slider scale ', () => {
    const newState = Object.assign({}, defaultState, {
      range: true,
    });
    scale = new Scale(newState, root);
    const spyEmit = jest.spyOn(scale, 'emit')
    scale.display();
    if (scale.scaleNode) scale.scaleNode.dispatchEvent(event);
    expect(spyEmit).toHaveBeenCalledWith('scale:valueFrom', 'NaN');
  });
});
