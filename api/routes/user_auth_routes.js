const express = require('express');
const dbUser = require('../models/user_models');
const dbCola = require('../models/cola_models');

const router = express.Router();

// Change user name
router.patch('/patch/name/:id', (req, res) => {
    const { id } = req.params;
    const { change } = req.body;

    if (change === "") {
        return res.status(400).json({ message: 'Please enter a new username' });
    }

    db.updateUserName(id, change)
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
            res.status(404).json({ message: `An error occured: ${error}` });
        });
});

// change user password
router.patch('/patch/password/:id', (req, res) => {
    const { id } = req.params;
    const { change } = req.body;

    if (change === "") {
        return res.status(400).json({ message: 'Please enter a new password' });
    }

    const hash = bcrypt.hashSync(change.password, 12);
    change = hash;

    db.updateUserName(id, change)
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
            res.status(404).json({ message: `An error occured: ${error}` });
        });
});

// ---------------------User Auth
// Remove one cola at a time
router.post('/buyCola/:id', (req, res) => {
    const { id } = req.params;
    var colaAmount = undefined;

    dbCola.viewSingleCola(id)
        .then((cola) => {
            colaAmount = cola.amount;
            if (typeof(colaAmount) !== undefined && colaAmount >= 1) {
                colaAmount--;
                dbCola.removeSingleCola(id, colaAmount)
                    .then((cola) => {
                        res.status(200).json({ message: `You take a cola and ${cola.amount} are left` });
                    })
                    .catch((error) => {
                        res.status(500).json({ message: `An error has occured: ${error}` });

                    })

            } else {
                res.status(404).json({ message: `The cola ${cola.name} is out of stock` });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: `An error has occured: ${error}` });
        })

    colaAmount = colaAmount - 1;

})

module.exports = router;