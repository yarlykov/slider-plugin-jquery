interface IOptions {
  min?: number;
  max?: number;
  step?: number;
  current?: number;
  rangeMax?: number;
  orientation?: 'horizontal' | 'vertical';
  range?: boolean;
  fill?: boolean;
  labels?: boolean;
  tooltips?: boolean;
  color?: string;
}

export { IOptions };
