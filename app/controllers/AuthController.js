const AuthService = require("../services/AuthService");
const ReturnResponse = require("../traits/ReturnResponse");

class AuthController {
    async register(req, res) {
        // console.log("Register")
        const service = await AuthService.register(req.body);

        if (service['status']) {
            return ReturnResponse.success(res, service['data'], 200, service['message']);
        }
        else {
            if (service['response'] == "validation") {
                return ReturnResponse.errorValidation(res, service['errors'], 400, service['message'])
            }
            else if(service['response'] == "server") {
                return ReturnResponse.errorServer(res, service['errors'])
            }
        }
    }

    async login (req, res) {
        const service = await AuthService.login(req);

        if (service['status']) {
            return ReturnResponse.success(res, service['data'], 200, service['message']);
        }
        else {
            if (service['response'] == "validation") {
                return ReturnResponse.errorValidation(res, service['errors'], 400, service['message'])
            }
            else if(service['response'] == "server") {
                return ReturnResponse.errorServer(res, service['errors'])
            }
        }
    }
}

module.exports = new AuthController()