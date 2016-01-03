import _ from "lodash"
import Events from "./events"

function mixinObserve(target){
  target.prototype.observe = function(key, callback){
    observe(this, key, callback);
  }

  target.prototype.unobserve = function(key, callback){
    unobserve(this, key, callback);
  }
}

function observe(target, keys, callback){
  if(!target._observe){
    _initObserver(target);    
  }  

  if(!_.isArray(keys))
    keys = [keys];

  _.each(keys, function(key){
    target._observe.events.on(`change:${key}`, callback);

    if(!_isObserving(target, key)){
      target._observe.obseveables.add(key);
      let oldValue = target[key];

      _defineProperties(target, key);

      if(!_.isUndefined(oldValue))
        target[key] = oldValue;
    }
  })
}

function unobserve(target, keys, callback){
  if(!_.isArray(keys))
    keys = [keys];

  _.each(keys, function(key){
    target._observe.events.off(`change:${key}`, callback);
  });
}

function _initObserver(target){
  target._observe = {};
  target._observe.attributes = {};
  target._observe.obseveables = new Set();
  target._observe.events = new Events();
}

function _isObserving(target, key){
  target._observe.obseveables.has(key)
}

function _defineProperties(target, key){
  let descriptor = Object.getOwnPropertyDescriptor(target, key);
  let setter, getter;

  if(descriptor){
    setter = descriptor.set;
    getter = descriptor.get;
  }

  Object.defineProperty(target, key, {
    enumerable: true, 
    configurable: true,
    get: function(){
      if(getter)
        return getter()
      else
        return target._observe.attributes[`${key}`];
    }, 
    set: function(value){
      if(target._observe.attributes[`${key}`] === value)
        return;

      if(setter)
        setter.call(target, value);
      else
        target._observe.attributes[`${key}`] = value;

      target._observe.events.trigger(`change:${key}`, value);
      // target._observe.events.trigger("change");
    }
  });
}

export { observe, unobserve, mixinObserve }