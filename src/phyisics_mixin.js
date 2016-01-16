import * as p2 from 'p2/build/p2';
import _ from 'lodash';

import mixin from './mixin';

let P2Physics = {};

function definePositionProperty(target, name) {
  let index = name === 'x' ? 0 : 1;
  Object.defineProperty(target, name, {
    enumerable: true,
    configurable: true,
    get: function() {
      return this.body.position[index];
    },

    set: function(value) {
      this.body.position[index] = value;
    },
  });
}

function defineProperty(target, name) {
  Object.defineProperty(target, name, {
    enumerable: true,
    configurable: true,
    get: function() {
      return this.body[name];
    },

    set: function(value) {
      this.body[name] = value;
    },
  });
}

definePositionProperty(P2Physics, 'x');
definePositionProperty(P2Physics, 'y');

defineProperty(P2Physics, 'velocity');
defineProperty(P2Physics, 'angularVelocity');
defineProperty(P2Physics, 'angle');

function mixinP2Phyisics(target) {
  let fields = ['x', 'y', 'velocity', 'angularVelocity', 'angle'];

  let temps = _(fields)
    .map(function(field) {
      if (target[field])
        return { name: field, value: target[field] };
      else
        return undefined;
    })
    .compact()
    .value();

  _.each(fields, function(field) {
    delete target[field];
  });

  mixin(target, P2Physics);

  _.each(temps, function(temp) {
    target[temp.name] = temp.value;
  });
}

export default mixinP2Phyisics;
