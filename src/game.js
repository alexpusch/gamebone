import _ from "lodash"
import { mixinEvents } from "observerkit";

import { getGraphicsAdapter } from "./graphics_adapters"
import Controls from "./controls"
import RequestResponse from "./request_response"
import PixiStage from "./pixi_stage"
import Layout from "./layout"
import ScreenManager from "./screen_manager"

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
    this.screenManager = new ScreenManager();
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

  addScreens(screens){
    this.screenManager.add(screens);
  }

  gotoScreen(screenName){
    this.screenManager.goto(screenName);
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
    if(this.frame instanceof Function)
      this.frame(dt * 1000);

    this.stage.render();
    this.trigger("frame");
    requestAnimationFrame(this._frame.bind(this));
  }
}

mixinEvents(Game.prototype);