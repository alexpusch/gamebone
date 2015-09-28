import { getGraphicsAdapter } from "./graphics_adapters"
import Controls from "./controls"
import RequestResponse from "./request_response"
import { mixinEvents } from "./events"
import PixiStage from "./pixi_stage"

export default class Game{
  constructor(options = {}){
    this.graphicsAdapter = getGraphicsAdapter();
    this.stage = new PixiStage(options);
    this.options = options;    
    this.reqres = new RequestResponse();
  }

  start(){
    this.stage.show();
    requestAnimationFrame(this._frame.bind(this))
  }

  show(view){
    view.render()
    this.stage.addChild(view.container);
  }

  handleKeyboard(mapping){
    this._ensureControls();
    this.controls.keyboard(mapping);
  }

  handleTouch(mapping){
    this._ensureControls();
    this.controls.touch(mapping);
  }

  set camera(camera){
    this._camera = camera;

    camera.observe(["tx", "ty", "zoom"], this._adjustStage.bind(this));
    this.reqres.setHandler("camera:position", () => {
      return {
        x: -camera.tx,
        y: -camera.ty,
        z: camera.zoom
      }
    })
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
    })
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