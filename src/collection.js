import Base from './base';

import { mixinEvents } from 'observerkit';
import _ from 'lodash';

export default class Collection extends Base{
  constructor(models = [], options = {}) {
    super();
    this._models = models;
  }

  add(model) {
    this._models.push(model);
    this.trigger('add', model);

    this.listenTo(model, 'destroy', () => {
      this.remove(model);
    });
  }

  remove(model) {
    this._models = _.without(this._models, model);
    this.trigger('remove', model);
  }

  get length() {
    return this._models.length;
  }

  get models() {
    return this._models;
  }

  *[Symbol.iterator]() {
    for (let model of this._models)
      yield model;
  };
}

mixinEvents(Collection.prototype);

['all', 'any', 'at', 'collect', 'contains', 'countBy', 'detect', 'each', 'eachRight', 'every', 'filter', 'find', 'findLast', 'findWhere', 'foldl', 'foldr', 'forEach', 'forEachRight', 'groupBy', 'include', 'includes', 'indexBy', 'inject', 'invoke', 'map', 'partition', 'pluck', 'reduce', 'reduceRight', 'reject', 'sample', 'select', 'shuffle', 'size', 'some', 'sortBy', 'sortByAll', 'sortByOrder', 'where'].forEach(function(fn) {
  Collection.prototype[fn] = function() {
    return _[fn].apply(this.models, arguments);
  };
});
