const Joi = require('joi');

const createUser = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

const updateUser = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(8),
})

module.exports = {
    createUser,
    updateUser,
}
    