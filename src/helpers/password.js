const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const encryptPassword = (password) => {
    return bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
};

const comparePasswords = ({ hash, plain }) => {
    return bcrypt.compare(plain, hash);
};

module.exports = {
    encryptPassword,
    comparePasswords,
}