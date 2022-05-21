const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({message : "Welcome to ColaCo Vending Machine's API!"});
})

module.exports = server;