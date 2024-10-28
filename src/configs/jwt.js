const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
const signOption = {
    issuer: 'example',
    audience: 'http://example.com',
    algorithm: 'HS256'
}

const generateToken = (payload) => jwt.sign(payload, jwtSecret, { ...signOption, expiresIn: '30d' })

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        res.status(401).json()
        return
    }
    jwt.verify(token, jwtSecret, signOption, (err, decode) => {
        if (err) {
            res.status(401).json()
            return
        }
        req.sub = decode.sub
        req.role = decode.role
        next()
    })
}

module.exports = {
    generateToken,
    verifyToken
}