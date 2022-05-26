const db = require('../db_config');

module.exports = {
    postUser,
    findUserByName,
    findUserPurchases,
    updatePurchases,
    findAllUsers,
    findAllAdmin,
    findAllAdminAndUsers
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

function findUserPurchases (id) {
    return db('users')
        .where({ id })
        .first();
}

function updatePurchases (id, changes) {
    return db('users')
        .where({ id })
        .update({ "purchases": JSON.stringify(changes) })
        .then(() => {
            return findUserPurchases(id);
        });
}

// Gets all users
function findAllUsers () {
    return db('users')
    .where({ is_admin: false })
    .select('id', 'username');
}
// Gets all admins
function findAllAdmin () {
    return db('users')
    .where({ is_admin: true })
    .select('id', 'username');
}

// get all user and admin
function findAllAdminAndUsers () {
    return db('users')
    .select('id', 'username', 'is_admin');

}

// Patch user to admin


