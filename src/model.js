import Base from "./base";

import { mixinObserve } from "observerkit";

import _ from "lodash"

export default class Model extends Base{
  constructor(attributes = {}){
    super();
    _.extend(this, attributes);
  }
}

mixinObserve(Model.prototype);