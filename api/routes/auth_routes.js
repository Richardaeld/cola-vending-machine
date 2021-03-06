const express = require('express');
const router = express.Router();

const db = require('../models/user_models');
const bcrypt = require('bcryptjs');
const generate_token = require('../auth/create_web_token');

// ---------------------Auth users
// Create one admin
router.post('/register', (req, res) => {
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

    db.postUser(credentials)
        .then((user) => {
            if (credentials.is_admin) {
                res.status(200).json({ message: `welcome to the ColaCo family ${username}!` });

            } else {
                res.status(200).json({ message: `welcome ${username}!` });
            }
        })
        .catch((error) => {

            if (process.env.DB_ENVIRONMENT == 'development') {
                if (error.errno == 19) {
                    res.status(400).json({ message: `Username:(${username}) is already taken` });
                } else {
                    res.status(500).json({ message: `An error occured!` });
                }
            } else {
                if (error.errno == undefined) {
                    res.status(400).json({ message: `Username:(${username}) is already taken` });
                } else {
                    res.status(500).json({ message: `An error occured! ${error.errno} ${error}` });
                }

            }
        });
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log("I am CREDS", username, "username", password, "password")


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
            res.status(500).json({ message: `An error occured! ${error}` });
        });
});



module.exports = router;