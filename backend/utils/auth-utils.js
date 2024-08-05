const bcrypt = require('bcrypt');

const hashPassword = async (password, saltRounds = 8) => bcrypt
    .hash(password, saltRounds)
    .catch((err) => console.log(err.message));

const isValidPassword = async (password, hash) => bcrypt
    .compare(password, hash)
    .catch((err) => console.error(err.message));

const isAuthorized = (userId, session) => {
    if (!userId || !session || !session.userId) return false;
    return Number(userId) === Number(session.userId);
};


module.exports = {
    hashPassword,
    isValidPassword,
    isAuthorized,
};