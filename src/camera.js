import _ from 'lodash';

import Base from './base';
import { mixinObserve } from 'observerkit';

export default class Camera extends Base{
  constructor(options) {
    super();
    this.viewportWidth = options.width;
    this.viewportHeight = options.height;

    this.tx = 0;
    this.ty = 0;
    this.zoom = 1;
  }

  start(target) {
    this.target = target;
    this.observe('tx ty zoom', this._adjustTarget.bind(this, target));

    this.on('destroy', () => {
      this.target.x = 0;
      this.target.y = 0;

      target.scale.x = 1;
      target.scale.y = 1;
    });
  }

  _adjustTarget(target) {
    target.x = this.tx;
    target.y = this.ty;
    target.scale.x = this.zoom;
    target.scale.y = this.zoom;
  }
}

mixinObserve(Camera.prototype);
