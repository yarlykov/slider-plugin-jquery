import { EventCallback, Events, IOptions } from '../components/interfaces';

type data = number | string | IOptions | undefined;

class Emitter {
  private observers: Events;

  constructor() {
    this.observers = {};
  }

  public emit(event: string, data: data): boolean {
    if (!Array.isArray(this.observers[event])) {
      return false;
    }

    this.observers[event].forEach((observer: EventCallback) => {
      observer(data);
    });
    return true;
  }

  public subscribe(event: string, fn: EventCallback): void {
    this.observers[event] = this.observers[event] || [];
    this.observers[event].push(fn);
  }

  public unsubscribe(event: string, fn: EventCallback): Events {
    this.observers[event] = this.observers[event].filter(
      (observer: EventCallback) => observer !== fn,
    );
    return this.observers;
  }
}

export default Emitter;
