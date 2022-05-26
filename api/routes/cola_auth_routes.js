const express = require('express');
const db = require('../models/cola_models');

const router = express.Router();

// ---------------------Cola Auth
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

// Update Cola
router.patch('/patch/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    console.log(id)
    console.log(changes)

    db.updateCola(id, changes)
    .then((cola) => {
        console.log(cola)
        if(cola) {
            res.status(200).json({
                message: 'The updated cola:',
                cola
            });
        } else {
            res.status(404).json({ message: 'Record not found' })
        }
    })
    .catch((error) => {
        res.status(404).json({ message: `An error occured: ${error}` })
    })
})


module.exports = router;