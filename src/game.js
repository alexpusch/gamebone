import { getGraphicsAdapter } from "./graphics_adapters"
import Controls from "./controls"
import RequestResponse from "./request_response"
import { mixinEvents } from "./events"

export default class Game{
  constructor(options = {}){
    this.graphicsAdapter = getGraphicsAdapter();
    this.stage = this.graphicsAdapter.createStage(options);
    this.options = options;    
      canvas: this.graphicsAdapter.getCanvas(this.stage)
    });
    this.reqres = new RequestResponse();
  }

  start(){
    requestAnimationFrame(this._frame.bind(this))
  }

  show(view){
    view.render()
    this.stage.addChild(view.container);
  }

  handleKeyboard(mapping){
    this.controls.keyboard(mapping);
  }

  handleTouch(mapping){
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

  get width(){
    return this.options.width;
  }

  get height(){
    return this.options.height;
  }

  _adjustStage(){
    this.stage.x = this._camera.tx;
    this.stage.y = this._camera.ty;
    this.stage.scale.x = this._camera.zoom;
    this.stage.scale.y = this._camera.zoom;
  }

  _ensureControls(){
    this.controls = new Controls({
      canvas: this.graphicsAdapter.getCanvas(this.stage)
    });
  }

  _frame(dt){
    this.frame(dt * 1000);
    this.graphicsAdapter.render(this.stage);
    this.trigger("frame");
    requestAnimationFrame(this._frame.bind(this));
  }
}}

mixinEvents(Game);