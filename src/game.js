import { getGraphicsAdapter } from "./graphics_adapters"
import Controls from "./controls"

export default class Game{
  constructor(options = {}){
    this.graphicsAdapter = getGraphicsAdapter();
    this.stage = this.graphicsAdapter.createStage(options);
    if(this.initialize !== undefined)
      this.initialize(options);
    this.controls = new Controls({
      canvas: this.graphicsAdapter.getCanvas(this.stage)
    });
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
  _frame(dt){
    this.frame(dt * 1000);
    this.graphicsAdapter.render(this.stage);
    requestAnimationFrame(this._frame.bind(this));
  }
}