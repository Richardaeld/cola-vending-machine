const express = require('express');
const dbUser = require('../models/user_models');
const dbCola = require('../models/cola_models');

const router = express.Router();

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