const { Router } = require('express');
const { validateTweet } = require('../models/mongoose');
const TweetService = require('../services/tweetService');
const validate = require('../middlewares.js/validate')
const protect = require('../middlewares.js/protect');

const router = Router();


//CRUD


router.get("", async (req, res) => {
    const Tweets = await TweetService.readAll();
    return res.status(200).json(Tweets);
});

router.get("/:id", async (req, res) => {
    const Tweet = await TweetService.read(req.params.id);
    return res.status(200).json(Tweet);
});

router.post("", validate(validateTweet), async (req, res) => {
    const body = req.body;
    const Tweet = await TweetService.create(body);
    return res.status(201).json(Tweet)
});


router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deleted = await TweetService.remove(id);
    return res.status(200).json(deleted)
});



module.exports = router;