const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a name"]
  },
  email: {
    type: String,
    required: [true, "please enater a email"],
    unique: [true, "email alredy exist"]
  },
  avatar: {
    type: String
  },
  userType: {
    type: String,
    enum: ["renter", "landowner", "admin"],
    default: "renter"
  },
   houses: [{
    type: mongoose.Schema.Types.ObjectId,
        ref: "House"
  }]
})


userSchema.methods.generateToken = function (){
  return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}
module.exports = mongoose.model("User", userSchema)