import { SLIDER_POSITION_CHANGE } from './types';

export function changeSlider(data) {
  return {
    type: SLIDER_POSITION_CHANGE,
    data,
  };
}
