const express = require('express');
const dbUser = require('../models/user_models');
const dbCola = require('../models/cola_models');

const router = express.Router();

// ---------------------User Admin Auth
router.get('/getAll/user', (req, res) => {
    dbUser.findAllUsers()
        .then((users) => {
            res.status(200).json({ users });
        })
        .catch((error) => {
            res.status(500).json({ message: `An error has occured: ${error}` })
        });
});

router.get('/getAll/admin', (req, res) => {
    dbUser.findAllAdmin()
        .then((users) => {
            res.status(200).json({ users });
        })
        .catch((error) => {
            res.status(500).json({ message: `An error has occured: ${error}` })
        });
});

router.get('/getAll/adminAndUser', (req, res) => {
    dbUser.findAllAdminAndUsers()
        .then((users) => {
            res.status(200).json({ users });
        })
        .catch((error) => {
            res.status(500).json({ message: `An error has occured: ${error}` })
        });
});

// ---------------------Auth
// Change user is_admin status
router.patch('/patch/is_admin/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const change = changes.is_admin

    if (!(change === false || change === true)) {
        return res.status(400).json({ message: 'Please true or false' });
    }

    dbUser.updateUserIsAdmin(id, change)
        .then((user) => {
            if(user) {
                res.status(200).json({
                    message: 'The updated user:',
                    user
                });
            } else {
                res.status(404).json({ message: 'Record not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: `An error occured: ${error}` });
        });
});

// Delete User
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    dbUser.deleteUser(id)
        .then((user) => {
            if (user > 0) {
                res.status(200).json({ message: `User with id ${id} has been removed` });
            } else {
                res.status(404).json({ message: 'No user with that id exists' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: `An error occured: ${error}` });
        });
});


module.exports = router;
