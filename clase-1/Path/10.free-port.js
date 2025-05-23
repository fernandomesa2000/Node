const net = require('node:net'); // HTTP protocol

function findAvailablePort(desiredPort) {
    return new Promise(function (resolve, reject) {
        const server = net.createServer();

        server.listen(desiredPort, () => {
            const { port } = server.address();
            server.close(() => {
                resolve(port)
            });
        })
        server.on('error', () => {
            if (err.code === 'EADDRINUSE') {
                findAvailablePort(0).then(port => resolve(port))
            } else {
                reject(err);
            }
        });
    })
}

module.exports = { findAvailablePort };