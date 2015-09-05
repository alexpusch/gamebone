import * as p2 from "p2/build/p2"
import mixinP2Physics from "./phyisics_mixin"
import * as _ from "lodash"

export default class World{
  constructor(options = {}){
    this.world = new p2.World(options);
    this.models = new Set();
  }

  add(model){
    let body = model.createBody();
    model.body = body;
    body.model = model;
    
    mixinP2Physics(model);

    this.world.addBody(body);
    this.models.add(model);
  }

  step(dt){
    this.models.forEach(function(model){
      if(_.isFunction(model.preStep))
        model.preStep(dt);
    })

    this.world.step(dt);

    this.models.forEach(function(model){
      if(_.isFunction(model.postStep))
        model.postStep(dt);
    })
  }
}