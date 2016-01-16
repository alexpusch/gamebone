import * as _ from 'lodash';
import DOMEvents from './dom_events';

let specialKeyMap = {
  enter: 13,
  shift: 16,
  ctrl:  32,
  alt: 18,
  space: 20,
  escape:  27,
  left: 37,
  up: 38,
  right:39,
  down: 40,
};

export default class Controls {
  constructor(options) {
    this.canvas = options.canvas;
  }

  // mapping:
  //  {
  //     "w": {
  //       down(){},
  //       up(){}
  //     }
  //   }
  keyboard(mapping) {
    this._keyMap = {};
    for (let key in mapping) {
      let value = mapping[key], upHandler = value.up, downHandler = value.down;

      if (_.isString(key)) {
        if (!_.isUndefined(specialKeyMap[key])) {
          key = specialKeyMap[key];
        } else {
          key = key.toUpperCase().charCodeAt(0);
        }
      }

      this._keyMap[key] = { upHandler, downHandler };
    }

    DOMEvents.bind(document, 'keydown', this._keyDownHandler.bind(this));
    DOMEvents.bind(document, 'keyup', this._keyUpHandler.bind(this));
  }

  touch(mapping) {
    this._bindTouchEvent(this.canvas, 'start', mapping.start);
    this._bindTouchEvent(this.canvas, 'end', mapping.end);
    this._bindTouchEvent(this.canvas, 'cancle', mapping.cancle);
    this._bindTouchEvent(this.canvas, 'leave', mapping.leave);
    this._bindTouchEvent(this.canvas, 'move', mapping.move);
  }

  _keyDownHandler(e) {
    this._keyHandler(e, 'down');
  }

  _keyUpHandler(e) {
    this._keyHandler(e, 'up');
  }

  _keyHandler(e, type) {
    let keyCode = e.which || e.keyCode, config = this._keyMap[keyCode], handler;

    if (config) {
      handler = config[`${type}Handler`];
    }

    if (handler) {
      handler();
    }

    e.preventDefault();
    return false;
  }

  _bindTouchEvent(canvas, type, handler) {
    if (!handler) {
      return;
    }

    DOMEvents.bind(canvas, `touch${type}`, function(event) {
      for (let i = 0; i < event.touches.length; i++) {
        let touch = event.touches[i];
        let { top, left } = canvas.getBoundingClientRect();
        touch.gameX = touch.clientX - left;
        touch.gameY = touch.clientY - top;
      }

      handler(event);
    });
  }
}
