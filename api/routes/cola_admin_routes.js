const express = require('express');
const db = require('../models/cola_models');

const router = express.Router();

// ---------------------Cola Auth
// Restockers View
router.get('/restockerView', (req, res) => {
    db.viewAllColaRestock()
        .then((cola) => {
            res.status(200).json({ cola });
        })
        .catch((error) => {
            res.status(500).json({ message: `An error has occured: ${error}` });
        });
});

// Create Cola(s)
router.post('/addCola', (req, res) => {
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

    db.updateCola(id, changes)
        .then((cola) => {
            if(cola) {
                res.status(200).json({
                    message: 'The updated cola:',
                    cola
                });
            } else {
                res.status(404).json({ message: 'Record not found' });
            }
        })
        .catch((error) => {
            res.status(404).json({ message: `An error occured: ${error}` });
        });
});

// Delete Cola
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    db.deleteCola(id)
        .then((cola) => {
            if (cola > 0) {
                res.status(200).json({ message: `Cola with id ${id} has been removed` });
            } else {
                res.status(404).json({ message: 'No cola with that id exists' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: `An error occured: ${error}` });
        });
});

// Restock machine
// router.patch('/patch/restock/:id', (req, res) => {
//     const { id } = req.params;
//     const changes = req.body;
//     const change = changes.amount;

//     db.viewSingleCola(id)
//         .then((cola) => {
//             if (change <= cola.max_amount) {
//                 db.restockMachine(id, change)
//                     .then((updateCola) => {
//                         res.status(200).json({
//                             message: 'The updated cola:',
//                             updateCola
//                         });
//                     })
//                     .catch((updateError) => {
//                         res.status(500).json({ message: `An error occured: ${updateError}` });
//                     })
//             } else {
//                 res.status(400).json({ message: `You cannot over fill the machine. Max space is: ${cola.max_amount}` });
//             }
//         })
//         .catch((error) => {
//             res.status(500).json({ message: `An error occured: ${error}` });
//         });

// });

module.exports = router;