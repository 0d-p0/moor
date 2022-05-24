const express = require('express')
const { registerNewHouse, createRoom, getHouses, allHouses, checkLocation, nearyByHouses, uploadImage, uploadRoomImages } = require('../controller/house')
const { authUser } = require('../controller/user')

const multer = require("multer")
const { isAuthenticated } = require('../middleware/auth')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
var upload = multer({ storage: storage })


const router=express.Router()

router.route('/uploadimage').post(upload.single('profile-file'),uploadImage)
router.route('/uploadroomImages').post(upload.array('room',10),uploadRoomImages) 


router.route("/registerhouse/:id").post(registerNewHouse)

router.route("/createroom/:id").post(isAuthenticated,createRoom)
router.route('/userhouse').get(authUser,getHouses)

router.route('/allhouse').get(allHouses)

router.route('/cl/:id').post(checkLocation)

router.route('/nh').get(nearyByHouses)


module.exports=router

