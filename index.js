
function c1() {
  console.log('an event occurred!');
}

function c2() {
  console.log('yet another event occurred!');
}

class EventEmitter {
  constructor() {
    this.listeners = {}
  }


  addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
  }

  on(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
  }
  emit(eventName) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(function (fn) {
        fn()
      });
    }
  }
  removeListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName].filter(item => item !== fn);
  }

  off(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName].filter(item => item !== fn);
  }
  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const onceWrapper = function () {
      fn();
      this.removeListener(eventName, onceWrapper);
    }
    this.listeners[eventName].push(onceWrapper);
  }

  listenerCount(eventName) {
    if (this.listeners[eventName]) {
      return this.listeners[eventName].length;
    }
    return 0;
  }
  rawListeners(eventName) {
    return this.listeners[eventName];
  }
}

const myEmitter = new EventEmitter();
myEmitter.addListener('eventOne', c1);
myEmitter.on('eventOne', c2);
myEmitter.removeListener('eventOne', c1);
myEmitter.on('eventOne', c1);
myEmitter.off('eventOne', c1);
myEmitter.listenerCount('eventOne');
console.log(myEmitter.listenerCount('eventOne'));
console.log(myEmitter.rawListeners('eventOne'));
myEmitter.emit('eventOne');
