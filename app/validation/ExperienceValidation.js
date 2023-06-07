const Joi = require('joi');

const createExperience = Joi.object({
    employmenttype_id: Joi.number().integer().required(),
    title: Joi.string().required(),
    company_name: Joi.string().required(),
    industry: Joi.string().required(),
    location: Joi.string().required(),
    type: Joi.string().required(),
    current_work: Joi.boolean().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date(),
    description: Joi.string(),
})

const updateExperience = Joi.object({
    employmenttype_id: Joi.number().integer(),
    title: Joi.string(),
    company_name: Joi.string(),
    industry: Joi.string(),
    location: Joi.string(),
    type: Joi.string(),
    current_work: Joi.boolean(),
    startDate: Joi.date(),
    endDate: Joi.date(),
})

module.exports = {
    createExperience,
    updateExperience,
}
    