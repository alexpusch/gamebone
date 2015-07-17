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

  show(view){
    view.render()
    this.stage.addChild(view.container);
  }

  _frame(dt){
    this.frame(dt * 1000);
    this.graphicsAdapter.render(this.stage);
    requestAnimationFrame(this._frame.bind(this));
  }
}