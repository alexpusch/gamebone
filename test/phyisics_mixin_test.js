import * as chai from 'chai';
import * as sinon from 'imports?define=>false&require=>false!sinon/pkg/sinon';
import sinonChai from 'sinon-chai';
import * as p2 from 'p2/build/p2';

import Model from '../src/model';
import mixinP2Phyisics from '../src/phyisics_mixin';

let expect = chai.expect;

describe('mixinP2Phyisics', function() {
  let TestType = undefined, testTarget;

  beforeEach(function() {
    class TestType extends Model{
      createBody() {
        let body = new p2.Body({
          mass: 1,
        });

        let shape = new p2.Box({ width: 1, height: 2 });
        body.addShape(shape);

        this.body = body;

        return body;
      }
    }

    testTarget = new TestType();
    testTarget.createBody();
    mixinP2Phyisics(testTarget);
  });

  it('should link the x property to the models body', function() {
    testTarget.x = 10;
    expect(testTarget.body.position[0]).to.equal(10);
  });

  it('should link the y property to the models body', function() {
    testTarget.y = 10;
    expect(testTarget.body.position[1]).to.equal(10);
  });

  it('should link the velocity property to the models body', function() {
    testTarget.velocity[0] = 10;
    expect(testTarget.body.velocity[0]).to.equal(10);
  });

  it('should link the angularVelocity property to the models body', function() {
    testTarget.angularVelocity = 10;
    expect(testTarget.body.angularVelocity).to.equal(10);
  });

  it('should link the angle property to the models body', function() {
    testTarget.angle = 10;
    expect(testTarget.body.angle).to.equal(10);
  });
});

