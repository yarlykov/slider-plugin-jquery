class Emitter {
  constructor() {
    this.listeners = {};
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  makeSubscribe(event, fn) {
    // если в массиве this.listeners нет ключей, то присвоится пустой массив
    // в противном случае, массив с ключами
    // чтобы на каждой итерации не перезаписывать его
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] = this.listeners[event].filter((listener) => listener !== fn);
    };
  }
}

export default Emitter;
