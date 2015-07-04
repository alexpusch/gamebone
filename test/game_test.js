import * as chai from "chai"
import * as sinon from "imports?define=>false&require=>false!sinon/pkg/sinon"
import sinonChai from "sinon-chai"

import { useFakeRaf } from "./helpers/fake_raf"

import Game from "../src/game"

let expect = chai.expect
chai.use(sinonChai);

describe("Game", () => {
  let TestGame, testGame;

  beforeEach(()=>{
    useFakeRaf();

    class TestGame extends Game{}

    TestGame.prototype.frame = sinon.spy();

    testGame = new TestGame();
    testGame.frame = sinon.spy();
  })

  describe("#start", () => {
    it("calls #frame on each requestAnimationFrame invocation", () => {
      testGame.start();
      requestAnimationFrame.invoke()
      expect(testGame.frame).to.have.been.called;
    })
  })
});