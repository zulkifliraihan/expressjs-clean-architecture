const ExperienceService = require('../services/ExperienceService');
const ReturnResponse = require('../traits/ReturnResponse');

class ExperienceController {
    async getExperiences(req, res) { 
        
        const experiences = await ExperienceService.getExperience();

        if (experiences['status']) {
            return ReturnResponse.success(res, experiences['data'], 200, "Success Get All Data");
        }
        else {
            return ReturnResponse.errorServer(res, experiences['errors'])
        }
    }
    

    async createExperience(req, res) {
        const experiences = await ExperienceService.createExperience(req.body);

        if (experiences['status']) {
            return ReturnResponse.success(res, experiences['data'], 200, experiences['message']);
        }
        else {
            if (experiences['response'] == "validation") {
                return ReturnResponse.errorValidation(res, experiences['errors'], 400, experiences['message'])
            }
            else if(experiences['response'] == "server") {
                return ReturnResponse.errorServer(res, experiences['errors'])
            }
        }

    }

    async getExperienceById(req, res) {

        const experience = await ExperienceService.getExperienceById(req.params.id);

        if (experience['status']) {
            
            return ReturnResponse.success(res, experience['data'], 200, experience['message']);
            
        }
        else {
            if (experience['response'] == "validation") {
                return ReturnResponse.errorValidation(res, experience['errors'], 400, experience['message'])
                
            }
            else if(experience['response'] == "server") {
                return ReturnResponse.errorServer(res, experience['errors'])
            }
        }
    }

    async updateExperience(req, res) {
        const experience = await ExperienceService.updateExperience(req.params.id, req.body);

        if (experience['status']) {
            return ReturnResponse.success(res, experience['data'], 200, experience['message']);
        }
        else {
            if (experience['response'] == "validation") {
                return ReturnResponse.errorValidation(res, experience['errors'], 400, experience['message'])
                
            }
            else if(experience['response'] == "server") {
                return ReturnResponse.errorServer(res, experience['errors'])
            }
        }

    }
    
    async deleteExperience(req, res) {
        const experience = await ExperienceService.deleteExperience(req.params.id);

        if (experience['status']) {
            return ReturnResponse.success(res, experience['data'], 200, experience['message']);
        }
        else {
            if (experience['response'] == "validation") {
                return ReturnResponse.errorValidation(res, experience['errors'], 400, experience['message'])
            }
            else if(experience['response'] == "server") {
                return ReturnResponse.errorServer(res, experience['errors'])
            }
        }

    }
}

module.exports = new ExperienceController()