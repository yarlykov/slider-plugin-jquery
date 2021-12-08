import Fill from './View/subViews/Fill/Fill';
import Labels from './View/subViews/Labels/Labels';
import Scale from './View/subViews/Scale/Scale';
import { Knob, SecondKnob } from './View/subViews/Knobs/Knobs';
import { SecondTooltip, Tooltip } from './View/subViews/Tooltips/Tooltips';

interface IOptions {
  min: number;
  max: number;
  step: number;
  valueFrom: number;
  valueTo: number;
  orientation: 'horizontal' | 'vertical';
  range: boolean;
  fill: boolean;
  labels: boolean;
  tooltips: boolean;
  color: string;
}

interface Events {
  [key: string]: EventCallback[];
}

type EventCallback = (data?: unknown) => void;

type OptionValue = number | string | boolean;

type PageCoords = {
  pageX: number;
  pageY: number;
}

type ScaleCoords = {
  left: number;
  bottom: number;
  width: number;
  height: number;
}

type Components = {
  scale?: Scale;
  fill?: Fill;
  knob?: Knob;
  secondKnob?: SecondKnob;
  labels?: Labels;
  tooltip?: Tooltip;
  secondTooltip?: SecondTooltip;
};

export {
  IOptions,
  EventCallback,
  Events,
  Components,
  PageCoords,
  ScaleCoords,
  OptionValue,
};
