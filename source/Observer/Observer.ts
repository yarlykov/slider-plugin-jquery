type ObserverEvent = { type: string; data: unknown }
type Narrow<T, K> = T extends { type: K } ? T : never;
type EventCallback<T extends ObserverEvent, K> = (data: Narrow<T, K>['data']) => void;

class Observer<T extends ObserverEvent> {
  public observers: { [key in T['type']]?: EventCallback<T, key>[] } = {};

  public emit<K extends T['type']>(event: K, data: Narrow<T, K>['data']): void {
    this.observers[event]?.forEach((observer) => observer(data));
  }

  public subscribe<K extends T['type']>(event: K, callback: EventCallback<T, K>): void {
      const observers: EventCallback<T, K>[] = this.observers[event] || [];
      this.observers[event] = [...observers, callback];
  }
}

export default Observer;
