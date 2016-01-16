import View from './view';

export default class CollectionView extends View{
  constructor(options = {}) {
    super(options);
    this.collection = options.collection;
    this.childViewType = options.childViewType;
    this.childViews = new Map();
  }

  update() {
    this._forEachChildView(function(view) {
      view.update();
    });
  }

  render() {
    for (let model of this.collection) {
      this._addModelView(model);
    }

    this.listenTo(this.collection, 'add', this._addModelView.bind(this));
    this.listenTo(this.collection, 'remove', this._removeModelView.bind(this));
  }

  _addModelView(model) {
    let childView = this._createChildView(model);
    this.childViews.set(model, childView);
    childView.render();
    this.container.addChild(childView.container);
  }

  _removeModelView(model) {
    this.container.removeChild(this._getChildView(model).container);
    this.childViews.delete(model);
  }

  _createChildView(model) {
    return new this.childViewType({ model });
  }

  _getChildView(model) {
    return this.childViews.get(model);
  }

  _forEachChildView(fn) {
    for (let childView of this.childViews.values()) {
      fn(childView);
    }
  }
}
