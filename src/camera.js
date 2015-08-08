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

  initialize(){}
} 

mixinObserve(Camera);