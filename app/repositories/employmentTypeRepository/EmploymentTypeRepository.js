const IEmploymentTypeRepository = require("./IEmploymentTypeRepository");
const EmploymentTypeModel = require("../../models/EmploymentTypeModel");

class EmploymentTypeRepository extends IEmploymentTypeRepository{

    async getEmploymentType() { 
        const syntax = 'findMany'
        const result = await EmploymentTypeModel.execute(syntax);

        return result
    }

    async createEmploymentType(roleData) {

        const syntax = 'create'
        const data = {
            data: roleData
        }

        const result = await EmploymentTypeModel.execute(syntax, data)

        return result
    }

    async getEmploymentTypeById(id) {
        const syntax = 'findUnique'
        const data = {
            where: {
                id
            }
        }

        const result = await EmploymentTypeModel.execute(syntax, data)

        return result
    }


    async updateEmploymentType(id, roleData) {

        const syntax = 'update'
        const data = {
            where: {
                id
            },
            data: roleData
        }

        const result = await EmploymentTypeModel.execute(syntax, data)

        return result
    }

    async deleteEmploymentType(id) {
        const syntax = 'delete'
        const data = {
            where: {
                id
            }
        }

        const result = await EmploymentTypeModel.execute(syntax, data)

        return result
    }
    
}

module.exports = new EmploymentTypeRepository()