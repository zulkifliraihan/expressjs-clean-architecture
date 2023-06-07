const AuthValidation = require('../validation/AuthValidation');
const UserRepository = require("../repositories/userRepository/UserRepository");
const securityHelper = require('../helpers/securityHelper');
const { user } = require('../../config/prisma');

class AuthService {
    async register(data) {
        let returnData = []
        
        const { error } = AuthValidation.register.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['errors'] = errors

            return returnData

        }

        const findUser = await UserRepository.getUserByEmail(data.email)

        if (findUser) {
            returnData['status'] = false
            
            if (findUser.deletedAt === null) {
                returnData['response'] = "validation"
                returnData['message'] = "Email is already in use"
                returnData['errors'] = null
            }
            else {
                returnData['response'] = "server"
                returnData['errors'] = "The email you provided has already been deleted and cannot be used for new data creation"
            }
            return returnData

        }
        
        data['password'] = securityHelper.hashPassword(data['password']);

        try {
            const user = await UserRepository.createUser( data)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Register"
            returnData['data'] = user

        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }

        console.log(returnData)

        return returnData
    }

    async login(req) {
        const data = req.body

        let returnData = []
        
        const { error } = AuthValidation.login.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['errors'] = errors

            return returnData

        }

        const options = {
            include: {
              userHasRoles: {
                include: {
                  role: true,
                },
              },
            },
        };

        const findUser = await UserRepository.getUserByEmail(data.email, options.include)

        if (!findUser) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "Email User Not Found"
            returnData['errors'] = null
            
            return returnData
        }

        const checkPassword = await securityHelper.checkPassword(data['password'], findUser.password)
        
        if (!checkPassword) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "Password doesn't match"
            returnData['errors'] = null
            
            return returnData
        }

        try {
            const generateToken = securityHelper.generateToken(findUser)
    
            req.session.currentUser = findUser

            const dataLogin = {
                authorization: {
                    token: generateToken,
                    expired: new Date().addHours(2)
                },
                data: findUser,
            }
    
            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Login"
            returnData['data'] = dataLogin
            
        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }


        return returnData
    }
}

module.exports = new AuthService()