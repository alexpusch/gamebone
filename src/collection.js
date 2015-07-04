import { mixinEvents } from "./events"

export default class Collection{
  constructor(models = [], options = {}){
    this._models = models;
  }

  add(model){
    this._models.push(model);
    this.trigger("add", model);
  }

  remove(model){
    this._models = _(this._models).without(model);
    this.trigger("remove", model);
  }

  get length(){
    return this._models.length;
  }


  get models(){
    return this._models;
  }

  *[Symbol.iterator]() {
    for(let model of this._models)
      yield model;
  };

  // reset(){}
  // lodsh methods
}

mixinEvents(Collection);