const db = require('../db_config');

module.exports = {
    findUserByName,
    // findUserPurchases,
    // updatePurchases,
    findAllUsers,
    findAllAdmin,
    findAllAdminAndUsers,
    postUser,
    updateUserName,
    updateUserPassword,
    updateUserIsAdmin,
    deleteUser
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

// ---------------------Auth

// Update user name
function updateUserName (username, change) {
    return db('users')
        .where({ username })
        .update({ username: change })
        .then(() => {
            return findUserByName (username);
        });
}

// Update user password
function updateUserPassword (username, change) {
    return db('users')
        .where({ username })
        .update({ password: change })
        .then(() => {
            return findUserByName (username);
        });
}

// Update user admin status
function updateUserIsAdmin (username, change) {
    return db('users')
        .where({ username })
        .update({ is_admin: change })
        .then(() => {
            return findUserByName (username);
        });
}

// Delete user
function deleteUser (id) {
    return db('users')
        .where({ id })
        .del()
}

// ---------------------create purchase history in json string
// Scalability
// function findUserPurchases (id) {
//     return db('users')
//         .where({ id })
//         .first();
// }

// function updatePurchases (id, changes) {
//     return db('users')
//         .where({ id })
//         .update({ "purchases": JSON.stringify(changes) })
//         .then(() => {
//             return findUserPurchases(id);
//         });
// }
