import * as chai from 'chai';
import * as sinon from 'imports?define=>false&require=>false!sinon/pkg/sinon';
import sinonChai from 'sinon-chai';

import mixin from '../src/mixin';

let expect = chai.expect;

describe('mixin', function() {
  let TestType = null, MixinType = null;

  beforeEach(function() {
    TestType = class Test{
      foo() {
        return 'foo';
      }
    };

    MixinType = {
      bar() {
        return 'bar';
      },

      get x() {
        return 'x';
      },
    };
  });

  it('should add the mixed in properties into the targer', function() {
    let test = new TestType();
    mixin(test, MixinType);

    expect(test.bar).to.exist;
  });

  it('should keep the original properties', function() {
    let test = new TestType();
    mixin(test, MixinType);

    expect(test.foo).to.exist;
  });

  it('should clone getters and setters', function() {
    let test = new TestType();
    mixin(test, MixinType);

    let descriptor = Object.getOwnPropertyDescriptor(test.__proto__, 'x');
    expect(descriptor.get).to.exist;
  });

  it('should not create a new type for each instance', function() {
    let test = new TestType();
    mixin(test, MixinType);

    let test2 = new TestType();
    mixin(test2, MixinType);

    expect(test.__proto__).to.not.equal(TestType);
    expect(test.__proto__).to.equal(test2.__proto__);
  });

});

