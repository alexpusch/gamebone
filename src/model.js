import { mixinEvents } from "./events"

import _ from "lodash"

export default class Model{
  constructor(attributes = {}){
    _.extend(this, attributes);

    this._obseveables = new Set();

    if(_.isFunction(this.initialize)){
      this.initialize();
    }
  }

  observe(key, callback){
    if(callback)
      this.on(`change:${key}`, callback);

    if(!this._obseveables.has(key)){
      this._obseveables.add(key);

      let oldValue = this[key];

      Object.defineProperty(this, key, {
        enumerable: true, 
        get: function(){
          return this[`__${key}`];
        }, 
        set: function(value){
          this[`__${key}`] = value;
          this.trigger(`change:${key}`, value);
          this.trigger("change");
        }
      });
      
      if(!_.isUndefined(oldValue))
        this[key] = oldValue;
    }
  }
}

mixinEvents(Model);