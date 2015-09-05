import * as chai from "chai"
import * as sinon from "imports?define=>false&require=>false!sinon/pkg/sinon"
import sinonChai from "sinon-chai"

import CollectionView from "../src/collection_view"
import Collection from "../src/collection"
import Model from "../src/model"

let expect = chai.expect;


describe("CollectionView", function(){
  let TestCollectionView, collectionView, renderSpy, updateSpy, collection, model1, model2;

  beforeEach(function(){
    class TestChildView{};

    TestChildView.prototype.render = renderSpy = sinon.spy();
    TestChildView.prototype.update = updateSpy = sinon.spy();

    collection = new Collection();

    model1 = new Model({a: 1});
    model2 = new Model({a: 2});

    collection.add(model1);
    collection.add(model2);

    collectionView = new CollectionView({
      collection,
      childViewType: TestChildView
    });
  });

  describe("render", function(){
    beforeEach(function(){
      collectionView.render();
    })

    it("renders each of the child view for each model in the collection", function(){
      expect(renderSpy).to.have.been.calledTwice
      expect(collectionView.container.addChild).to.have.been.calledTwice
    })

    it("renders a new child view for each new model added to collection", function(){
      let model3 = new Model({a:3});
      collection.add(model3);
      expect(renderSpy).to.have.been.calledTrice
      expect(collectionView.container.addChild).to.have.been.calledTrice
    })

    it("removes the child view when a model is removed from the collection", function(){
      collection.remove(model2);
      expect(collectionView.container.removeChild).to.have.been.called;
    })

    xit("throws an error if no childViewType is passed")
  })

  xdescribe("update", function(){});

})
