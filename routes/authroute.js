
const express = require('express')
const router = express.Router()
const {createNewUser} = require('../generalcontroller/authcontroller')


router.post('/register', createNewUser)
router.post('/login', createNewUser)

module.exports = router