const { required } = require('joi')
const { verify } = require('jsonwebtoken')
const mongoose = require('mongoose')


const userschema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
       type:String,
       required:true 
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:[true, "email is already taken"],
    },
    password:{
        type:String,
        required:[true, "password is required"]
    },
    role:{
        type:String,
        enum:['user', 'admin', 'sub-admit'],
        default:'user'
    },

    verify:{
        type:Boolean,
        default:false
    },

    complete:{
        type:Boolean,
        default:false
    },

    image:{
        type:String,
        default:'/uploads/bed.jpeg'
    },
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model("user", userschema)