// const passport =require("passport")

const GoogleStrategy = require('passport-google-oauth20').Strategy

const { findById } = require('../models/User')
const User = require("../models/User")

  module.exports = function(passport){
    
    passport.use(new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_SECRET,
        callbackURL:"http://localhost:4000/api/account/google",
        proxy:true
    },

  
    
  async  function(accessToken,refreshToken,profile,done){
        let newUser = {
        name:profile.displayName,
        email:profile.emails[0].value,
        avatar: profile.photos[0].value,
        }


        
        try {
                
          // console.log(`new user = ${newUser}`)
        const user = await User.findOne({email:profile.emails[0].value})

        if (user) {
             return done(null, user);
          } else {
            await User.create(newUser);
            console.log("user created")
           return done(null, user);
          }

        } catch (error) {
            console.log(error);
        }

        // return done(null,profile)
    }))

    passport.serializeUser((user,cb)=>{
        cb(null,user)
    })
    
    passport.deserializeUser((user,cb)=>{
        cb(null,user)
    })
  }





// module.exports=passport