import * as chai from "chai"
import * as sinon from "imports?define=>false&require=>false!sinon/pkg/sinon"
import sinonChai from "sinon-chai"

import Controls from "../src/controls"

let expect = chai.expect;

function dispatchEvent(keyCode, type)
{
    var eventObj = document.createEventObject ?
        document.createEventObject() : document.createEvent("Events");
  
    if(eventObj.initEvent){
      eventObj.initEvent(type, true, true);
    }
  
    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;
    
    document.dispatchEvent ? document.dispatchEvent(eventObj) : document.fireEvent("onkeydown", eventObj); 
  
} 

describe("Controls", function(){
  describe("config", function(){
    let controls, upSpy, downSpy;

    beforeEach(function(){
      upSpy = sinon.spy();
      downSpy = sinon.spy();

      controls = new Controls();
      controls.config({
        "moveDown": {
          key: "a",
          "upHandler": upSpy,
          "downHandler": downSpy
        }
      })
    });

    it("binds a key down event to downHandler", function(){
      dispatchEvent(65, "keydown");
      expect(downSpy).to.have.been.called;
    });

    it("binds a key up event to downHandler", function(){
      dispatchEvent(65, "keyup");
      expect(upSpy).to.have.been.called;
    });

    it("can bind the space key", function(){
      controls.config({
        "moveDown": {
          key: "space",
          "upHandler": upSpy,
          "downHandler": downSpy
        }
      });
      dispatchEvent(20, "keydown");
      expect(downSpy).to.have.been.called;
    })

    it("can bind the left arrow key", function(){
      controls.config({
        "moveLeft": {
          key: "left",
          "upHandler": upSpy,
          "downHandler": downSpy
        }
      });
      dispatchEvent(37, "keydown");
      expect(downSpy).to.have.been.called;
    })

    xit("binds multiple keys to an action", function(){});
    xit("binds keys with modifiers", function(){});
  })
})