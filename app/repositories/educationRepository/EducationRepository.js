const IEducationRepository = require("./IEducationRepository");
const EducationModel = require("../../models/EducationModel");

class EducationRepository extends IEducationRepository{

    async getEducation() { 
        const syntax = 'findMany'
        const result = await EducationModel.execute(syntax);

        return result
    }

    async createEducation(roleData) {

        const syntax = 'create'
        const data = {
            data: roleData
        }

        const result = await EducationModel.execute(syntax, data)

        return result
    }

    async getEducationById(id) {
        const syntax = 'findUnique'
        const data = {
            where: {
                id
            }
        }

        const result = await EducationModel.execute(syntax, data)

        return result
    }


    async updateEducation(id, roleData) {

        const syntax = 'update'
        const data = {
            where: {
                id
            },
            data: roleData
        }

        const result = await EducationModel.execute(syntax, data)

        return result
    }

    async deleteEducation(id) {
        const syntax = 'delete'
        const data = {
            where: {
                id
            }
        }

        const result = await EducationModel.execute(syntax, data)

        return result
    }
    
}

module.exports = new EducationRepository()