const EducationRepository = require("../repositories/educationRepository/EducationRepository");
const EducationValidation = require('../validation/EducationValidation');

class EducationService {
    async getEducation() {
        let returnData = []

        try {
            const educations = await EducationRepository.getEducation()

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Get All Data"
            returnData['data'] = educations
            return returnData;
            
        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
            return returnData

        }
    }

    async createEducation(data) {
        let returnData = []

        const { error } = EducationValidation.createEducation.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['errors'] = errors

            return returnData

        }

        try {
            data['startDate'] = new Date(data['startDate'])
            data['endDate'] = new Date(data['endDate'])
            
            const education = await EducationRepository.createEducation(data)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Create Data"
            returnData['data'] = education
            
        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
            
        }
        return returnData
    }

    async getEducationById(id) {
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

            const education = await EducationRepository.getEducationById(id)

            if (!education) {
                returnData['status'] = false
                returnData['response'] = "validation"
                returnData['message'] = "ID Education Not Found"
                returnData['errors'] = null
            }
            else {

                returnData['status'] = true
                returnData['response'] = "success"
                returnData['message'] = "Success Get Detail Data"
                returnData['data'] = education
            }

        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }

        return returnData
    }

    async updateEducation(id, data) {
        let returnData = []

        id = parseInt(id)

        if (isNaN(id)) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Params Is Invalid"
            returnData['errors'] = null

           return returnData
        }

        const educationById = await EducationRepository.getEducationById(id)

        if (!educationById) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Education Not Found"
            returnData['errors'] = null

            return returnData
        }

        const { error } = EducationValidation.updateEducation.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['errors'] = errors

            return returnData

        }


        try {
            if (data['startDate']) {
                data['startDate'] = new Date(data['startDate'])
            }
            if (data['endDate']) {
                data['endDate'] = new Date(data['endDate'])
            }

            const education = await EducationRepository.updateEducation(id, data)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Update Data"
            returnData['data'] = education

        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }

        return returnData
    }

    async deleteEducation(id) {
        let returnData = []

        id = parseInt(id)
        
        if (isNaN(id)) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Params Is Invalid"
            returnData['errors'] = null

           return returnData
        }

        const educationById = await EducationRepository.getEducationById(id)

        if (!educationById) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Education Not Found"
            returnData['errors'] = null

            return returnData
        }

        try {
            const education = await EducationRepository.deleteEducation(id)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Delete Data"
            returnData['data'] = education
        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }

        return returnData
    }
}

module.exports = new EducationService()