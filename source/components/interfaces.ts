import Fill from "./View/subViews/Fill/Fill";
import Knob from "./View/subViews/Knobs/Knob";
import SecondKnob from "./View/subViews/Knobs/SecondKnob";
import Labels from "./View/subViews/Labels/Labels";
import Scale from "./View/subViews/Scale/Scale";
import { SecondTooltip, Tooltip } from "./View/subViews/Tooltips/Tooltips";

interface IOptions {
  min?: number;
  max?: number;
  step?: number;
  valueFrom?: number;
  valueTo?: number;
  orientation?: 'horizontal' | 'vertical';
  range?: boolean;
  fill?: boolean;
  labels?: boolean;
  tooltips?: boolean;
  color?: string;
}

type EventCallback = (data?: IOptions | number | string) => void;

interface Events {
  [key: string]: EventCallback[];
}

type coords = {
  pageX?: number;
  pageY?: number;
  left?: number;
  bottom?: number;
  width?: number;
  height?: number;
};

type ComponentsList = {
  Scale?: Scale,
  Fill?: Fill,
  Knob?: Knob,
  SecondKnob?: SecondKnob,
  Labels?: Labels,
  Tooltip?: Tooltip,
  SecondTooltip?: SecondTooltip,
};

type Components = [
  Scale?,
  Fill?,
  Knob?,
  SecondKnob?,
  Labels?,
  Tooltip?,
  SecondTooltip?,
];

export { IOptions, EventCallback, Events, ComponentsList, Components, coords };
