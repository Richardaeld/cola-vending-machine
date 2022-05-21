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
// Restocker Get All Cola (without description)


module.exports = router;