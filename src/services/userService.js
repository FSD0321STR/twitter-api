const { User } = require('../models/mongoose');

const create = (fields) => {
    return new User(fields).save();
};

const exists = (id) => {
    return User.exists({ _id: id });
};

const findByEmail = (email) => {
    return User.findOne({ email });
};

const findById = (id) => {
    return User.findById(id);
};

module.exports = {
    create,
    exists,
    findByEmail,
    findById,
}