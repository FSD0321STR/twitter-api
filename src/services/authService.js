const UserService = require('./userService');
const { comparePasswords } = require('../helpers/password');

const register = async ({ email, password, firstName, lastName, username, birthDate }) => {
    let user = await UserService.findByEmail(email);
    if (user) {
        return false;
    }
    user = await UserService.create({ email, password, firstName, lastName, username, birthDate });
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

