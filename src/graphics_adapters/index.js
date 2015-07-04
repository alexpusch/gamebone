import pixiGraphicsAdapter from "./pixi_graphics_adapter"

let graphicsAdapter = pixiGraphicsAdapter;

export function setGraphicsAdapter(adapter){
  graphicsAdapter = adapter;
}

export function getGraphicsAdapter(){
  return graphicsAdapter;
}

