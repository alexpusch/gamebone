import * as chai from "chai"
import * as sinon from "imports?define=>false&require=>false!sinon/pkg/sinon"
import sinonChai from "sinon-chai"

import Collection from "../src/collection"
import Model from "../src/model"

let expect = chai.expect;

describe("Collection", function(){
  let collection, model;

  beforeEach(function(){
    model = new Model({a: 1});
    collection = new Collection();
  })

  describe("#add", function(){
    it("adds a model to the collection", function(){
      collection.add(model);
      expect(collection.models[0]).to.equal(model);
    })

    it("triggers an 'add'", function(){
      let spy = sinon.spy();
      collection.on("add", spy);
      collection.add(model);
      expect(spy).to.have.been.calledWith(model);
    })

    it("removes the model from the collection when the model is destroied", function(){
      collection.add(model);
      model.destroy();
      expect(collection.length).to.equal(0);
    })
  })

  describe("#remove", function(){
    it("removes a model from the collection", function(){
      collection.add(model);
      collection.remove(model);
      expect(collection.models[0]).not.to.exist;
    })

    it("does nothing if trying to remove a model that does not contained in the collection", function(){
      let removeSpy = sinon.spy(collection, "remove");
      collection.remove(model);
      expect(removeSpy).not.have.thrown();
    })

    it("triggers a 'remove' event", function(){
      let spy = sinon.spy();
      collection.on("remove", spy);
      collection.add(model);
      collection.remove(model);
      expect(spy).to.have.been.calledWith(model);
    })
  })

  describe("#length", function(){
    it("returns 0 if no models have been added to the collection", function(){
      expect(collection.length).to.equal(0);
    })

    it("returns the number of models in the collection", function(){
      collection.add(model);
      collection.add(model);
      expect(collection.length).to.equal(2);
    })
  })

  describe("iterator", function(){
    it("iterates over object", function(){
      let model2 = new Model({a: 2});
      collection.add(model);
      collection.add(model2);
      let iterator = collection[Symbol.iterator]();
      expect(iterator.next().value).to.equal(model);
      expect(iterator.next().value).to.equal(model2);
    })
  })
})