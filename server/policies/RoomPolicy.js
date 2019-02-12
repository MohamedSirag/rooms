const Joi = require('joi')
// add acl.
module.exports = {
    store (req, res, next) {
        const schema = {
            // data validation.
        }
        const { error, value } = Joi.validate(req.body, schema)
        if (error) {
            return res.status(422).json({
                messages: error.details.map((error) => error.message),
                data: value
            });
        }
        next()
    },
    destroy (req, res, next) {
        // check for the user room ownership here, or do it in controller.
    },
    show (req, res, next) {
        if (req.userData.id ) {}
    }


}
