/**
 * @jest-environment jsdom
 */

import View from './View';

describe('View:', () => {
  let view: View;

  beforeEach(() => {
    const root = document.createElement('div');
    view = new View(root);
  });

  test('should return class instance', () => {
    expect(view).toBeInstanceOf(View);
  });

  test('init should return an error if no options are passed', () => {
    expect(view.init).toThrowError('options were not passed');
  });
});
