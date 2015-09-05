import { mixinEvents } from "./events"
import { mixinObserve } from "./observe"

import _ from "lodash"

export default class Model{
  constructor(attributes = {}){
    _.extend(this, attributes); 

    if(_.isFunction(this.initialize)){
      this.initialize();
    }
  }

  destroy(){
    this.trigger("destroy");
  }
}

mixinEvents(Model);
mixinObserve(Model);