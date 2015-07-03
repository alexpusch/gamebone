import graphicsAdapter from "./graphics_adapters"

export class Game{
  constructor(options = {}){
    this.stage = graphicsAdapter.createStage(options);
    if(this.initialize !== undefined)
      this.initialize(options);
  }

  start(){
    requestAnimationFrame(this._frame.bind(this))
  }

  _frame(){
    this.frame();
    graphicsAdapter.render(this.stage);
    requestAnimationFrame(this._frame.bind(this));
  }
}