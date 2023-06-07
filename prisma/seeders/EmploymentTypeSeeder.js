const EmploymentTypeModel = require("../../app/models/EmploymentTypeModel");
const prisma = require("../../config/prisma");

class EmploymentTypeSeeder {
    async seed() {
        try {
            const roles = [
                {
                    name: 'Full-time',
                },
                {
                    name: 'Part-time',
                },
                {
                    name: 'Freelance',
                },
                {
                    name: 'Contract',
                },
                {
                    name: 'Intership',
                },
                {
                    name: 'Self-employed',
                },
            ]
    
            const data = {
                data: roles
            }
    
            const created = await EmploymentTypeModel.execute('createMany', data)

            console.log(`✨ ---- Successfully Seed EmploymentTypeSeeder ---- ✨`)
        } catch (error) {
            console.log(`---- Failed Seed UserSeeder ----`)
            console.log(error.message)
        }

    }
}
module.exports = new EmploymentTypeSeeder()