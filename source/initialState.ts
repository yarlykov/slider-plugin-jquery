import { IOptions } from './components/interfaces';

const defaultState: IOptions = {
  min: 0,
  max: 100,
  step: 25,
  currentValue: 42,
  rangeMin: 21,
  rangeMax: 42,
  orientation: 'horizontal',
  range: false,
  fill: true,
  units: '¥',
  color: 'orange',
};

export default defaultState;
