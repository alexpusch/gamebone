import { setGraphicsAdapter } from "../src/graphics_adapters"
import TestGraphicsAdapeter from "./helpers/test_graphics_adapter"
setGraphicsAdapter(TestGraphicsAdapeter);

before(function(done){
  setTimeout(done, 200);
});

import {} from "./events_test"
import {} from "./game_test"
import {} from "./view_test"
import {} from "./collection_test"
import {} from "./model_test"
import {} from "./collection_view_test"
import {} from "./controls_test"
import {} from "./observe_test"
import {} from "./request_response_test"
import {} from "./mixin_test"
import {} from "./phyisics_mixin_test"
import {} from "./world_test"
