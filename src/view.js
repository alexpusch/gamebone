import { getGraphicsAdapter } from "./graphics_adapters"
import { mixinEvents } from "./events"

export default class View{
  constructor(options = {}){
    this.graphicsAdapter = getGraphicsAdapter();
    this.container = this._createContainer();
    this.model = options.model;

    if(this.initialize)
      this.initialize(options);
  }

  render(){}

  update(){}

  _createContainer(){
    return this.graphicsAdapter.createContainer()
  }

  destroy(){
    this.trigger("destroy")
    this.container.destroy();
  }
}

mixinEvents(View);
