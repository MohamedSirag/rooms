const Joi = require('joi')
// add acl.
module.exports = {
    store (req, res, next) {
        const schema = {
          start_hour: Joi.number().min(0).max(24).integer().required(),
          end_hour: Joi.number().min(0).max(24).integer().required(),
          name: Joi.string().min(3).max(32),
          location: Joi.required()
        }
        const { error, value } = Joi.validate(req.body, schema)

        if (error) {
            return res.status(422).json({
                messages: error.details.map((error) => error.message),
                data: value
            });
        }

        if (req.body.start_hour > req.body.end_hour) {
            return res.status(422).json({
                error: {
                    message: "You have to reserve with less hours."
                }
            })
        }
        next()
    },


}
