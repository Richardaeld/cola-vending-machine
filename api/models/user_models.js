const db = require('../dbConfig');

module.exports = {
    addAdmin,
    logUserIn
};

// ---------------------User Auth
// Post (create) Admin
async function addAdmin (user) {
    return await db('users').insert(user, ['name']);
}

// Gets one user by username
function findUserByName (name) {
    return db('users').where({ name }).first();
}

// Gets all users
// Gets all admins
// Patch user to admin


