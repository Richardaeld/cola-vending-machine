const jwt = require('jsonwebtoken');

module.exports = user => {
    // Requires => payload, secret, options
    const payload = {
        id: user.id,
        username:user.username,
        admin:user.is_admin
    };

    const secret = process.env.SECRET;

    const options = {
        expiresIn: '1h'
    };

    // Returns token
    return jwt.sign(payload, secret, options);
};