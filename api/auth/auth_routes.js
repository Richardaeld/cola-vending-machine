const express = require('express');
const router = express.Router();

const db = require('../models/user_models');
const bcrypt = require('bcryptjs');
const generate_token = require('./create_web_token');

// ---------------------Auth users
// Create one admin
router.post('/addAdmin', (req, res) => {
    const credentials = req.body;
    const {username, password, admin_secret} = credentials;
    credentials['is_admin'] = false;

    if (!(username && password)) {
        return res.status(400).json({ message: 'Please enter both username and password!' });
    }

    if (admin_secret === process.env.ADMIN_SECRET) {
        credentials['is_admin'] = true;
    }

    delete credentials.admin_secret;
    const hash = bcrypt.hashSync(credentials.password, 12);
    credentials.password = hash;

    db.addAdmin(credentials)
        .then((user) => {
            if (credentials.is_admin) {
                res.status(200).json({ message: `welcome to the ColaCo family ${user}!` });

            } else {
                res.status(200).json({ message: `welcome ${user}!` });
            }
        })
        .catch((error) => {
            if (error.errno == 2067) {
                res.status(400).json({ message: `Username:(${username}) is already taken` });
            } else {
                res.status(500).json({ message: `An error occured!` });
            }
        });
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if(!(username && password)) {
        return res.status(400).json({ message: 'Please enter both name and password' });
    }

    db.findUserByName(username)
        .then((user) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generate_token(user);

                if (user.is_admin){
                    res.status(200).json({ message: `Welcome admin ${user.username}!`, token });
                } else {
                    res.status(200).json({ message: `Welcome ${user.username}!`, token });
                }

            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: `An error occured!` });
        });
});

module.exports = router;