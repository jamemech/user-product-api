const accountService = require('../services/account.service')

exports.register = async (req, res) => res.status(201).json(await accountService.register(req.body))

exports.login = async (req, res) => {
    const { username, password } = req.body
    const token = await accountService.login(username, password)
    if (!token) {
        res.status(401).json()
        return
    }
    res.json({ token })
}

exports.info = (req, res) => res.json({ username: req.sub, role: req.role })
