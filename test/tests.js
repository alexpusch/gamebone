import { setGraphicsAdapter } from '../src/graphics_adapters';
import TestGraphicsAdapeter from './helpers/test_graphics_adapter';
setGraphicsAdapter(TestGraphicsAdapeter);

before(function(done) {
  setTimeout(done, 200);
});

let testContext = require.context('.', false, /.+_test\.js/);

testContext.keys().forEach(function(key) {
  testContext(key);
});
