require('dotenv').config();
const Ajv = require('ajv');
const ajv = new Ajv();
const mongoose = require('mongoose');
const { encryptPassword } = require('../helpers/password');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//definir modelos usuario tweet... mediante schema


const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    boards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board'
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await encryptPassword(user.password);
    }
    next();
});

const User = mongoose.model('User', userSchema);

const Tweet = mongoose.model('Tweet', {
    title: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});







validateTweet = (document, method) => {
    switch (method) {
        case 'POST':
            return ajv.validate(taskCreateSchema, document);
        case 'PUT':
            return ajv.validate(taskUpdateSchema, document);;
        case 'PATCH':
            return ajv.validate(taskPatchSchema, document);;
    }
}


module.exports = {
    Tweet,
    validateTweet,
    User
}