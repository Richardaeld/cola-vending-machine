const express = require('express');

// Routes
const cola_routes = require('../routes/cola_routes');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({message : "Welcome to ColaCo Vending Machine's API!"});
})

// Server Route Exports
server.use('/cola', cola_routes);

module.exports = server;