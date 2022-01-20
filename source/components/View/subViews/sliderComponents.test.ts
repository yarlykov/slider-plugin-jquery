/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import defaultState from 'Source/defaultState';
import { TargetType } from 'Components/View/Slider/Slider';
import SliderComponent from './SliderComponent';

class MockClass extends SliderComponent {
  public getPosition(
    event: PointerEvent
  ): number {
    return super.getPosition(event)
  }
}

describe('SliderComponent:', () => {
  let elem: HTMLDivElement;
  let mockClass: MockClass;
  let event: PointerEvent;
  let scale: HTMLDivElement;

  beforeEach(() => {
    elem = document.createElement('div');
    scale = document.createElement('div');
    scale.classList.add(
      'js-slider__scale',
    );
    elem.append(scale);
    mockClass = new MockClass(defaultState, elem, TargetType.simple)
    event = new Event('pointerdown', {
      bubbles: true,
      cancelable: true,
    }) as PointerEvent;
  });

  test('if do not transfer state to the update method should be return error', () => {
    // @ts-ignore: Unreachable code error
    expect(() => mockClass.update()).toThrow('The state for updating is not transferred');
  });

  test('getPosition method should be defined', () => {

    expect(mockClass.getPosition(event)).toBeDefined();
  });

  test('getPosition should return 50 if scaleNode is not defined', () => {
    elem.innerHTML = '';
    expect(mockClass.getPosition(event)).toBe(50);
  });

  test('getPosition should return NaN', () => {
    expect(mockClass.getPosition(event)).toBeNaN();
  });

  test('getPosition should return NaN when slider vertical', () => {
    mockClass = new MockClass({ ...defaultState, orientation: 'vertical'}, elem, TargetType.simple)
    expect(mockClass.getPosition(event)).toBeNaN();
  });
});
