import Base from "./base";

import { getGraphicsAdapter } from "./graphics_adapters"

export default class View extends Base{
  constructor(options = {}){
    super(options);

    this.graphicsAdapter = getGraphicsAdapter();
    this.container = this._createContainer();
    this.model = options.model;

    this.on("destroy", () => {
      this.container.destroy();
    });
  }

  render(){}

  update(){}

  _createContainer(){
    return this.graphicsAdapter.createContainer();
  }
}