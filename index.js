
function c1() {
  console.log('an event occurred!');
}

class EventEmitter {
  constructor(){
    this.listeners = {}
  }

 
  addListener(eventName, fn) {
    console.log(eventName)
  }
   /*  
  on(eventName, fn) {}
 
  removeListener(eventName, fn) {}
    
  off(eventName, fn) {}
 
  once(eventName, fn) {}
 
  emit(eventName, ...args) {}
 
  listenerCount(eventName) {}
 
  rawListeners(eventName) {} */
 }
 const myEmitter = new EventEmitter();
 myEmitter.addListener('hi', c1)