const db = require('../db_config');

module.exports = {
    postUser,
    findUserByName
};

// ---------------------User Auth
// Post (create) Admin
async function postUser (user) {
    return await db('users').insert(user, ['username']);
}

// Gets one user by username
function findUserByName (username) {
    return db('users').where({ username }).first();
}

// Gets all users
// Gets all admins
// Patch user to admin


