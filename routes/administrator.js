const express = require('express')
const router =express.Router()
const controller =require('../controllers/administrator')
const passport = require('passport')
var mypass = require('./../tools/passport')

router.get('/1',passport.authenticate('jwt',{session: false}),controller.category_display_costs_view)
router.post('/2',passport.authenticate('jwt',{session: false}),controller.category_display_income_view)
router.post('/3',passport.authenticate('jwt',{session: false}),controller.income_and_costs_display_view)
router.post('/4',passport.authenticate('jwt',{session: false}),controller.costs_display_view)
router.post('/5',passport.authenticate('jwt',{session: false}),controller.income_display_view)
router.get('/6',passport.authenticate('jwt',{session: false}),controller.people_display)
router.post('/7',passport.authenticate('jwt',{session: false}),controller.people_minus)

router.post('/9',passport.authenticate('jwt',{session: false}),controller.people_plus)
router.get('/10',passport.authenticate('jwt',{session: false}),controller.generateCode)
router.get('/11',passport.authenticate('jwt',{session: false}),controller.getCode)

module.exports = router