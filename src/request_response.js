export default class RequestResponse {
  constructor() {
    this.directory = {};
  }

  setHandler(requestName, handler) {
    if (this.directory[requestName])
      throw new Error(`A request handler for ${requestName} have already been set`);

    this.directory[requestName] = handler;
  }

  request(requestName, ...args) {
    return this.directory[requestName].apply(this, args);
  }
}
