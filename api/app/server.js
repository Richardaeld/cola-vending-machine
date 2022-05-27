const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// Routes
const cola_routes = require('../routes/cola_routes');
const cola_auth_routes = require('../routes/cola_admin_routes');
const auth_routes = require('../auth/auth_routes');
const auth_user = require('../routes/user_auth_routes');
const admin_user = require('../routes/user_admin_routes');
const restricted = require('../auth/restricted_middleware');
const admin_restricted = require('../auth/restricted_admin_middleware');

const server = express();
server.use(helmet());
server.use(cors());
server.use(logger('dev'));
server.use(express.json());

server.get('/', (req, res) => {
    res.json({message : "Welcome to ColaCo Vending Machine's API!"});
})

// Server Route Exports
server.use('/cola', cola_routes);
server.use('/user', auth_routes);
server.use('/auth/user', restricted, auth_user);
server.use('/admin/cola', admin_restricted, cola_auth_routes);
server.use('/admin/user', admin_restricted, admin_user);

module.exports = server;