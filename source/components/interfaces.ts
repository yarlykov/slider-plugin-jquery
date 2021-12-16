import Fill from './View/subViews/Fill/Fill';
import Labels from './View/subViews/Labels/Labels';
import Scale from './View/subViews/Scale/Scale';
import { Knob, SecondKnob } from './View/subViews/Knobs/Knobs';
import { SecondTooltip, Tooltip } from './View/subViews/Tooltips/Tooltips';

type Color = 'orange' | 'green';
type Orientation = 'horizontal' | 'vertical';

interface IOptions {
  min: number;
  max: number;
  step: number;
  valueFrom: number;
  valueTo: number;
  orientation: Orientation;
  isRange: boolean;
  hasFill: boolean;
  hasLabels: boolean;
  hasTooltips: boolean;
  color: Color;
}

type OptionValue = number | Color | Orientation | boolean ;

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

type SimpleSliderType = {
  scale: Scale;
  fill: Fill;
  knob: Knob;
  labels: Labels;
  tooltip: Tooltip;
}

type RangeSliderType = SimpleSliderType & {
  secondKnob: SecondKnob;
  secondTooltip: SecondTooltip;
};

type MainStateSettings = {
  min: number,
  max: number,
  step: number,
}

export {
  IOptions,
  SimpleSliderType,
  RangeSliderType,
  PageCoords,
  ScaleCoords,
  OptionValue,
  MainStateSettings,
  Color,
  Orientation,
};
