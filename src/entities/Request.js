const { Requester } = require('./Requester');

class Request {
    constructor() {
        this.id = undefined;
        this.requester = undefined;
        this.type = undefined;
        this.expirationDate = undefined;
    }
}

module.exports = { Request };