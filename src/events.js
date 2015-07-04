import _ from "lodash"

export function mixinEvents(target){
  ['on', 'off', 'trigger', 'resetEvents'].forEach(function(method){
    target.prototype[method] = Events.prototype[method];
  })
}

export default class Events {
  on(eventName, callback){
    if(this.directory === undefined)
      this.directory = {};

    if (this.directory[eventName] === undefined)
      this.directory[eventName] = []

    let callbackList = this.directory[eventName]
    callbackList.push(callback)
  }

  off(eventName, callback){
    if (this.directory === undefined || this.directory[eventName] === undefined)
      return;

    let callbackList = this.directory[eventName]
    this.directory[eventName] = _.without(callbackList, callback);
  }

  trigger(eventName, ...args){
    if (this.directory === undefined || this.directory[eventName] === undefined)
      return;

    let callbackList = this.directory[eventName]

    _(callbackList).each( function(callback){
      callback( ...args );
    }).value();

  }

  resetEvents(){
    this.directory = {}
  }
}

