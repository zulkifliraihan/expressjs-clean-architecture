const securityHelper = require("../helpers/securityHelper");
const UserRepository = require("../repositories/userRepository/UserRepository");
const UserValidation = require('../validation/UserValidation');

class UserService {
    async getUser() {
        let returnData = []

        try {
            const options = {
                include: {
                  userHasRoles: {
                    include: {
                      role: true,
                    },
                  },
                },
            };
            
            const users = await UserRepository.getUser(options.include)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Get All Data"
            returnData['data'] = users
            return returnData;
            
        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
            return returnData

        }
    }

    async createUser(data) {
        let returnData = []

        const { error } = UserValidation.createUser.validate(data, {abortEarly: false})

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

        try {
            data['password'] = securityHelper.hashPassword(data['password'])

            const user = await UserRepository.createUser(data)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Create Data"
            returnData['data'] = user
            
        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
            
        }
        return returnData
    }

    async getUserById(id) {
        let returnData = []

        id = parseInt(id)

        if (isNaN(id)) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Params Is Invalid"
            returnData['errors'] = null

           return returnData
        }

        try {
            const options = {
                include: {
                  userHasRoles: {
                    include: {
                      role: true,
                    },
                  },
                },
            };

            const user = await UserRepository.getUserById(id, options.include)

            if (!user) {
                returnData['status'] = false
                returnData['response'] = "validation"
                returnData['message'] = "ID User Not Found"
                returnData['errors'] = null
            }
            else {

                returnData['status'] = true
                returnData['response'] = "success"
                returnData['message'] = "Success Get Detail Data"
                returnData['data'] = user
            }

        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }

        return returnData
    }

    async updateUser(id, data) {
        let returnData = []

        id = parseInt(id)

        if (isNaN(id)) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Params Is Invalid"
            returnData['errors'] = null

           return returnData
        }

        const userById = await UserRepository.getUserById(id)

        if (!userById) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID User Not Found"
            returnData['errors'] = null

            return returnData
        }

        const { error } = UserValidation.updateUser.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['errors'] = errors

            return returnData

        }


        if (data.email) {
            const findUserByEmail = await UserRepository.getUserByEmail(data.email)
    
            if (findUserByEmail && findUserByEmail.id !== id) {
                returnData['status'] = false
            
                if (findUserByEmail .deletedAt === null) {
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
        }

        try {
            if (data['password']) {
                data['password'] = securityHelper.hashPassword(data['password'])
            }

            const user = await UserRepository.updateUser(id, data)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Update Data"
            returnData['data'] = user

        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }

        return returnData
    }

    async deleteUser(id) {
        let returnData = []

        id = parseInt(id)
        
        if (isNaN(id)) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Params Is Invalid"
            returnData['errors'] = null

           return returnData
        }

        const userById = await UserRepository.getUserById(id)

        if (!userById) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID User Not Found"
            returnData['errors'] = null

            return returnData
        }

        try {
            const user = await UserRepository.deleteUser(id)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Delete Data"
            returnData['data'] = user
        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }

        return returnData
    }
}

module.exports = new UserService()