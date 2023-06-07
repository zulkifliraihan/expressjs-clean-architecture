const { hashPassword } = require("../../app/helpers/securityHelper");
const RoleModel = require("../../app/models/RoleModel");
const prisma = require("../../config/prisma");

class RoleSeeder {
    async seed() {
        try {
            const roles = [
                {
                    name: 'admin',
                },
                {
                    name: 'public',
                }
            ]
    
            const data = {
                data: roles
            }
    
            const created = await RoleModel.execute('createMany', data)

            console.log(`✨ ---- Successfully Seed RoleSeeder ---- ✨`)
        } catch (error) {
            console.log(`---- Failed Seed UserSeeder ----`)
            console.log(error.message)
        }

    }
}
module.exports = new RoleSeeder()