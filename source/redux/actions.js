import { SLIDER_POSITION_CHANGE, INITIAL_STATE} from './types';

export function changeSlider(data) {
  return {
    type: SLIDER_POSITION_CHANGE,
    data,
  };
}

export function initialSlider(data) {
  return {
    type: INITIAL_STATE,
    data,
  };
}
