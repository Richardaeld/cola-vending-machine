const db = require('../db_config');

module.exports = {
addCola,
viewAllCola,
};

// ---------------------Cola
// Post Cola(s)
async function addCola (cola) {
    return await db('cola').insert(cola, ['id', 'name', 'amount', 'max_amount', 'description']);
}

// Get All Cola (with description)
function viewAllCola () {
    return db('cola');
}

// Restocker Get All Cola (without description)
// Get Single Cola
// Patch 'name' of Single Cola
// Patch 'amount' of Single Cola
// Patch 'max_amount' of Single Cola
// Patch 'price' of Single Cola
// Patch 'description' of Single Cola
// Put (update) entire Single Cola
