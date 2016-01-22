export default class PixiStage{
  constructor(options = {}) {
    this.options = options;

    this._stage = new PIXI.Container();

    this._renderer = this.options._renderer || new PIXI.autoDetectRenderer(this.options.width, this.options.height);
  }

  show() {
    this.domContainer = this._createDOMContainer(this.options);
    this.domContainer.appendChild(this._renderer.view);
  }

  addChild(child) {
    this._stage.addChild(child);
  }

  render() {
    this._renderer.render(this._stage);
  }

  actOnPixiStage(fn) {
    fn(this._stage);
  }

  get canvas() {
    return this._renderer.view;
  }

  _createDOMContainer(options) {
    let domContainer;

    if (options.domContainer === undefined) {
      domContainer = document.createElement('div');
      document.body.appendChild(domContainer);
    } else if (typeof (options.domContainer) === 'string')
      domContainer = document.querySelector(options.domContainer);
    else
      domContainer = options.domContainer;

    return domContainer;
  }
}
