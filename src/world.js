import * as p2 from "p2/build/p2"
import mixinP2Physics from "./phyisics_mixin"
import * as _ from "lodash"

export default class World{
  constructor(options = {}){
    this.world = options.world || new p2.World(options);
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

  remove(model){
    delete model.body;
    this.world.removeBody(model);
    this.models.delete(model);
  }

  addCollection(collection){
    collection.each((model) => {
      this.add(model);
    });

    collection.on("add", (model) => {
      this.add(model);
    });

    collection.on("remove", (model) => {
      this.remove(model);
    });
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

  onCollision(type1, type2, handler){
    this.world.on("beginContact", function(evt){
      let model1 = evt.bodyA.model, model2 = evt.bodyB.model;

      if(model1 instanceof type1 && model2 instanceof type2){
        handler(model1, model2, evt);
      } else if (model2 instanceof type1 && model1 instanceof type2){
        handler(model2, model1, evt);
      }
    })
  }
}