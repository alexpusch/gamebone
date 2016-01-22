import { mixinEvents, Listener, Observer } from 'observerkit';

export default class Base{
  constructor(options) {
    this.options = options;
    this.listener = new Listener();
    this.observer = new Observer();
  }

  destroy() {
    this.listener.stopListening();
    this.observer.stopObserving();
    this.trigger('destroy');
  }

  listenTo(...args) {
    this.listener.listenTo(...args);
  }

  stopListeningTo(...args) {
    this.listener.stopListeningTo(...args);
  }

  observeOn(...args) {
    this.observer.observe(...args);
  }

  stopObservingOn(...args) {
    this.observer.stopObservingOn(...args);
  }

  observe(...args){
    this.observer.observe(this, ...args);
  }

  stopObserving(...args){
    this.observer.stopObserving(this, ...args);
  }
}

mixinEvents(Base.prototype);
