/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import defaultState from 'Source/defaultState';
import { Orientation, PageCoords, ScaleCoords } from 'Components/interfaces';
import { TargetType } from 'Components/View/Slider/Slider';
import SliderComponent from './SliderComponent';

class MockClass extends SliderComponent {
  public getCoords(elem: HTMLElement): ScaleCoords {
    elem = document.createElement('div');
    return super.getCoords(elem);
  }

  public getPageCoords(event: PointerEvent): PageCoords {
    return super.getPageCoords(event);
  }

  public getPosition(
    orientation: Orientation,
    scaleCoords: ScaleCoords | null,
    pageCoords: PageCoords
  ): number {
    return super.getPosition(orientation, scaleCoords, pageCoords)
  }
}

describe('SliderComponent:', () => {
  let elem: HTMLDivElement;
  let mockClass: MockClass;

  const scaleCoords = {
    bottom: 355,
    height: 296,
    left: 325,
    width: 296,
  };
  const pageCoords = {
    pageX: 399,
    pageY: 281,
  };

  beforeEach(() => {
    elem = document.createElement('div');
    mockClass = new MockClass(defaultState, elem, TargetType.simple)
  });

  test('if do not transfer state to the update method should be return error', () => {
    // @ts-ignore: Unreachable code error
    expect(() => mockClass.update()).toThrow('The state for updating is not transferred');
  });


  test('getCoords method should be return element coords', () => {
    expect(mockClass.getCoords(elem)).toEqual({
      bottom: 0,
      height: 0,
      left: 0,
      width: 0,
    });
  });

  test('getPageCoords method should be defined', () => {
    const event = new Event('pointerdown', {
      bubbles: true,
      cancelable: true,
    }) as PointerEvent;
    expect(mockClass.getPageCoords(event)).toBeDefined();
  });

  test('getPosition method should be defined', () => {
    const scaleCoords = { left: 1, bottom: 1, width: 1, height: 1 };
    const pageCoords = { pageX: 1, pageY: 1 };
    expect(
      mockClass.getPosition('horizontal', scaleCoords, pageCoords),
    ).toBeDefined();
  });

  test('getPosition method should return horizontal position', () => {
    expect(
      mockClass.getPosition('horizontal', scaleCoords, pageCoords),
    ).toEqual(25);
  });

  test('getPosition method should return vertical position', () => {
    expect(
      mockClass.getPosition('vertical', scaleCoords, pageCoords),
    ).toEqual(25);
  });

  test('if scaleCoords equal null should return 50', () => {
    expect(
      mockClass.getPosition('vertical', null, pageCoords),
    ).toEqual(50);
  });
});
