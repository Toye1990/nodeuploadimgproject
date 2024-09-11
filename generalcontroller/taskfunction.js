
const Joi = require('joi')
const thecontactmodel = require('../model/mycontactmodel')
/*const validateproduct = require('../middleware/validate')*/
const {productmark} = require('../middleware/validate')
const path = require('path')
const fs = require('fs')
const {generatecharc, generatenewname} = require('../middleware/generatecode')
const productmodel = require('../model/productmodel')


 getHomenow = async(req, res) =>{
    try{
        res.render('index')
    }catch(err){
        console.log(err)
        res.render('404', {status: 500, message: "internal error occurred"})
    }
}

const getAboutUs = async(req, res) =>{
    try{
        res.render('about-us')
    }catch(err){
        console.log(err)
        res.render('404', {status: 500, message: "internal error occurred"})
    }
}

const getBlog = async(req, res) =>{
    try{
        res.render('blog')
    }catch(err){
        console.log(err)
        res.render('404', {status: 500, message: "internal error occurred"})
    }
}

const getContact = async(req, res) =>{
    try{
        res.render('contact-us')
    }catch(err){
        console.log(err)
        res.render('404', {status: 500, message: "internal error occurred"})
    }
}

const getAuth = async(req, res) =>{
    try{
        res.render('logim-register')
    }catch(err){
        console.log(err)
        res.render('404', {status: 500, message: "internal error occurred"})
    }
}


const getShop = async(req, res) =>{
    try{
        res.render('shop')
    }catch(err){
        console.log(err)
        res.render('404', {status: 500, message: "internal error occurred"})
    }
}


const getProductdetails = async(req, res) =>{
    try{
        res.render('product-details')
    }catch(err){
        console.log(err)
        res.render('404', {status: 500, message: "internal error occurred"})
    }
}


const getWishlist = async(req, res) =>{
    try{
        res.render('wishlist')
    }catch(err){
        console.log(err)
        res.render('404', {status: 500, message: "internal error occurred"})
    }
}

const getCart = async(req, res) =>{
    try{
        res.render('cart')
    }catch(err){
        console.log(err)
        res.render('404', {status: 500, message: "internal error occurred"})
    }
}

const getCheckout = async(req, res) =>{
    try{
        res.render('checkout')
    }catch(err){
        console.log(err)
        res.render('404', {status: 500, message: "internal error occurred"})
    }
}

const getBlogside = async(req, res) =>{
    try{
        res.render('blog-sidebar')
    }catch(err){
        console.log(err)
        res.render('404', {status: 500, message: "internal error occurred"})
    }
}

const getBlogdetails = async(req, res) =>{
    try{
        res.render('blog-details')
    }catch(err){
        console.log(err)
        res.render('404', {status: 500, message: "internal error occurred"})
    }
}

const addProductnow = async(req, res) =>{
    try{
        const { error } = productmark(req.body)
        if(error){
           return res.render('post', {message:error.details[0].message, error:true})
        }
        if (!req.files?.images) {
            return res.render("post", { message: "Image is required", error: true });
          }
      
          const images = req.files.images;

        if(!Array.isArray(images)){
            return  res.render('post', {message:"multiple images are required", error:true})
        }

        if (images.length < 4) {
            return res.render('post', {message: "image must be at least 4", error: true})
        }
        
        let filesize = 0
        for(const file of images){
            const allowedExtension = /png|jpg|jpeg/
            const filename = file.name
            const fileExtension = filename.split('.').pop()
            const lowercaseform = fileExtension.toLowerCase()
            if(!allowedExtension.test(lowercaseform)){
               return res.render("post", {message:`You upload an invalid format for ${filename}`, error: true})
            }
            filesize += file.size
        }

        const maxsize = 10 * 1024 * 1024

        if(filesize > maxsize){
            return res.render('post', {message:`file too large (10mb limit)`, error: false}) 
        }

        const storeimages = path.join(__dirname, "../public/uploads")
        if(!fs.existSync(storeimages)){
            fs.mkdirSync(storeimages)
        }

        const imageArray = await Promise.all(
            images.map(async (img)=>{
                const uniquenames = await generatenewname(img.name)
                const filepath = path.join(storeimages, uniquenames)
                img.mv(filepath, (err)=>{
                    if(err){
                        return res.render("post", {message:`error occurred while trying to upload ${img.name}`})
                    }
                })
                return `/uploads/${uniquenames}`
            })
        )

        const sku = await generatecharc()
        const {title, oldprice, newprice, color, sizes, quantity, description, tags, brands} = req.body
        const displaynow = imageArray[0]
        await productmodel.create({
            displayImage: displaynow, 
            title, 
            oldprice, 
            newprice, 
            color: color.split(","), 
            sizes: sizes.split(","), 
            quantity, 
            description, 
            tags, 
            sku: sku,
            images: imageArray,
            brands
        })
              
        return res.render('post', {message:"product added successfully", error: false})
    }catch(err){
        console.log(err)
        res.render('404', {status:500, title:'internal error', heading:'Oops seems your link..is broken'})
    }
}

const getPost = async(req, res) =>{
    try{
        res.render('post')
    }catch(err){
        console.log(err)
        res.render('404', {status: 500, message: "internal error occurred"})
    }
}

const postContactNow = async(req, res) =>{
   try{
    const Schema = Joi.object({
        name: Joi.string().required(3).max(50),
        email: Joi.string().required().email(),
        subject: Joi.string().required().min(3),
        phone: Joi.number().required().min(11),
        message: Joi.string().required().min(10)
    })

    const { error } = Schema.validate(req.body, { abortEarly: false })

    if(error){
        return res.render('contact-us', {
            message: error.details[0].message,
            error: true,
        })
    }

    const {name, email, subject, phone, message} = req.body

    await thecontactmodel.create({
        name,
        email,
        subject,
        phone,
        message
    })

    res.render('contact-us', {message:'form submitted successfully', error: false})

   }catch(err){
    console.log(err)
    res.render('contact-us', { errormessage:"error occurred", error: true })
   }
}



module.exports = {
    getHomenow, 
    getAboutUs,
    getAuth,
    getBlog,
    getContact,
    getShop,
    getProductdetails,
    getWishlist,
    getBlogdetails,
    getCheckout,
    postContactNow,
    getCart,
    getPost,
    addProductnow,
    getBlogside
 }