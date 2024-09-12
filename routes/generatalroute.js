const express = require('express')
const router = express.Router()

const {
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
    getPost,
    addProductnow
} = require('../generalcontroller/taskfunction')


router.get('/', getHomenow)
router.get('/about', getAboutUs)
router.get('/contact', getContact)
//router.get('/auth', getContact)
router.get('/post', getPost)
router.post('/contact', postContactNow)
router.post('/post', addProductnow)
router.get('/blog', getBlog)
router.get('/shop', getShop)
router.get('/product/:id', getProductdetails)
router.get('/checkout', getCheckout)
router.get('/wishlist', getWishlist)
router.get('/blog/:id', getBlogdetails)
router.get('/auth', getAuth)

module.exports = router