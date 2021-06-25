const AuthService = require('../services/AuthService');
const { Router } = require('express');
const { createToken } = require('../helpers/token');

const router = Router();

router.post('/register', async (req, res) => {
    const user = await AuthService.register(req.body);
    if (!user) {
        return res.status(403).json({ message: "The email is already in use." });
    }
    const token = await createToken({ id: user._id }); // generar token
    return res.status(201).json({ token: token });
});

router.post('/login', async (req, res) => {
    const user = await AuthService.login(req.body);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = await createToken({ id: user._id }); // generar token
    return res.status(200).json({ token: token });
});

module.exports = router;

