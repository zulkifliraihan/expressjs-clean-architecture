class ReturnResponse {
    success (res, data = null, code = 200, message = null) {
        if (!message) {
            message = "Success"
        }

        let response;
        if (data) {
            response = {
                response_code : code,
                response_status : 'success',
                message,
                data
            }
        } else {
            response = {
                response_code : code,
                response_status : 'success',
                message
            }
        }

        return res.status(code).json(response);
        
    }   

    errorServer (res, data = null, code = 400, message = null) {
      
        if (!message) {
            message = "Internal Server Error"
        }

        let response;
        if (data) {
            response = {
                response_code : code,
                response_status : 'error_server',
                message,
                errors : data
            }
        } else {
            response = {
                response_code : code,
                response_status : 'error_server',
                message
            }
        }

        return res.status(code).json(response);
        
    }   
    
    errorValidation (res, data = null, code = 422, message = null) {
      
        if (!message) {
            message = "Validation Error"
        }

        let response;
        if (data) {
            response = {
                response_code : code,
                response_status : 'error_validation',
                message,
                errors : data
            }
        } else {
            response = {
                response_code : code,
                response_status : 'error_validation',
                message
            }
        }

        return res.status(code).json(response);
        
    }   
}

module.exports = new ReturnResponse()