import { EventCallback, Events } from '../components/interfaces';

class Observer {
  public observers: Events;

  constructor() {
    this.observers = {};
  }

  public emit(event: string, data: unknown): boolean {
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

export default Observer;
