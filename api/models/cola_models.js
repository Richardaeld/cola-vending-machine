const db = require('../db_config');

module.exports = {
addCola,
viewAllCola,
viewSingleCola,
viewAllColaRestock,
updateCola

// Cola Auth
};


// ---------------------Cola Auth
// Post Cola(s)
async function addCola (cola) {
    return await db('cola').insert(cola, ['id', 'name', 'price', 'amount', 'max_amount', 'description']);
}

// Patch 'name' of Single Cola
// Update cola by its Id
function updateCola (id, changes) {
    return db('cola')
        .where({ id })
        .update( changes )
        .then(() => {
            return viewSingleCola (id)
        });
}

// Put (update) entire Single Cola

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

// Restocker Get All Cola (without description)
function viewAllColaRestock () {
    return ('cola')
        .select('id', 'name', 'amount', 'max_amount', 'price');
}

