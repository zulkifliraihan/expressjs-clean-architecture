const IUserRepository = require("./IUserRepository");
const UserModel = require("../../models/UserModel");
const securityHelper = require("../../helpers/securityHelper");

class UserRepository extends IUserRepository{

    async getUser(include = null) { 
        const syntax = 'findMany'
        const data = {
            include
        }
        const result = await UserModel.execute(syntax, data);

        return result
    }

    async createUser(userData) {

        const syntax = 'create'
        const data = {
            data: userData
        }

        const result = await UserModel.execute(syntax, data)

        return result
    }

    async getUserById(id, include = null) {
        const syntax = 'findFirst'
        const data = {
            where: {
                id,
                deletedAt: null,
            },
            include
        }

        const result = await UserModel.execute(syntax, data)

        return result
    }

    async getUserByEmail(email, include = null) {
        const syntax = 'findFirst'
        const data = {
            where: {
                email
            },
            include
        }

        const result = await UserModel.execute(syntax, data)

        return result
    }

    async updateUser(id, updatedData) {

        const syntax = 'update'
        const data = {
            where: {
                id
            },
            data: updatedData
        }

        const result = await UserModel.execute(syntax, data)

        return result
    }

    async deleteUser(id) {
        const syntax = 'delete'
        const data = {
            where: {
                id
            }
        }

        const result = await UserModel.execute(syntax, data)

        return result
    }
    
}

module.exports = new UserRepository()