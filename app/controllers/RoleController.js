const RoleService = require('../services/RoleService');
const ReturnResponse = require('../traits/ReturnResponse');
const roleValidation = require('../validation/RoleValidation');

class RoleController {
    async getRoles(req, res) { 
        const users = await RoleService.getRole();

        if (users['status']) {
            return ReturnResponse.success(res, users['data'], 200, "Success Get All Data");
        }
        else {
            return ReturnResponse.errorServer(res, users['errors'])
        }
    }
    

    async createRole(req, res) {
        const users = await RoleService.createRole(req.body);

        if (users['status']) {
            return ReturnResponse.success(res, users['data'], 200, users['message']);
        }
        else {
            if (users['response'] == "validation") {
                return ReturnResponse.errorValidation(res, users['errors'], 400, users['message'])
            }
            else if(users['response'] == "server") {
                return ReturnResponse.errorServer(res, users['errors'])
            }
        }

    }

    async getRoleById(req, res) {

        const user = await RoleService.getRoleById(req.params.id);

        if (user['status']) {
            
            return ReturnResponse.success(res, user['data'], 200, user['message']);
            
        }
        else {
            if (user['response'] == "validation") {
                return ReturnResponse.errorValidation(res, user['errors'], 400, user['message'])
                
            }
            else if(user['response'] == "server") {
                return ReturnResponse.errorServer(res, user['errors'])
            }
        }
    }

    async updateRole(req, res) {
        const user = await RoleService.updateRole(req.params.id, req.body);

        if (user['status']) {
            return ReturnResponse.success(res, user['data'], 200, user['message']);
        }
        else {
            if (user['response'] == "validation") {
                return ReturnResponse.errorValidation(res, user['errors'], 400, user['message'])
                
            }
            else if(user['response'] == "server") {
                return ReturnResponse.errorServer(res, user['errors'])
            }
        }

    }
    
    async deleteRole(req, res) {
        const user = await RoleService.deleteRole(req.params.id);

        if (user['status']) {
            return ReturnResponse.success(res, user['data'], 200, user['message']);
        }
        else {
            if (user['response'] == "validation") {
                return ReturnResponse.errorValidation(res, user['errors'], 400, user['message'])
            }
            else if(user['response'] == "server") {
                return ReturnResponse.errorServer(res, user['errors'])
            }
        }

    }
}

module.exports = new RoleController()