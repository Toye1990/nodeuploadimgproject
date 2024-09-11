//const { number, string } = require('joi')

const mongoose = require("mongoose")


const contactschema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    email:{
        type: String,
        required: [true, "Email Address is required"]
    },
    subject:{
        type: String,
        required: [true, "Subject is required"]
    },
    phone:{
        type: Number,
        required: [true, "Phone Number is required"]
    },
    message:{
        type: String,
        required: [true, "Message is required"]
    },
    date:{
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("Contact", contactschema)









/*const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'name cannot be empty']
    },
    email:{
      type: String,
      required: [true, 'email cannot be empty']
    },
    subject: {
        type: String,
        required: [true,'subject cannot be empty']
    },
    phone:{
       type: Number,
       required: [true, 'phone number cannot be empty']
    },
    message:{
      type: String,
      required: [true, 'message canno be empty']
    },
    date:{
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('mycontact', contactSchema)*/