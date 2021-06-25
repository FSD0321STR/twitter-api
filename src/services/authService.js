const UserService = require('./UserService');
const { comparePasswords } = require('../helpers/password');

const register = async ({ email, password }) => {
    let user = await UserService.findByEmail(email);
    if (user) {
        return false;
    }
    user = await UserService.create({ email, password });
    return user;
}

const login = async ({ email, password }) => {

    const user = await UserService.findByEmail(email);
    if (user) {
        const equalPasswords = await comparePasswords({
            plain: password,
            hash: user.password,
        });
        if (equalPasswords) {
            return user;
        }
    }
    return false;
}

module.exports = {
    register,
    login,
}

