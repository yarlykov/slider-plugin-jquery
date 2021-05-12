interface IEventEmitter {
  emit(event: string, data: number | string): void;
  subscribe(event: string, fn: Function): void;
  unsubscribe(event: string, fn: Function): void;
}

class Emitter implements IEventEmitter{
  private observers: Object;

  constructor() {
    this.observers = {};
  }

  public emit(event: string, data: number | string) {
    if (!Array.isArray(this.observers[event])) {
      throw new Error('Nonexistent observer');
    }

    this.observers[event].forEach((observer: Function) => {
      observer(data);
    });
  }

  public subscribe(event: string, fn: Function) {
    this.observers[event] = this.observers[event] || [];
    this.observers[event].push(fn);    
  }

  public unsubscribe(event: string, fn: Function) {
    this.observers[event] = this.observers[event].filter(
      (observer: Function) => observer !== fn,
    );
  }
}

export default Emitter;
