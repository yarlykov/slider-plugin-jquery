import { IOptions } from './components/interfaces';

const defaultState: IOptions = {
  min: 0,
  max: 100,
  step: 1,
  valueFrom: 0,
  valueTo: 0,
  orientation: 'horizontal',
  isRange: false,
  hasFill: true,
  hasLabels: true,
  hasTooltips: true,
  color: 'orange',
};

export default defaultState;
