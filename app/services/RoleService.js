const RoleRepository = require("../repositories/roleRepository/RoleRepository");
const RoleValidation = require('../validation/RoleValidation');

class RoleService {
    async getRole() {
        let returnData = []

        try {
            const roles = await RoleRepository.getRole()

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Get All Data"
            returnData['data'] = roles
            return returnData;
            
        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
            return returnData

        }
    }

    async createRole(data) {
        let returnData = []

        const { error } = RoleValidation.createRole.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['errors'] = errors

            return returnData

        }

        try {
            const role = await RoleRepository.createRole(data)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Create Data"
            returnData['data'] = role
            
        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
            
        }
        return returnData
    }

    async getRoleById(id) {
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
            const role = await RoleRepository.getRoleById(id)

            if (!role) {
                returnData['status'] = false
                returnData['response'] = "validation"
                returnData['message'] = "ID Role Not Found"
                returnData['errors'] = null
            }
            else {

                returnData['status'] = true
                returnData['response'] = "success"
                returnData['message'] = "Success Get Detail Data"
                returnData['data'] = role
            }

        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }

        return returnData
    }

    async updateRole(id, data) {
        let returnData = []

        id = parseInt(id)

        if (isNaN(id)) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Params Is Invalid"
            returnData['errors'] = null

           return returnData
        }

        const roleById = await RoleRepository.getRoleById(id)

        if (!roleById) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Role Not Found"
            returnData['errors'] = null

            return returnData
        }

        const { error } = RoleValidation.updateRole.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['errors'] = errors

            return returnData

        }

        try {
            const role = await RoleRepository.updateRole(id, data)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Update Data"
            returnData['data'] = role

        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }

        return returnData
    }

    async deleteRole(id) {
        let returnData = []

        id = parseInt(id)
        
        if (isNaN(id)) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Params Is Invalid"
            returnData['errors'] = null

           return returnData
        }

        const roleById = await RoleRepository.getRoleById(id)

        if (!roleById) {
            returnData['status'] = false
            returnData['response'] = "validation"
            returnData['message'] = "ID Role Not Found"
            returnData['errors'] = null

            return returnData
        }

        try {
            const role = await RoleRepository.deleteRole(id)

            returnData['status'] = true
            returnData['response'] = "success"
            returnData['message'] = "Success Delete Data"
            returnData['data'] = role
        } catch (error) {
            returnData['status'] = false
            returnData['response'] = "server"
            returnData['errors'] = error.message
        }

        return returnData
    }
}

module.exports = new RoleService()