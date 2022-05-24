const House = require("../models/House");
const User = require("../models/User");
const multer = require("multer")

exports.uploadImage=async(req,res)=>{
    try {
        if (req.file) {
            console.log(req.file)
            return res.send(req.file.filename)
          }
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
}

exports.uploadRoomImages=async(req,res)=>{
    try {
        if(req.files){
            console.log(req.files)
             let data=[]
              for (var i = 0; i < req.files.length; i++) {
             data.push(req.files[i].filename)
             
          }
          res.send(data)
        }
        
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
}

exports.registerNewHouse = async (req, res) => {
    try {

        const { name, lat,lang,pictures } = req.body

        let user = await User.findById(req.params.id)
        // todo  req.params.id  is change to req.user._id when we add proper auth


        // todo before below lines are execute we have to check current user and params id is same
        let newHouse = await House.create({
            name,  loc: {
                coordinates: [
                   lat,
                   lang
                ]
            }, pictures, owner: req.params.id
        })


        user.houses.push(
            newHouse._id
        )

        await user.save()

        res.status(201).json({ sucess: true, newHouse, message: "register sucessfull" });

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
}


exports.checkLocation = async (req, res) => {

    try {
        const { name, pictures } = req.body
        let user = await User.findById(req.params.id)
        // todo  req.params.id  is change to req.user._id when we add proper auth


        // todo before below lines are execute we have to check current user and params id is same 

        let newHouse = await House.create({
            name, loc: {
                coordinates: [
                    req.body.lat,
                    req.body.lang
                ]
            }, pictures, owner: req.params.id
        })

        res.status(201).json({ sucess: true, newHouse, message: "register sucessfull" });


    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
}


exports.nearyByHouses = async (req, res) => {
    try {
        House.find({
            loc: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [
                            req.body.lang,
                            req.body.lat
                        ]
                    },
                    $maxDistance: 280
                }
            }
        }).exec((err, loc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    status: false,
                    data: err
                })
            }

            if (loc) {
                console.log(loc)
                return res.status(200).json({
                    status: true,
                    data: loc
                })
            }
        })

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
}


exports.createRoom = async (req, res) => {
    try {
        const { name, price, photos, roomSlots, description } = req.body

        const house = await House.findById(req.params.id)

        if (!house) {
            return res.status(404).json({
                sucess: false,
                message: "house not found",
            });
        }


        house.rooms.push({ name, price, photos, roomSlots, description })

        await house.save()


        res.status(201).json({
            sucess: true,
            post: house
        })

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }

}


exports.getHouses = async (req, res) => {
    try {
        // if we do in clint site then req.user._id  and if we do in postman then req.params.id

        const house = await House.find({ owner: req.user._id })



        if (house.length <= 0) {
            return res.status(404).json({
                sucess: false,
                message: "house not found",

            });
        }

        if (house) {
            return res.status(200).json({
                sucess: true,
                message: "housefound",
                house
            });
        }

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
}




exports.allHouses = async (req, res) => {

    try {

        const house = await House.find({})



        if (house.length <= 0) {
            return res.status(404).json({
                sucess: false,
                message: "house not found",

            });
        }

        if (house) {
            return res.
                status(200).json({
                    sucess: true,
                    message: "housefound",
                    house
                })
        }

        // res.send({sucess:true,  message: "housefound", house})

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
}