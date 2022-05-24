const User = require("../models/User")

exports.registerUser = async (req, res) => {
  try {
    const { name, email, userType } = req.body;
    let user = await User.findOne({ name });

    console.log(user)

    if (user) {
      return res.status(400).json({
        sucess: false,
        message: "user alredy exist",
      });
    }

    user = await User.create({ name, email, userType });

    res.status(201).json({ sucess: true, user, message: "register sucessfull" });


  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
}

// not work
exports.loginwithgoogle = async (req, res) => {

  try {


    console.log("bbbbbbbbbbb             uuuuuuuuuuu")


  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
}



//get all user
exports.allUser = async (req, res) => {
  try {

    let user = await User.find({});
    if (user) {

      return res.status(200).json({
        sucess: true,
        user,
      });
    }




  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
}

// middleWare to check user is auth or not
exports.authUser = async (req, res, next) => {
  try {
     console.log("i",req.user)
    if (!req.user) {
      return res.status(401).json({
        sucess: false,
        message: "please login first"
      })
    }

    // else {
    //    return res.json({
    //         username: "req.user",
    //     });
    // }

    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
}

exports.logoutandroid = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.me = (req, res) => {
  try {
    if(req.user){
       return res.status(200).json({
        sucess: true,
        user: req.user
      })
    }
  
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
}



exports.loginwithgoogleAndroid = async (req, res) => {

  const { name, email, avatar } = req.body

  let newUser = {
    name,
    email,
    avatar,
  }

  try {
    // console.log(`new user = ${newUser}`)
    const user = await User.findOne({ email })

    const option = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    }
    if (user) {
      console.log("user exists")
      const token = await user.generateToken();
      console.log("jkhj")
      return res.cookie("token", token, option).status(201).json({
        sucess: true,
        message: "user alredy exists",
        user,
        token
      })
    } else {
      await User.create(newUser);
      const newuser = await User.findOne({ email: newUser.email })
      const token = await newuser.generateToken();

      // console.log("new user creted")
      // console.log(token)
      return res.cookie("token", token, option).status(201).json({
        sucess: true,
        message: "user created",
        user: newuser,
        token
      })
    }

  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "log in error",
      error
    })
  }
}