let config = {
    server: null,
    apiKey: null,
};

function setConfig(newConfig) {
    config = {
        ...config,
        ...newConfig,
    };
}

function getConfig() {
    return config;
}

module.exports = {
    setConfig,
    getConfig,
};