import * as PIXI from "pixi.js/bin/pixi.js"

export default {
  createContainer(){
    return new PIXI.Container()
  },

  createStage(options = {}){
    let renderer = options.renderer || PIXI.autoDetectRenderer(800, 600);
    let domContainer = _getDomContainer(options);

    domContainer.appendChild(renderer.view);

    let stage = new PIXI.Container();
    stage.renderer = renderer;
    return stage;
  }, 

  render(stage){
    stage.renderer.render(stage);
  }
}

function _getDomContainer(options){
  let domContainer;
  
  if(options.domContainer === undefined)
    domContainer = document.createElement("div");
  else if(typeof(options.domContainer) === "string")
    domContainer = document.querySelector(options.domContainer);
  else
    domContainer = options.domContainer;

  return domContainer;
}