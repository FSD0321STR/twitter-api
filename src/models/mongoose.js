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
    firstName: String,
    lastName: String,
    userName: String,
    birthDate: String,
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
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
    body: String,
    images: [{
        type: mongoose.Types.ObjectId,
        ref: "TweetImage" , 
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const TweetImage = mongoose.model('TweetImage', {
    img: {
        data: Buffer,
        contentType: String, 
    },
    tweet: {
        type: mongoose.Types.ObjectId,
        ref: "Tweet", 
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


const TweetCollection = mongoose.model('TweetCollection', {
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User", 
    },
    tweets: [{
        type: mongoose.Types.ObjectId,
        ref: "Tweet", 
    }],
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
};

const userCreateSchema = {
    type: 'object',
    properties: {
    email: { type: 'string' },
    password: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    userName: { type: 'string' },
    birthDate: { type: 'string' },

},
    required: ['email', 'password', 'firstName', 'lastName', 'userName', 'birthDate'],
    additionalProperties: false,
};

validateUser = (document, method) => {
    
    switch (method) {
        case 'POST':
            return ajv.validate(userCreateSchema, document);
    }
};


module.exports = {
    Tweet,
    validateTweet,
    User,
    TweetImage,
    TweetCollection,
    validateUser
}