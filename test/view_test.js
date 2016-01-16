import * as chai from 'chai';
import View from '../src/view';

import * as sinon from 'imports?define=>false&require=>false!sinon/pkg/sinon';
import sinonChai from 'sinon-chai';

let expect = chai.expect;

describe('View', () => {
  describe('#destroy', function() {
    it('should trigger the destroy event', function() {
      let destroyListener = sinon.spy();
      let view = new View();

      view.on('destroy', destroyListener);
      view.destroy();

      expect(destroyListener).to.have.been.called;
    });
  });
});
