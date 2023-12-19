require('dotenv').config();

const Server = require('./serverConstructor/server');

const server = new Server();

server.listen();