import { mixinEvents, Listener, Observer } from "observerkit";

export default class Base{
  constructor(){
    this.listener = new Listener();
    this.observer = new Observer();
  }

  destroy(){
    this.listener.stopListening();
    this.observer.stopObserving();
    this.trigger("destroy");
  }

  listenTo(...args){
    this.listener.listenTo(...args);
  }

  stopListeningTo(...args){
    this.listener.stopListeningTo(...args);
  }

  observeOn(...args){
    this.observer.observe(...args);
  }

  stopObservingOn(...args){
    this.observer.stopObservingOn(...args);
  }
}

mixinEvents(Base.prototype);