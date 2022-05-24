const express = require("express");

const app = express();
var cors = require("cors");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const fs = require("fs")

const multer = require("multer")


require("dotenv").config({ path: "./config/config.env" });

const passport = require("passport");
require("./config/passport")(passport);

// const cookieSession = require('cookie-session')/*

const session = require("express-session");

// only for check 
const House = require('./models/House')





// app.use(cookieSession({
//     name: 'google-auth-session',
//     keys: ['key1', 'key2']
// }))

//middleware
app.use(cors({
  origin: "http://localhost:3000" || "http://192.168.1.7:3000" || "http://localhost:8000", // <-- location of the react app were connecting to
  methods: "GET,POST",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser())

app.use(
  session({
    secret: "keybord",
    // resave: true,
    // saveUninitialized: true,
  })
);


app.use(passport.initialize());

app.use(passport.session());



/// 



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.post('/profile-upload-single', upload.single('profile-file'), async function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  // console.log(JSON.stringify(req.file))
  // var response = '<a href="/">Home</a><br>'
  // response += "Files uploaded successfully.<br>"
  // response += `<img src="${req.file.path}" /><br>`
  // return res.send(response)

  try {

    if (req.file) {
      console.log(req.file)

      return res.send(req.file)
    }
  } catch (error) {
    return res.send(error)
  }

  // try {
  //   const house = await House.findById("62600fe4cabd61e63faa9c92")

  //   if (!house) {
  //     return res.status(404).json({
  //       sucess: false,
  //       message: "house not found",
  //     });
  //   }

  //     // house.pictures.push(`http://localhost:3000/${req.file.path}`)  
  //     // await house.save()

  //  } catch (error) {
  //   res.status(500).json({
  //     sucess: false,
  //     message: error.message,
  // });
  // }

})





app.post('/profile-upload-multiple', upload.array('profile-files', 12), async function (req, res, next) {
  // req.files is array of `profile-files` files
  // req.body will contain the text fields, if there were any
  // var response = '<a href="/">Home</a><br>'
  // response += "Files uploaded successfully.<br>"
  // for (var i = 0; i < req.files.length; i++) {
  //   response += `<img src="${req.files[i].path}" /><br>`
  // }

  // return res.send(response)
  try {
       const data=[]
    if (req.files) {
      console.log(req.files)
      // for (var i = 0; i < req.files.length; i++) {
      //        console.log(i)
      //     }
      return res.send(req.files)
    }
  } catch (error) {
    return res.send(error)
  }

  // try {
  //   const house = await House.findById("6255485862a54b9b6223bc48")

  //   if (!house) {
  //     return res.status(404).json({
  //       sucess: false,
  //       message: "house not found",
  //     });
  //   }
  //   for (var i = 0; i < req.files.length; i++) {
  //     // response += `<img src="${req.files[i].path}" /><br>`
  //     house.pictures.push(`http://localhost:3000/${req.files[i].path}`)

  //   }
  //   console.log("upload..")
  //   await house.save()

  // } catch (error) {
  //   res.status(500).json({
  //     sucess: false,
  //     message: error.message,
  //   });
  // }
})



///








// importing routes
const user = require("./routes/user");
const house = require("./routes/house");
const auth = require("./routes/auth");

//useing routes
app.use("/api/v1", user);
app.use("/api/v1", house);
app.use("/", auth);

app.get("/", (req, res) => {

  if (req.user) {
    return res.status(200).send(`Welcome
 ${req.user.displayName}!`);

  }
  res.redirect("http://localhost:3000/")
});

app.get('/ok',(req,res)=>{
   return res.send("ok connection")
})

app.get('/home', (req, res) => {
 return res.send("ok")
})

module.exports = app;
