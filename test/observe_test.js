import * as chai from "chai"
import * as sinon from "imports?define=>false&require=>false!sinon/pkg/sinon"
import sinonChai from "sinon-chai"

import { observe, mixinObserve } from "../src/observe"

let expect = chai.expect;

describe("#observe", function(){
  let model, spy;

  beforeEach(function(){
    model = {};
    spy = sinon.spy();
  })

  it("trigger the callback when the attribute is changed", function(){
    observe(model, "x", spy);
    model.x = 10;
    expect(spy).to.have.been.calledWith(10);
  });

  it("can observe the same attribute several times", function(){
    let spy2 = sinon.spy();
    observe(model, "x", spy);
    observe(model, "x", spy2);

    model.x = 10;
    expect(spy).to.have.been.calledWith(10);
    expect(spy2).to.have.been.calledWith(10);
  })

  it("preserves the value of the attribute, if defiend", function(){
    model.x = 20;
    observe(model, "x", spy);
    expect(model.x).to.equal(20);
  })

  it("presevers the getter and setter that where defined", function(){
    Object.defineProperty(model, "x", {
      enumerable: true,
      configurable: true,
      get: function(){
        return this.__x;
      },
      set: function(value){
        this.__x = value;
      }
    });

    observe(model, "x", spy);
    model.x = 20;
    expect(spy).to.have.been.called;
    expect(model.__x).to.equal(20);
  })

  xit("can observe multiple keys", function(){});

  describe("#mixinObserve", function(){
    it("adds observe method to the target object", function(){
      class Model{}
      mixinObserve(Model);
      model = new Model();

      model.observe("x", spy);
      model.x = 10;
      expect(spy).to.have.been.calledWith(10);
    })
  })
})
  