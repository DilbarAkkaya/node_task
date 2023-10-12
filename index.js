
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
  emit(eventName){
    if(this.listeners[eventName]) {
      this.listeners[eventName].forEach(function(fn) {
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
    
  }
 /*

 
  once(eventName, fn) {}
 
  listenerCount(eventName) {}
 
  rawListeners(eventName) {} */
 }
 const myEmitter = new EventEmitter();
 myEmitter.addListener('eventOne', c1);
 myEmitter.on('eventOne', c2);
 myEmitter.removeListener('eventOne', c1);
 myEmitter.on('eventOne', c1);
 myEmitter.off('eventOne', c1);
 myEmitter.emit('eventOne');
 

