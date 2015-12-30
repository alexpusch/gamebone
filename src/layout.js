import View from "./view"

export default class Layout extends View{
  constructor(options){
    super(options);

    let regionNames = options.regions;
    this.regions = new Map();

    _.each(regionNames, (regionName) => {
      this.regions.set(regionName, this._createContainer());
    });
  }

  render(){
    this.regions.forEach((region, regionName) => {
      this.container.addChild(region);
      this[regionName] = region;
    })
  }

  show(regionName, view){
    view.render();
    this.regions.get(regionName).addChild(view.container);
  }

  empty(regionName){
    this.regions.get(regionName).removeChildren();
  }
}