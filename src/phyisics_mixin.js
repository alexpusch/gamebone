import * as p2 from "p2/build/p2"

function definePositionProperty(target, name){
  let index = name === "x" ? 0 : 1;
  Object.defineProperty(target.prototype, name, {
    enumerable: true,
    configurable: true,
    get: function(){
      return this.body.position[index]
    },
    set: function(value){
      this.body.position[index] = value;
    }
  })
}

function defineProperty(target, name){
  Object.defineProperty(target.prototype, name, {
    enumerable: true,
    configurable: true,
    get: function(){
      return this.body[name]
    },
    set: function(value){
      this.body[name] = value;
    }
  })
}

function mixinP2Phyisics(target){
  definePositionProperty(target, "x");
  definePositionProperty(target, "y");

  defineProperty(target, "velocity");
  defineProperty(target, "angularVelocity");
  defineProperty(target, "angle");
}

export default mixinP2Phyisics;
