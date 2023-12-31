const { User } = require('../models/User')

const checkAuth = async (req, res, next) => {
    try {

        const auth_token = req.headers['authorization'].split(" ")[1]

        if (!auth_token) {
            throw new Error("Forbidden")
        }

        const user = await User.findOne({ 'tokens.token': auth_token })

        if (!user) {
            res.status(404).send({ message: "Auth didn't find user" })
            return
        }

        req.body.uid = user.uid

        next()
    } catch (err) {
        res.status(403).send({ message: "Forbidden" })
    }
}

module.exports = {
    checkAuth
}