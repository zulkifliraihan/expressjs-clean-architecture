const ExperienceRepository = require("../repositories/experienceRepository/ExperienceRepository");
const ExperienceValidation = require('../validation/ExperienceValidation');

class ExperienceService {
    async getExperience() {
        let returnData = []

        try {
            const options = {
                include: {
                  employmentType: true,
                },
            };

            const experiences = await ExperienceRepository.getExperience(options.include)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Get All Data"
            returnData['data'] = experiences
            return returnData;
            
        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
            return returnData

        }
    }

    async createExperience(data) {
        let returnData = []

        const { error } = ExperienceValidation.createExperience.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['errors'] = errors

            return returnData

        }

        if (!data['current_work']) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['errors'] = ["\"endDate\" is required if current_work is false"]

            return returnData
        }

        try {
            data['startDate'] = new Date(data['startDate'])

            if (data['endDate']) {
                data['endDate'] = new Date(data['endDate'])
            }
            
            const experience = await ExperienceRepository.createExperience(data)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Create Data"
            returnData['data'] = experience
            
        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
            
        }
        return returnData
    }

    async getExperienceById(id) {
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
                  employmentType: true,
                },
            };

            const experience = await ExperienceRepository.getExperienceById(id, options.include)

            if (!experience) {
                returnData['status'] = false
                returnData['response'] = "validation"
                returnData['message'] = "ID Experience Not Found"
                returnData['errors'] = null
            }
            else {

                returnData['status'] = true
                returnData['response'] = "success"
                returnData['message'] = "Success Get Detail Data"
                returnData['data'] = experience
            }

        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }

        return returnData
    }

    async updateExperience(id, data) {
        let returnData = []

        id = parseInt(id)

        if (isNaN(id)) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Params Is Invalid"
            returnData['errors'] = null

           return returnData
        }

        const experienceById = await ExperienceRepository.getExperienceById(id)

        if (!experienceById) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Experience Not Found"
            returnData['errors'] = null

            return returnData
        }

        const { error } = ExperienceValidation.updateExperience.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['errors'] = errors

            return returnData

        }

        if ('current_work' in data) {
            if (!data['current_work']) {
                returnData['status'] = false
                returnData['response'] = "validation"
                returnData['errors'] = ["\"endDate\" is required if current_work is false"]

                return returnData
            }
        }
        

        try {
            if (data['startDate']) {
                data['startDate'] = new Date(data['startDate'])
            }
            if (data['endDate']) {
                data['endDate'] = new Date(data['endDate'])
            }

            const experience = await ExperienceRepository.updateExperience(id, data)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Update Data"
            returnData['data'] = experience

        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }

        return returnData
    }

    async deleteExperience(id) {
        let returnData = []

        id = parseInt(id)
        
        if (isNaN(id)) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Params Is Invalid"
            returnData['errors'] = null

           return returnData
        }

        const experienceById = await ExperienceRepository.getExperienceById(id)

        if (!experienceById) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Experience Not Found"
            returnData['errors'] = null

            return returnData
        }

        try {
            const experience = await ExperienceRepository.deleteExperience(id)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Delete Data"
            returnData['data'] = experience
        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }

        return returnData
    }
}

module.exports = new ExperienceService()