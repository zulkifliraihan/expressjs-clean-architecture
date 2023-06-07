const Joi = require('joi');

const createRole = Joi.object({
    name: Joi.string().required()
})

const updateRole = Joi.object({
    name: Joi.string()
})

module.exports = {
    createRole,
    updateRole,
}
    