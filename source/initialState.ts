import { IOptions } from './components/interfaces';

const defaultState: IOptions = {
  min: 0,
  max: 100,
  step: 25,
  current: 42,
  rangeMin: 21,
  rangeMax: 42,
  orientation: 'horizontal',
  range: false,
  fill: true,
  labels: true,
  tooltips: true,
  color: 'orange',
};

export default defaultState;
