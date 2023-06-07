const { hashPassword } = require("../../app/helpers/securityHelper");
const UserHasRoleModel = require("../../app/models/UserHasRoleModel");
const UserModel = require("../../app/models/UserModel");

class UserSeeder {
    async seed() {
        try {
            const users = [
                {
                    name: 'Zulkifli Raihan',
                    email: 'zuran2907@gmail.com',
                    password: hashPassword('123123123') 
                },
                {
                    name: 'Fadhil D Maulana',
                    email: 'fadhilmaulana@gmail.com',
                    password: hashPassword('123123123') 
                }
            ]

            const data = {
                data: users,
            }
    
            const created = await UserModel.execute('createMany', data)
            
            const userHasRole = [
                {
                    user_id: 1,
                    role_id: 1
                },
                {
                    user_id: 2,
                    role_id: 2
                },
            ]

            const dataUserHasRole = {
                data: userHasRole
            }

            const createdUserHasRole = await UserHasRoleModel.execute('createMany', dataUserHasRole)
            
            console.log(`✨ ---- Successfully Seed UserSeeder ---- ✨`)
        } catch (error) {
            console.log(`---- Failed Seed UserSeeder ----`)
            console.log(error.message)
        }

    }
}

module.exports = new UserSeeder()