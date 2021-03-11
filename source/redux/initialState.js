import { storage } from '../core/utils';

const defaultState = {
  sliderPositionState: {
    value: 42,
  },
};

const initialState = storage('slider-state') ? storage('slider-state') : defaultState;
export default initialState;
