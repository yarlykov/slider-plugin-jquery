import { EventCallback, Events, IOptions } from './components/interfaces';

class Emitter {
  private observers: Events;

  constructor() {
    this.observers = {};
  }

  public emit(event: string, data: number | string | IOptions): void {
    if (!Array.isArray(this.observers[event])) {
      throw new Error('Nonexistent observer');
    }

    this.observers[event].forEach((observer: EventCallback) => {
      observer(data);
    });
  }

  public subscribe(event: string, fn: EventCallback): void {
    this.observers[event] = this.observers[event] || [];
    this.observers[event].push(fn);
  }

  public unsubscribe(event: string, fn: EventCallback): void {
    this.observers[event] = this.observers[event].filter(
      (observer: EventCallback) => observer !== fn,
    );
  }
}

export default Emitter;
