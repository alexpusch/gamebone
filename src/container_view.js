import View from './view';

export default class ContainerView extends View{
  constructor(options){
    super(options);

    this.views = new Set();
  }

  render(){
    for(let view of this.views){
      view.render();
      this.container.add(view.container);
    }
  }

  add(view){
    this.views.add(view);
    view.render();

    this.container.addChild(view.container);
  }
}