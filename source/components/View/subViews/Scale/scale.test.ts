/**
 * @jest-environment jsdom
 */

import defaultState from '../../../../defaultState';
import View from '../../View';
import Scale from './Scale';

describe('Scale: display ', () => {
  let scale: Scale;
  let root: HTMLElement;
  let view: View;
  let event: MouseEvent;

  beforeEach(() => {
    root = document.createElement('div');
    view = new View(root);
    view.init(defaultState);
    event = document.createEvent('MouseEvent');
    event.initEvent('mousedown', true, true);
  });

  test('should return Scale instance', () => {
    expect(new Scale({}, root)).toBeInstanceOf(Scale);
  });

  test('the target must be correctly determined ("scale" or "fill")', () => {
    const scale = root.querySelector('[data-id="scale"]') as HTMLElement;
    const fill = root.querySelector('[data-id="fill"]') as HTMLElement;

    scale.dispatchEvent(event);
    fill.dispatchEvent(event);
  });

  test('onMouseDown method should emit valueFrom if range slider scale ', () => {
    const newState = Object.assign({}, defaultState, {
      range: true,
    });
    scale = new Scale(newState, root);
    scale.display();
    scale.scaleNode.dispatchEvent(event);
  });
});
