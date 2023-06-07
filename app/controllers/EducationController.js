const EducationService = require('../services/EducationService');
const ReturnResponse = require('../traits/ReturnResponse');

class EducationController {
    async getEducations(req, res) { 
        
        const educations = await EducationService.getEducation();

        if (educations['status']) {
            return ReturnResponse.success(res, educations['data'], 200, "Success Get All Data");
        }
        else {
            return ReturnResponse.errorServer(res, educations['errors'])
        }
    }
    

    async createEducation(req, res) {
        const educations = await EducationService.createEducation(req.body);

        if (educations['status']) {
            return ReturnResponse.success(res, educations['data'], 200, educations['message']);
        }
        else {
            if (educations['response'] == "validation") {
                return ReturnResponse.errorValidation(res, educations['errors'], 400, educations['message'])
            }
            else if(educations['response'] == "server") {
                return ReturnResponse.errorServer(res, educations['errors'])
            }
        }

    }

    async getEducationById(req, res) {

        const education = await EducationService.getEducationById(req.params.id);

        if (education['status']) {
            
            return ReturnResponse.success(res, education['data'], 200, education['message']);
            
        }
        else {
            if (education['response'] == "validation") {
                return ReturnResponse.errorValidation(res, education['errors'], 400, education['message'])
                
            }
            else if(education['response'] == "server") {
                return ReturnResponse.errorServer(res, education['errors'])
            }
        }
    }

    async updateEducation(req, res) {
        const education = await EducationService.updateEducation(req.params.id, req.body);

        if (education['status']) {
            return ReturnResponse.success(res, education['data'], 200, education['message']);
        }
        else {
            if (education['response'] == "validation") {
                return ReturnResponse.errorValidation(res, education['errors'], 400, education['message'])
                
            }
            else if(education['response'] == "server") {
                return ReturnResponse.errorServer(res, education['errors'])
            }
        }

    }
    
    async deleteEducation(req, res) {
        const education = await EducationService.deleteEducation(req.params.id);

        if (education['status']) {
            return ReturnResponse.success(res, education['data'], 200, education['message']);
        }
        else {
            if (education['response'] == "validation") {
                return ReturnResponse.errorValidation(res, education['errors'], 400, education['message'])
            }
            else if(education['response'] == "server") {
                return ReturnResponse.errorServer(res, education['errors'])
            }
        }

    }
}

module.exports = new EducationController()