import Fill from './View/subViews/Fill/Fill';
import Labels from './View/subViews/Labels/Labels';
import Scale from './View/subViews/Scale/Scale';
import Knob from './View/subViews/Knob/Knob';
import Tooltip from './View/subViews/Tooltip/Tooltip';

type Color = 'orange' | 'green';
type Orientation = 'horizontal' | 'vertical';
type OptionsNumberValues = 'valueFrom' | 'valueTo' | 'min' | 'max' | 'step';
type OptionsKnobValues = 'valueFrom' | 'valueTo'
type OptionsBooleanValues = 'isRange' | 'hasFill' | 'hasLabels' | 'hasTooltips';

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

type TooltipCoords = {
  firstRight: number,
  firstTop: number,
  secondLeft: number,
  secondBottom: number,
}

type SimpleSliderType = {
  scale: Scale;
  fill: Fill;
  knob: Knob;
  labels: Labels;
  tooltip: Tooltip;
}

type RangeSliderType = SimpleSliderType & {
  secondKnob: Knob;
  secondTooltip: Tooltip;
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
  TooltipCoords,
  OptionsNumberValues,
  OptionsBooleanValues,
  OptionsKnobValues,
};
