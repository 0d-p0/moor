const User = require("../models/User");

const jwt = require("jsonwebtoken")


exports.isAuthenticated = async (req,res,next)=>{
    try {
        const {token} = req.cookies

    if(!token){
        return res.status(401).json({
            sucess:false,
            message:"please login first"
        })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    
    req.user=await User.findById(decode._id)
    console.log(req.user)
    next()
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}