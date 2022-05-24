const express = require("express")

const passport = require
    ("passport");
const { loginwithgoogle } = require("../controller/user");
const { isAuth } = require("../middleware/isauth");


const router = express.Router()

const auth01 = passport.authenticate('google', { scope: ['profile', 'email'] })


// router.get('/auth', passport.authenticate('google', { scope: ['profile', 'email'] }),loginwithgoogle);


router.route('/auth').get(auth01,(req,res)=>{
    return  res.status(201).json({ sucess: true, user, message: "register sucessfull" });
})

router.get('/auth/error', (req, res) => res.send('Unknown Error'))

router.get('/api/account/google', passport.authenticate('google', { failureRedirect: '/auth/error' }),
    function (req, res) {
        res.redirect('http://localhost:3000');
    }
);

router.route("/isuth").get(isAuth)


router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
  })
module.exports = router