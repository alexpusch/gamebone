export default class PixiStage{
  constructor(options = {}) {
    this.options = options;

    this._stage = new PIXI.Container();
    this._backstage = new PIXI.Container();

    this._backstage.addChild(this._stage);

    this._renderer = this.options._renderer || new PIXI.autoDetectRenderer(this.options.width, this.options.height);
  }

  show() {
    this.domContainer = this._createDOMContainer(this.options);
    this.domContainer.appendChild(this._renderer.view);
  }

  addChild(child) {
    this._stage.addChild(child);
  }

  set filters(filters) {
    this._filters = filters;
    this._renderTexture = new PIXI.RenderTexture(this._renderer, this._renderer.width, this._renderer.height);
    this._outputSprite = new PIXI.Sprite(this._renderTexture);

    this._outputSprite.filters = filters;
  }

  render() {
    let output = this._backstage;

    if(this._filters)
      output = this._renderWithFilters(output);

    this._renderer.render(output);
  }

  actOnPixiStage(fn) {
    fn(this._stage);
  }

  get canvas() {
    return this._renderer.view;
  }

  _renderWithFilters(graphics) {
    this._renderTexture.render(graphics, undefined, true, true);
    this._outputSprite.texture = this._renderTexture;

    return this._outputSprite;
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