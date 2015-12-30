import * as chai from "chai"
import * as sinon from "imports?define=>false&require=>false!sinon/pkg/sinon.js"
import sinonChai from "sinon-chai"

import ScreenManager from "../src/screen_manager"

let expect = chai.expect;

describe('ScreenManager', function () {
  let screen1, screen2, screenManager;

  beforeEach(function () {
    screen1 = {
      start: sinon.spy(),
      destroy: sinon.spy()
    };

    screen2 = {
      start: sinon.spy(),
      destroy: sinon.spy()
    }
      
    screenManager = new ScreenManager();
  });

  describe('#add', function () {
    it('does not call screen start', function () {
      screenManager.add({ screen1: screen1 });

      expect(screen1.start).not.to.have.been.called;
    });
  })

  describe('#goto', function () {
    it('calls the start method of screen object', function () {
      screenManager.add({ screen1: screen1 });
      screenManager.goto("screen1");

      expect(screen1.start).to.have.been.called;
    });

    it('calls the destroy method of screen, if replaced', function () {
      screenManager.add({ screen1: screen1, screen2: screen2 });
      screenManager.goto("screen1");
      screenManager.goto("screen2");

      expect(screen1.destroy).to.have.been.called;
    });
  });
});