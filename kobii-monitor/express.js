const sender = require("./sender");

function express() {
    return function (req, res, next) {

        // Remember when the request started
        const startTime = Date.now();

        // Store the request information we already know
        const log = {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            timestamp: new Date().toISOString(),
        };

        // Wait until Express has finished sending the response
        res.on("finish", () => {

            // Now we know the final status code
            log.status = res.statusCode;

            // Calculate how long the request took
            log.duration = Date.now() - startTime;

            // Send everything to your monitoring backend
            sender.sendData(log);
        });

        // Continue to the next middleware/route
        next();
    };
}

module.exports = {
    express,
};