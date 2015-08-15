import * as chai from "chai"
import * as sinon from "imports?define=>false&require=>false!sinon/pkg/sinon"
import sinonChai from "sinon-chai"

import RequestResponse from "../src/request_response"

let expect = chai.expect;

describe("RequestResponse", function(){
  let channel;

  beforeEach(function(){
    channel = new RequestResponse();
  });

  describe("request", function(){
    
    it("returns the value set using setHandler ", function(){
      channel.setHandler("some:request", function(){
        return "value";
      })

      let value = channel.request("some:request");
      expect(value).to.equal("value");
    });

    it("can pass arguments to the handler set", function(){
      channel.setHandler("some:request", function(arg1, arg2){
        return `${arg1} ${arg2}`;
      })

      let value = channel.request("some:request", "this", "works");
      expect(value).to.equal("this works");
    });
  })

  describe("setHandler", function(){
    it("does not allow setting a handler more than one", function(){
      let test = function(){
        channel.setHandler("some:handler", function(){});
        channel.setHandler("some:handler", function(){});
      }
      expect(test).to.throw();
    })
  })
})