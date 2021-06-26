const { Router } = require('express');
const { TweetValidate } = require('../models/mongoose');
const TweetService = require('../services/TweetService');
const validate = require("../middlewares/validate")
const protect = require('../middlewares/protect');

const router = Router();

router.get("", async (req, res) => {
    const tasks = await TweetService.readAll();
    return res.status(200).json(tasks);
});

router.get("/:id", async (req, res) => {
    const task = await TweetService.read(req.params.id);
    return res.status(200).json(task);
});

router.post("", validate(TweetValidate), async (req, res) => {
    const body = req.body;
    const task = await TweetService.create(body);
    return res.status(201).json(task)
});

router.put("/:id", validate(TweetValidate), async (req, res) => {
    const body = req.body;
    const { id } = req.params
    const task = await TweetService.update(id, body);
    return res.status(200).json(task)
});

router.patch("/:id", validate(TweetValidate), async (req, res) => {
    const body = req.body;
    const { id } = req.params
    const task = await TweetService.update(id, body);
    return res.status(200).json(task)
});


router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deleted = await TweetService.remove(id);
    return res.status(200).json(deleted)
});

router.post('/clear', async (req, res) => {
    const deleted = await TweetService.clearCompleted();
    return res.status(200).json(deleted)
})


module.exports = router;