function validate(validateFn) {
    return (req, res, next) => {
        const valid = validateFn(req.body, req.method)
        if (!valid) {
            return res.status(400).json({ error: "Wrong Schema" })
        } else {
            next()
        }
    }
}

module.exports = validate