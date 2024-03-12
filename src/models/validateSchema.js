const joi = require('joi');
const userSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.number().required(),
    password: joi.string().required()
});
module.exports = { userSchema };