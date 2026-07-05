let config = require('./config.js')

function sendData(data) {
    const server = config.getConfig().server;

    if (!server) {
        console.error("Server not configured. Please call init() with the server address.");
        return;
    }
    fetch(`http://${server}/logs/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => console.log("Data sent successfully:", result))
        .catch(error => console.error("Error sending data:", error));
}

module.exports = {
    sendData,
};