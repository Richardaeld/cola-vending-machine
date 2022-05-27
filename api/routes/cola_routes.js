const express = require('express');
const db = require('../models/cola_models');

const router = express.Router();

// ---------------------Cola
// Get All Cola (with description)
router.get('/getAll', (req, res) => {
    db.viewAllCola()
        .then((cola) => {
            res.status(200).json({ cola });
        })
        .catch((error) => {
            res.status(500).json({ message: `An error has occured: ${error}` });
        });
});

// Get Single Cola
router.get('/getOne/:id', (req, res) => {
    const { id } = req.params;

    db.viewSingleCola(id)
        .then((cola) => {
            if (cola > 0) {
                res.status(200).json({ cola });
            } else {
                res.status(404).json({ message: 'No cola with that id exists' });
            }

        })
        .catch((error) => {
            res.status(500).json({ message: `An error has occured: ${error}` });
        });
});

module.exports = router;