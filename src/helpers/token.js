const dotenv = require('dotenv');
dotenv.config();

const jwt = require('jsonwebtoken');
const util = require('util');

const jwtCreate = util.promisify(jwt.sign);
const jwtVerify = util.promisify(jwt.verify);

const createToken = (obj) => {
    return jwtCreate(obj, process.env.JWT_SECRET);
};

const verifyToken = (token) => {
    return jwtVerify(token, process.env.JWT_SECRET);
};

module.exports = {
    createToken,
    verifyToken,
}