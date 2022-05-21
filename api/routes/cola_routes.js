const express = require('express');
const db = require('../models/cola_models');

const router = express.Router();

// ---------------------Cola
// Post Cola(s)
router.post('/add', (req, res) => {
    db.addCola(req.body)
        .then((cola) => {
            if (cola) {
                res.status(200).json({
                    message: `${cola.length} cola(s) have been added and they are:`,
                    cola
                });
            } else {
                res.status(404).json({ message: 'Record was not inserted' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: `An error has occured: ${error}` });
        });
});


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

// Restocker Get All Cola (without description)
// Get Single Cola
// Patch 'name' of Single Cola
// Patch 'amount' of Single Cola
// Patch 'max_amount' of Single Cola
// Patch 'price' of Single Cola
// Patch 'description' of Single Cola
// Put (update) entire Single Cola

module.exports = router;