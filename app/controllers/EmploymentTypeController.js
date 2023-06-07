const EmploymentTypeService = require('../services/EmploymentTypeService');
const ReturnResponse = require('../traits/ReturnResponse');

class EmploymentTypeController {
    async getEmploymentTypes(req, res) { 
        
        const employmentTypes = await EmploymentTypeService.getEmploymentType();

        if (employmentTypes['status']) {
            return ReturnResponse.success(res, employmentTypes['data'], 200, "Success Get All Data");
        }
        else {
            return ReturnResponse.errorServer(res, employmentTypes['errors'])
        }
    }
    

    async createEmploymentType(req, res) {
        const employmentTypes = await EmploymentTypeService.createEmploymentType(req.body);

        if (employmentTypes['status']) {
            return ReturnResponse.success(res, employmentTypes['data'], 200, employmentTypes['message']);
        }
        else {
            if (employmentTypes['response'] == "validation") {
                return ReturnResponse.errorValidation(res, employmentTypes['errors'], 400, employmentTypes['message'])
            }
            else if(employmentTypes['response'] == "server") {
                return ReturnResponse.errorServer(res, employmentTypes['errors'])
            }
        }

    }

    async getEmploymentTypeById(req, res) {

        const employmentType = await EmploymentTypeService.getEmploymentTypeById(req.params.id);

        if (employmentType['status']) {
            
            return ReturnResponse.success(res, employmentType['data'], 200, employmentType['message']);
            
        }
        else {
            if (employmentType['response'] == "validation") {
                return ReturnResponse.errorValidation(res, employmentType['errors'], 400, employmentType['message'])
                
            }
            else if(employmentType['response'] == "server") {
                return ReturnResponse.errorServer(res, employmentType['errors'])
            }
        }
    }

    async updateEmploymentType(req, res) {
        const employmentType = await EmploymentTypeService.updateEmploymentType(req.params.id, req.body);

        if (employmentType['status']) {
            return ReturnResponse.success(res, employmentType['data'], 200, employmentType['message']);
        }
        else {
            if (employmentType['response'] == "validation") {
                return ReturnResponse.errorValidation(res, employmentType['errors'], 400, employmentType['message'])
                
            }
            else if(employmentType['response'] == "server") {
                return ReturnResponse.errorServer(res, employmentType['errors'])
            }
        }

    }
    
    async deleteEmploymentType(req, res) {
        const employmentType = await EmploymentTypeService.deleteEmploymentType(req.params.id);

        if (employmentType['status']) {
            return ReturnResponse.success(res, employmentType['data'], 200, employmentType['message']);
        }
        else {
            if (employmentType['response'] == "validation") {
                return ReturnResponse.errorValidation(res, employmentType['errors'], 400, employmentType['message'])
            }
            else if(employmentType['response'] == "server") {
                return ReturnResponse.errorServer(res, employmentType['errors'])
            }
        }

    }
}

module.exports = new EmploymentTypeController()