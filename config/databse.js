const mongoose = require('mongoose')
// mongodb://localhost:27017/anotherHome
exports.connectDataBase = () => {
    mongoose.connect('mongodb+srv://pritam:kVw1Fo0oc53TTp3F@cluster0.chv6f.mongodb.net/?retryWrites=true&w=majority').then((con) => console.log(`dataBase connected :${con.connection.host}`)).catch((err) => console.log(err))
}