import * as chai from "chai"
import * as sinon from "imports?define=>false&require=>false!sinon/pkg/sinon"
import sinonChai from "sinon-chai"

import Model from "../src/model"

let expect = chai.expect;

describe("Model", function(){
  let model, spy;

  beforeEach(function(){
    spy = sinon.spy();
    model = new Model();
  });

  describe("#constructor", function(){
    it("defines the attributes recived on the instace", function(){
      let model = new Model({
        a: 1,
        b: 2
      });

      expect(model.a).to.equal(1);
      expect(model.b).to.equal(2);
    })
  })

  describe("#observe", function(){
    it("trigger the callback when the attribute is changed", function(){
      model.observe("x", spy);
      model.x = 10;
      expect(spy).to.have.been.calledWith(10);
    });

    it("can observe the same attribute several times", function(){
      let spy2 = sinon.spy();
      model.observe("x", spy);
      model.observe("x", spy2);

      model.x = 10;
      expect(spy).to.have.been.calledWith(10);
      expect(spy2).to.have.been.calledWith(10);
    })

    it("preserves the value of the attribute, if defiend", function(){
      model.x = 20;
      model.observe("x");
      expect(model.x).to.equal(20);
    })

    it("triggers a change event on the model", function(){
      let changeSpy = sinon.spy();
      model.on("change", changeSpy);
      model.observe("x", spy);

      model.x = 10;

      expect(changeSpy).to.have.been.called;
    })

    it("if no callback is passed everything is ok", function(){
      model.observe("x");
      expect(model.directory).to.be.undefined; // no events have beed defined

      model.on("change", spy);
      model.x = 10

      expect(spy).to.have.been.called;
    })
  })
})