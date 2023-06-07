const IExperienceRepository = require("./IExperienceRepository");
const ExperienceModel = require("../../models/ExperienceModel");

class ExperienceRepository extends IExperienceRepository{

    async getExperience(include = null) { 
        const syntax = 'findMany'
        const data = {
            include
        }
        const result = await ExperienceModel.execute(syntax, data);

        return result
    }

    async createExperience(roleData) {

        const syntax = 'create'
        const data = {
            data: roleData
        }

        const result = await ExperienceModel.execute(syntax, data)

        return result
    }

    async getExperienceById(id, include = null) {
        const syntax = 'findUnique'
        const data = {
            where: {
                id
            },
            include
        }

        const result = await ExperienceModel.execute(syntax, data)

        return result
    }


    async updateExperience(id, roleData) {

        const syntax = 'update'
        const data = {
            where: {
                id
            },
            data: roleData
        }

        const result = await ExperienceModel.execute(syntax, data)

        return result
    }

    async deleteExperience(id) {
        const syntax = 'delete'
        const data = {
            where: {
                id
            }
        }

        const result = await ExperienceModel.execute(syntax, data)

        return result
    }
    
}

module.exports = new ExperienceRepository()