const UserService = require('../services/UserService');
const { verifyToken } = require('../helpers/token');

const protect = async (req, res, next) => {
    const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : null;

    if (!token) {
        return res.status(401).json({ error: "You need a token " });
    }

    try {
        const { id } = await verifyToken(token);
        const exists = await UserService.exists(id);
        if (!exists) {
            res.status(403).json({ error: "Invalid token" });
            next();
        }
        req.userId = id;
        next();
    } catch (error) {
        res.status(403).json({ error });
    }
};

module.exports = protect;