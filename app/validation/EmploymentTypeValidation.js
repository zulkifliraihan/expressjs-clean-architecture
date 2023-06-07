const Joi = require('joi');

const createEmploymentType = Joi.object({
    name: Joi.string().required()
})

const updateEmploymentType = Joi.object({
    name: Joi.string()
})

module.exports = {
    createEmploymentType,
    updateEmploymentType,
}
    