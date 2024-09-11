const mongoose = require('mongoose')

const prodcontact = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Product title is required"],
        minLength: [3, "Product title must be at least 3 characters"]
    },

    newprice:{
        type: Number,
        required: [true, "New price is required"],
        min: [1, "newprice must be at least 1"]
    },

    oldprice:{
        type: Number,
        required: [true, "New price is required"],
        min: [1, "oldprice must be at least 1"]
    },
    color:{
        type: String,
        required: [true, "Color is required"]
    },
    sizes:{
        type: String,
        required: [true, "size is required"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        minLength: [10, "Description must be at least 10 characters"]
    },
    sku:{
        type: String
    },
    tags:{
        type: String,
        required: [true, "Tags are required"]
    },
    
    images:[{
        type: String,
        required: [true, "Image is required"]
    }],

    brands:[{
        type: String,
        required: [true, "brand is required"]
    }],

    quantity:{
        type: Number,
        min: [1, "quantity must be at least 1"],
    },
    displayImage:{
        type: Date,
        default: Date.now,
    },
    date:{
        type: Date,
        default: Date.now,
    }

})

module.exports = mongoose.model("productdata", prodcontact)