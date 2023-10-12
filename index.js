
function c1() {
  console.log('an event occurred!');
}

function c2() {
  console.log('yet another event occurred!');
}

class EventEmitter {
  constructor(){
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

 /*
  removeListener(eventName, fn) {}
    
  off(eventName, fn) {}
 
  once(eventName, fn) {}
 
  emit(eventName, ...args) {}
 
  listenerCount(eventName) {}
 
  rawListeners(eventName) {} */
 }
 const myEmitter = new EventEmitter();
 myEmitter.addListener('eventOne', c1);
 myEmitter.on('eventOne', c2);

