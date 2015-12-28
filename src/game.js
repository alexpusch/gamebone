import _ from "lodash"

import { getGraphicsAdapter } from "./graphics_adapters"
import Controls from "./controls"
import RequestResponse from "./request_response"
import { mixinEvents } from "./events"
import PixiStage from "./pixi_stage"
import Layout from "./layout"

export default class Game{
  constructor(options = {}){
    options = _.defaults(options, {
      regions: ["background", "main", "ui"]
    })

    this.graphicsAdapter = getGraphicsAdapter();
    this.stage = new PixiStage(options);
    this.layout = new Layout(options);
    this.options = options;    
    this.reqres = new RequestResponse();
  }

  start(){
    this.layout.render();
    this.stage.addChild(this.layout.container);

    this.stage.show();
    requestAnimationFrame(this._frame.bind(this))
  }

  show(regionName, view){
    this.layout.show(regionName, view);
  }

  handleKeyboard(mapping){
    this._ensureControls();
    this.controls.keyboard(mapping);
  }

  handleTouch(mapping){
    this._ensureControls();
    this.controls.touch(mapping);
  }

  setFilters(filters){
    this.stage.filters = filters
  }

  get width(){
    return this.options.width;
  }

  get height(){
    return this.options.height;
  }

  _adjustStage(){
    this.stage.actOnPixiStage((stage) => {
      stage.x = this._camera.tx;
      stage.y = this._camera.ty;
      stage.scale.x = this._camera.zoom;
      stage.scale.y = this._camera.zoom;
    });
  }

  _ensureControls(){
    this.controls = new Controls({
      canvas: this.stage.canvas
    });
  }

  _frame(dt){
    this.frame(dt * 1000);
    this.stage.render();
    this.trigger("frame");
    requestAnimationFrame(this._frame.bind(this));
  }
}

mixinEvents(Game);