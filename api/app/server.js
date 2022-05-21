const express = require('express');

// Routes
const cola_routes = require('../routes/cola_routes');
const cola_auth_routes = require('../routes/cola_auth_routes')
const restricted = require('../auth/restrictedMiddleware');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({message : "Welcome to ColaCo Vending Machine's API!"});
})

// Server Route Exports
server.use('/cola', cola_routes);
server.use('/cola/auth', restricted, cola_auth_routes);

module.exports = server;