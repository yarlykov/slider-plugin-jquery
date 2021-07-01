import Knob from './Knobs/Knob';
import SliderComponent from './SliderComponent';

describe('SliderComponent', () => {
  test('should return error when trying to create an instance of a class', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => new SliderComponent()).toThrow(
      'Can`t instantiate SliderComponent, only concrete one',
    );
  });

  test('should initialize an empty state', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const knob = new Knob();
    expect(knob.state).toEqual({});
  });
});
