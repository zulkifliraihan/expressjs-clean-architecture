require('dotenv').config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class securityHelper {
    hashPassword(data) {
        const hash = bcrypt.hashSync(data, 10);

        return hash
    }

    async checkPassword(reqPass, userPass) {
        
        const checkPassword = await bcrypt.compare(reqPass, userPass)

        return checkPassword
    }

    generateToken(data) {

        const token = jwt.sign({
            data: data,
        }, process.env.JWT_SECRET, {
            expiresIn: '2h'
        })

        return token
    }

    verifyToken(token) {
        const verify = jwt.verify(token, process.env.JWT_SECRET)

        return verify
    }
}

module.exports = new securityHelper()