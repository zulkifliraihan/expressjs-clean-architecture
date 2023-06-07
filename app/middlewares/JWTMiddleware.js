const securityHelper = require("../helpers/securityHelper");
const ReturnResponse = require("../traits/ReturnResponse")
const jwt = require('jsonwebtoken');

const JWTMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return ReturnResponse.errorServer(res,  "Token is required", 400 , "Unauthorized Access")
    }

    const token = authHeader.replace('Bearer ', '')


    try {
        const verifyToken = securityHelper.verifyToken(token);

        const data = verifyToken.data

        const currentUser = req.session.currentUser

        if (!currentUser) {
            return ReturnResponse.errorServer(res,  "Session is expired", 400 , "Unauthorized Access")
        }

        if (currentUser.id != data.id) {
            return ReturnResponse.errorServer(res,  "Unmatch Authentication", 400 , "Unauthorized Access")
        }

        return next()
      } catch(error) {
        return ReturnResponse.errorServer(res,  error.message, 400 , "Unauthorized Access")
      }

}

module.exports = JWTMiddleware