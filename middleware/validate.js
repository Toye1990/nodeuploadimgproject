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


const uservalidate = (data) =>{
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        confirmpassword: Joi.string().required(),
    })
    return schema.validate(data)
}

const loginvalidate = (data) =>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    })
    return schema.validate(data)
}

module.exports.productmark = productmark
module.exports.uservalidate = uservalidate
module.exports.loginvalidate = loginvalidate

