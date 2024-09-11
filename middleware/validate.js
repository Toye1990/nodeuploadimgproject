const Joi = require('joi')
//const { startSession } = require('mongoose')

const productmark = (data) =>{
    const schema = Joi.object({
        title: Joi.string().required(),
        newprice: Joi.number().required(),
        oldprice: Joi.number().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        color: Joi.string().required(),
        tags: Joi.string().required(),
        size: Joi.number().required(),
        quantity: Joi.number().required(),
        brands: Joi.string().required(),
        category: Joi.string().required(),
    })
    return schema.validate(data)
}

module.exports = {productmark}