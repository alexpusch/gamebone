import * as chai from 'chai';
import * as sinon from 'imports?define=>false&require=>false!sinon/pkg/sinon';
import sinonChai from 'sinon-chai';

import Controls from '../src/controls';

let expect = chai.expect;

function dispatchEvent(keyCode, type)
{
  var eventObj = document.createEventObject ?
      document.createEventObject() : document.createEvent('Events');

  if (eventObj.initEvent) {
    eventObj.initEvent(type, true, true);
  }

  eventObj.keyCode = keyCode;
  eventObj.which = keyCode;

  document.dispatchEvent ? document.dispatchEvent(eventObj) : document.fireEvent('onkeydown', eventObj);

}

describe('Controls', function() {
  describe('keyboard', function() {
    let controls, upSpy, downSpy;

    beforeEach(function() {
      upSpy = sinon.spy();
      downSpy = sinon.spy();

      let canvas = document.createElement('canvas');
      controls = new Controls({ canvas });
      controls.keyboard({
        a: {
          up: upSpy,
          down: downSpy,
        },
      });
    });

    it('binds a key down event to down', function() {
      dispatchEvent(65, 'keydown');
      expect(downSpy).to.have.been.called;
    });

    it('binds a key up event to down', function() {
      dispatchEvent(65, 'keyup');
      expect(upSpy).to.have.been.called;
    });

    it('can bind the space key', function() {
      controls.keyboard({
        space: {
          up: upSpy,
          down: downSpy,
        },
      });
      dispatchEvent(20, 'keydown');
      expect(downSpy).to.have.been.called;
    });

    it('can bind the left arrow key', function() {
      controls.keyboard({
        left: {
          up: upSpy,
          down: downSpy,
        },
      });
      dispatchEvent(37, 'keydown');
      expect(downSpy).to.have.been.called;
    });

    xit('binds keys with modifiers', function() {});
  });
});
