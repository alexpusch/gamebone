import graphicsAdapter from "./graphics_adapters"

export class View{
  constructor(options = {}){
    this.container = this._createContainer();
    this.model = options.model;

    if(this.initialize)
      this.initialize(options);
  }

  render(){}

  update(){}

  _createContainer(){
    return graphicsAdapter.createContainer()
  }
}