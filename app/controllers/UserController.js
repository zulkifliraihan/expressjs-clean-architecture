const UserService = require('../services/UserService');
const ReturnResponse = require('../traits/ReturnResponse');

class UserController {
    async getUsers(req, res) { 
        
        const users = await UserService.getUser();

        if (users['status']) {
            return ReturnResponse.success(res, users['data'], 200, "Success Get All Data");
        }
        else {
            return ReturnResponse.errorServer(res, users['errors'])
        }
    }
    

    async createUser(req, res) {
        const users = await UserService.createUser(req.body);

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

    async getUserById(req, res) {

        const user = await UserService.getUserById(req.params.id);

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

    async updateUser(req, res) {
        const user = await UserService.updateUser(req.params.id, req.body);

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
    
    async deleteUser(req, res) {
        const user = await UserService.deleteUser(req.params.id);

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

module.exports = new UserController()