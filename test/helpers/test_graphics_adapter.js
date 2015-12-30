import * as sinon from "imports?define=>false&require=>false!sinon/pkg/sinon"

let TestGraphicsAdapeter = {
  createContainer(){
    return {
      addChild: sinon.spy(),
      removeChild: sinon.spy(),
      destroy: sinon.spy()
    }
  },

  createStage: sinon.spy(),

  render: sinon.spy()

}

export default TestGraphicsAdapeter;