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
})