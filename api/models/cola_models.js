const db = require('../db_config');

module.exports = {
    viewAllCola,
    viewSingleCola,
    viewAllColaRestock,
    addCola,
    updateCola,
    removeSingleCola,
    viewSingleCola,
    deleteCola
};

// ---------------------Cola
// Get All Cola (with description)
function viewAllCola () {
    return db('cola');
}

// Get Single Cola
function viewSingleCola (id) {
    return db('cola')
        .where({ id })
        .first();
}

// Get Single Cola
// function viewSingleCola (id) {
//     return db('cola')
//         .where({ id })
//         .first()
//         .select('name', 'amount');
// }

// ---------------------Cola Auth
// Restocker Get All Cola (without description)
function viewAllColaRestock () {
    return db('cola')
        .select('id', 'name', 'amount', 'max_amount', 'price');
}

// Post Cola(s)
async function addCola (cola) {
    return await db('cola').insert(cola, ['id', 'name', 'price', 'amount', 'max_amount', 'description']);
}

// Update cola by its Id
function updateCola (id, changes) {
    return db('cola')
        .where({ id })
        .update( changes )
        .then(() => {
            return viewSingleCola (id);
        });
}

// Delete Cola
function deleteCola (id) {
    return db('cola')
        .where({ id })
        .del();
}

// Remove single cola from id
function removeSingleCola (id, change) {
    return db('cola')
        .where({ id })
        .update({ "amount": change })
        .then(() => {
            return viewSingleCola (id);
        });
}

