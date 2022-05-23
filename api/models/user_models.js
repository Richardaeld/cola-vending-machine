const db = require('../db_config');

module.exports = {
    addAdmin,
    findUserByName
};

// ---------------------User Auth
// Post (create) Admin
async function addAdmin (user) {
    return await db('users').insert(user, ['username']);
}

// Gets one user by username
function findUserByName (username) {
    return db('users').where({ username }).first();
}

// Gets all users
// Gets all admins
// Patch user to admin


