const express = require('express')
const router = express.Router()
const {accountfunct} = require('../generalcontroller/accountcontroller')


router.get('/', accountfunct)

module.exports = router;