import * as _ from "lodash"
import DOMEvents from "./dom_events"

let specialKeyMap = {
  "enter": 13,
  "shift": 16,
  "ctrl":  17,
  "alt": 18,
  "space": 20,
  "escape":  27,
  "left": 37,
  "up": 38,
  "right":39,
  "down": 40
}

export default class Controls {
  config(mapping){
    this._keyMap = {};
    for(let action in mapping){
      let value = mapping[action], key = value["key"], upHandler = value["upHandler"], downHandler = value["downHandler"];

      if(_.isString(key)){
        if(!_.isUndefined(specialKeyMap[key]))
          key = specialKeyMap[key];
        else
          key = key.toUpperCase().charCodeAt(0);
      }

      this._keyMap[key] = { upHandler, downHandler }
    }

    DOMEvents.bind(document,"keydown", this._keyDownHandler.bind(this));
    DOMEvents.bind(document,"keyup", this._keyUpHandler.bind(this));
  }

  _keyDownHandler(e){
    this._keyHandler(e, "down");    
  }

  _keyUpHandler(e){
    this._keyHandler(e, "up");    
  }

  _keyHandler(e, type){
    let keyCode = e.which || e.keyCode, config = this._keyMap[keyCode], handler;
    
    if(config)
      handler = config[`${type}Handler`];

    if(handler)
      handler();
    
    e.preventDefault();
    return false;
  }
}
