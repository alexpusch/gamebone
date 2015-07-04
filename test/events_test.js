import * as chai from "chai"
import * as sinon from "imports?define=>false&require=>false!sinon/pkg/sinon"
import sinonChai from "sinon-chai"

import Events, { mixinEvents } from "../src/events"

let expect = chai.expect;

describe('Events', function() {
  let events, callback;

  beforeEach(function() {
    events = new Events();
    callback = sinon.spy();
  });

  describe('trigger', function() {
    it("activates subscribed callbacks", function() {
      events.on('name', callback);
      events.trigger('name');
      expect(callback).to.have.been.called;
    });

    it('calls the callback with the given arguments', function() {
      events.on('name', callback);
      events.trigger('name', 'arg');
      expect(callback).to.have.been.calledWith('arg');
    });

    it('does not call the callback if it was removed', function() {
      events.on('name', callback);
      events.off('name', callback);
      events.trigger('name');
      expect(callback).not.to.have.been.called;
    });

    it('works fine if no callback was registerd', function() {
      let triggerSpy = sinon.spy(events, "trigger");
      events.trigger('empty');
      expect(triggerSpy).not.have.thrown();
    });
  });

  describe('resetEvents', function() {
    it('clears all events', function() {
      events.on('name', callback);
      events.resetEvents();
      events.trigger('name');
      expect(callback).not.to.have.been.called;
    });
  });
});

describe('mixinEvents', function(){
  let Target, target;

  beforeEach(function(){
    class Target{}
    mixinEvents(Target);
    target = new Target();
  })

  it("adds events methods to a given object", function(){
    expect(target.on).to.exist;
    expect(target.off).to.exist;
    expect(target.trigger).to.exist;
    expect(target.resetEvents).to.exist;
  })

  it("still works", function(){
    let callback = sinon.spy();
    target.on('name', callback);
    target.trigger('name');
    expect(callback).to.have.been.called;    
  })
})
