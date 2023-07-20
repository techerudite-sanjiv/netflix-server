const { Router }=require('express');
const authController= require('../controller/auth')
const movieController= require('../controller/Movies')
const checkUserAuth = require('../middlewares/authMiddleware')
const User =require('../models/User');


const route=new Router()

// Auth Controller api list
route.post('/userLogin',authController.userLogin)
route.post('/userRegister',authController.userRegister)
route.post('/changePassword',authController.changePassword)
route.post('/sendPasswordEmail',authController.sendUserPasswordEmail)


route.post('/registerMovie',movieController.registerMovies)



module.exports=route



