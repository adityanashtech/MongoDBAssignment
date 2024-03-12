const {userSchema} = require('../src/models/validateSchema');

const validateUserInput =  async (req, res, next) => {
    try {
        await userSchema.validateAsync(req.body);
        next();
        
    } catch (e) {
        res.status(400).json({ message: "Input Feild Validation Error" });
    }
}

module.exports = validateUserInput; 