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

export { IOptions, EventCallback, Events };
