interface IOptions {
  min?: number;
  max?: number;
  step?: number;
  currentValue?: number;
  rangeMin?: number;
  rangeMax?: number;
  orientation?: 'horizontal' | 'vertical';
  range?: boolean;
  fill?: boolean;
  units?: string;
  color?: string;
}

export { IOptions };
