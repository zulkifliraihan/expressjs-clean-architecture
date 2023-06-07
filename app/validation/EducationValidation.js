const Joi = require('joi');

const createEducation = Joi.object({
    name: Joi.string().required(),
    degree: Joi.string().required(),
    study: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    description: Joi.string(),

})

const updateEducation = Joi.object({
    name: Joi.string(),
    degree: Joi.string(),
    study: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
})

module.exports = {
    createEducation,
    updateEducation,
}
    