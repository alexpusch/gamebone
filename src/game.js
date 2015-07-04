import { getGraphicsAdapter } from "./graphics_adapters"

export default class Game{
  constructor(options = {}){
    this.graphicsAdapter = getGraphicsAdapter();
    this.stage = this.graphicsAdapter.createStage(options);
    if(this.initialize !== undefined)
      this.initialize(options);
  }

  start(){
    requestAnimationFrame(this._frame.bind(this))
  }

  _frame(){
    this.frame();
    this.graphicsAdapter.render(this.stage);
    requestAnimationFrame(this._frame.bind(this));
  }
}