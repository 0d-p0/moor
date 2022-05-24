const express = require('express')

const passport  = require ("passport")


const { registerUser, allUser, authUser, me, loginwithgoogleAndroid, logoutandroid } = require('../controller/user')
const { isAuthenticated } = require('../middleware/auth')


const router=express.Router()


router.route("/register").post(registerUser)

router.route("/androidlogin").post(loginwithgoogleAndroid)

router.route("/me").get(isAuthenticated,me)

router.route("/alluser").get(allUser)

// router.route("/loginwithgoogle",passport.Authenticator('google')).get()

router.route("/logoutandroid").get(logoutandroid)
module.exports=router