const accountRepository = require('../repositories/account.repository')
const bcrypt = require('bcrypt')
const jwt = require('../configs/jwt')

exports.register = async (account) => {
    account.password = await bcrypt.hash(account.password, 8)
    return await accountRepository.add(account)
}

exports.login = async (username, password) => {
    const result = await accountRepository.findByUsername(username)
    if (result && await bcrypt.compare(password, result.password)) {
        const payload = {
            sub: result.username,
            role: result.role,
            addtional: 'todo'
        }
        return jwt.generateToken(payload)
    }
    return ''
}
