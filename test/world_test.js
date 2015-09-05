import * as p2 from "p2/build/p2"

import * as chai from "chai"
import * as sinon from "imports?define=>false&require=>false!sinon/pkg/sinon"
import sinonChai from "sinon-chai"

import World from "../src/world"
import Collection from "../src/collection"
import Model from "../src/model"

let expect = chai.expect;

describe("World", function () {
  let world, model, body, stub;
  
  beforeEach(function () {
    world = new World();
    model = new Model();
    body = {};
    stub = sinon.stub().returns(body);
    model.createBody = stub;    
  });

  describe('#add', function () {  
    beforeEach(function () {
      world.add(model);
    });

    it("creates the models body using the model.createBody mothod", function () {
      expect(stub).to.have.been.called;
    }); 

    it("sets the body of the model", function () {
      expect(model.body).to.equal(body);
    });

    it("mixin physical properties into the model", function () {
      let descriptor = Object.getOwnPropertyDescriptor(model.__proto__, "x");
      expect(descriptor).to.exist;
    });

    xit("adds the models body to the world", function () {
      
    });
  });

  describe("#addCollection", function () {
    xit("adds all the models in the collection to the world", function (done) {
      
    });

    xit("adds each model added to the collection to the world", function () {
      
    });

    xit("removes each model removed from the collection from the world", function (done) {
      
    });
  });

  describe("#step", function () {
    let dt = 1, p2World;

    beforeEach(function () {
      model.preStep = sinon.spy();
      model.postStep = sinon.spy();
      
      p2World = {
        step: sinon.spy(),
        addBody: sinon.spy()
      }

      world.world = p2World;

      world.add(model);
      
      world.step(dt);
    });

    it("calls each of the worlds models preStep function", function () {
      expect(model.preStep).to.have.been.calledWith(dt);
    });

    it("calls each of the worlds models postStep function", function () {
      expect(model.postStep).to.have.been.calledWith(dt);
    });

    it("calls p2 world step", function(){
      expect(p2World.step).to.have.been.calledWith(dt);
    })

    it("calls preStep, step, postStep in the correct order", function(){
      expect(model.preStep).to.have.been.calledBefore(p2World.step);
      expect(p2World.step).to.have.been.calledBefore(model.postStep);
    })
  });

  describe("#onCollision", function () {
    it("calls the handler when a collision is detected between the given model types", function () {
      class TestModelA extends Model{
        createBody(){
          let body = new p2.Body({
            mass: 1,
            damping: 0
          });

          let shape = new p2.Box({
            width: 100,
            height: 100
          })

          body.addShape(shape);

          return body;
        }
      }

      class TestModelB extends Model{
        createBody(){
          let body = new p2.Body({
            mass: 1,
            damping: 0
          });

          let shape = new p2.Box({
            width: 100,
            height: 100
          })

          body.addShape(shape);

          return body;
        }
      }

      let p2World = new p2.World({gravity: [0, 0]});

      world = new World({ world: p2World });

      let modelA = new TestModelA({x: 0, y: 0});
      let modelB = new TestModelB({x: 200, y: 200});

      let collisionSpy = sinon.spy();

      world.onCollision(TestModelA, TestModelB, collisionSpy);

      world.add(modelA);
      world.add(modelB);

      world.step(1);

      expect(collisionSpy).not.to.have.been.called;

      modelA.x = 150;
      modelA.y = 150;
      world.step(1);

      expect(collisionSpy).to.have.been.calledWith(modelA, modelB);
    });
  });
});
