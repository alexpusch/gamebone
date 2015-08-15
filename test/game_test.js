import * as chai from "chai"
import * as sinon from "imports?define=>false&require=>false!sinon/pkg/sinon"
import sinonChai from "sinon-chai"

import { useFakeRaf } from "./helpers/fake_raf"

import Game from "../src/game"

let expect = chai.expect
chai.use(sinonChai);

describe("Game", () => {
  let game;

  beforeEach(()=>{
    useFakeRaf();
    
    game = new Game();
    game.frame = sinon.spy();
  })

  describe("#start", () => {
    it("calls #frame on each requestAnimationFrame invocation", () => {
      game.start();
      requestAnimationFrame.invoke()
      expect(game.frame).to.have.been.called;
    })
  })
});