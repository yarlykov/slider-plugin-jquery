class Emitter {
  private observers: Object;

  constructor() {
    this.observers = {};
  }

  public emit(event: string, data: number | string | Object): void {
    if (!Array.isArray(this.observers[event])) {
      throw new Error('Nonexistent observer');
    }

    this.observers[event].forEach((observer: Function) => {
      observer(data);
    });
  }

  public subscribe(event: string, fn: Function): void {
    this.observers[event] = this.observers[event] || [];
    this.observers[event].push(fn);
  }

  public unsubscribe(event: string, fn: Function): void {
    this.observers[event] = this.observers[event].filter(
      (observer: Function) => observer !== fn,
    );
  }
}

export default Emitter;
