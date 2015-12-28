import _ from "lodash"

import { mixinObserve } from "./observe"

export default class Camera{
  constructor(options){
    this.viewportWidth = options.width;
    this.viewportHeight = options.height;

    this.tx = 0;
    this.ty = 0;
    this.zoom = 1;
    
    this.initialize.apply(this, arguments);
  }

  start(target){
    this.observe(["tx", "ty", "zoom"], this._adjustTarget.bind(this, target));
  }

  initialize(){}

  _adjustTarget(target){
    target.x = this.tx;
    target.y = this.ty;
    target.scale.x = this.zoom;
    target.scale.y = this.zoom;
  }
} 

mixinObserve(Camera);