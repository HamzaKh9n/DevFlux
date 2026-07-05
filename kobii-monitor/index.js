let config = require('./config')
let sender = require('./sender')
let expressMiddleware = require('./express')

function init(options) {
    config.setConfig(options);
    sender.sendData({ message: "Monitor initialized" });
    console.log("Connected to:", config.getConfig().server);
}

module.exports = {
    init,
    express: expressMiddleware.express
};