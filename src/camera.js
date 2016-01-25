import _ from 'lodash';

import Base from './base';
import View from './view';

export default class Camera extends Base{
  constructor(options) {
    super();
    this.viewportWidth = options.viewportWidth;
    this.viewportHeight = options.viewportHeight;

    this.tx = 0;
    this.ty = 0;
    this.zoom = 1;
  }

  start(target) {
    if(target instanceof View){
      target = target.container;
    }

    this.target = target;
    this.observe('tx ty zoom', this._adjustTarget.bind(this, target));

    this.on('destroy', () => {
      this.target.x = 0;
      this.target.y = 0;

      target.scale.x = 1;
      target.scale.y = 1;
    });
  }

  getBoundingBox(){
    return {
      topLeft: {
        x: this.tx * -1,
        y: this.ty * -1
      },
      bottomRight: {
        x: this.tx * -1 + this.viewportWidth,
        y: this.ty * -1 + this.viewportHeight
      }
    };
  }

  _adjustTarget(target) {
    target.x = this.tx;
    target.y = this.ty;
    target.scale.x = this.zoom;
    target.scale.y = this.zoom;
  }
}