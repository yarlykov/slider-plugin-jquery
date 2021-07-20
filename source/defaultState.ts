import { IOptions } from './components/interfaces';

const defaultState: IOptions = {
  min: 0,
  max: 100,
  step: 25,
  valueFrom: 50,
  valueTo: 75,
  orientation: 'horizontal',
  range: false,
  fill: true,
  labels: true,
  tooltips: true,
  color: 'orange',
};

export default defaultState;
