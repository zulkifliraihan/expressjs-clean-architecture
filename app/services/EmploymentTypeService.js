const EmploymentTypeRepository = require("../repositories/employmentTypeRepository/EmploymentTypeRepository");
const EmploymentTypeValidation = require('../validation/EmploymentTypeValidation');

class EmploymentTypeService {
    async getEmploymentType() {
        let returnData = []

        try {
            const employmentTypes = await EmploymentTypeRepository.getEmploymentType()

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Get All Data"
            returnData['data'] = employmentTypes
            return returnData;
            
        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
            return returnData

        }
    }

    async createEmploymentType(data) {
        let returnData = []

        const { error } = EmploymentTypeValidation.createEmploymentType.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['errors'] = errors

            return returnData

        }

        try {

            const employmentType = await EmploymentTypeRepository.createEmploymentType(data)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Create Data"
            returnData['data'] = employmentType
            
        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
            
        }
        return returnData
    }

    async getEmploymentTypeById(id) {
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

            const employmentType = await EmploymentTypeRepository.getEmploymentTypeById(id)

            if (!employmentType) {
                returnData['status'] = false
                returnData['response'] = "validation"
                returnData['message'] = "ID EmploymentType Not Found"
                returnData['errors'] = null
            }
            else {

                returnData['status'] = true
                returnData['response'] = "success"
                returnData['message'] = "Success Get Detail Data"
                returnData['data'] = employmentType
            }

        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }

        return returnData
    }

    async updateEmploymentType(id, data) {
        let returnData = []

        id = parseInt(id)

        if (isNaN(id)) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Params Is Invalid"
            returnData['errors'] = null

           return returnData
        }

        const employmentTypeById = await EmploymentTypeRepository.getEmploymentTypeById(id)

        if (!employmentTypeById) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID EmploymentType Not Found"
            returnData['errors'] = null

            return returnData
        }

        const { error } = EmploymentTypeValidation.updateEmploymentType.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['errors'] = errors

            return returnData

        }

        try {

            const employmentType = await EmploymentTypeRepository.updateEmploymentType(id, data)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Update Data"
            returnData['data'] = employmentType

        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }

        return returnData
    }

    async deleteEmploymentType(id) {
        let returnData = []

        id = parseInt(id)
        
        if (isNaN(id)) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Params Is Invalid"
            returnData['errors'] = null

           return returnData
        }

        const employmentTypeById = await EmploymentTypeRepository.getEmploymentTypeById(id)

        if (!employmentTypeById) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID EmploymentType Not Found"
            returnData['errors'] = null

            return returnData
        }

        try {
            const employmentType = await EmploymentTypeRepository.deleteEmploymentType(id)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Delete Data"
            returnData['data'] = employmentType
        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }

        return returnData
    }
}

module.exports = new EmploymentTypeService()