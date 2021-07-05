const { Tweet } = require('../models/mongoose');

const create = (document) => {
    return new Tweet(document).save();
};

const readAll = async () => {
    return await Tweet.find().populate('tweet').exec();
}

const deleteTweet = (id) => {
    return Tweet.delete({ _id: id });
};

const findByUser = (User) => {
    return Tweet.findOne({ User });
};

const findById = (id) => {
    return Tweet.findById(id);
};

module.exports = {
    readAll,
    create,
    deleteTweet,
    findByUser,
    findById,
}

