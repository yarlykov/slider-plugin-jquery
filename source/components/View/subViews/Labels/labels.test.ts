/**
 * @jest-environment jsdom
 */

import defaultState from '../../../../initialState';
import Labels from './Labels';

const root: HTMLElement = document.createElement('div');

describe('Labels:', () => {
  let labels: Labels;
  const slider = `
    <div class="slider slider_horizontal">
      <div class="slider__scale slider__scale_horizontal" data-id="scale"></div>
    </div>`;

  beforeEach(() => {
    root.innerHTML = slider;
    labels = new Labels({ labels: true }, root);
    labels.display();
  });

  test('should return Labels instance', () => {
    expect(labels).toBeInstanceOf(Labels);
  });

  test('should return error if Scale is not found', () => {
    root.innerHTML = '';
    expect(() => labels.display()).toThrow('Scale element is not found');
  });

  test('should render default template', () => {
    expect(root.querySelectorAll('[data-id="labels"]').length).toBe(1);
    expect(root.querySelectorAll('.slider__labels_horizontal').length).toBe(1);
  });

  test('should be 6 label items', () => {
    root.innerHTML = slider;
    labels = new Labels(defaultState, root);
    labels.display();
    const labelsNode = root.querySelectorAll('.slider__labels-item');
    expect(labelsNode.length).toBe(6);
  });
});
