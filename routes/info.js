const express = require('express')
const router =express.Router()
const controller =require('../controllers/info')

router.get('/',controller.info)

module.exports = router