const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// Routes
const cola_routes = require('../routes/cola_routes');
const cola_admin_routes = require('../routes/cola_admin_routes');
const auth_routes = require('../auth/auth_routes');
const restrict_user_routes = require('../routes/user_restrict_routes');
const admin_user_routes = require('../routes/user_admin_routes');
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
server.use('/user/auth', auth_routes);
server.use('/restrict/user', restricted, restrict_user_routes);
server.use('/admin/cola', admin_restricted, cola_admin_routes);
server.use('/admin/user', admin_restricted, admin_user_routes);

module.exports = server;