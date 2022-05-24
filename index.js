const app = require('./app')
const { connectDataBase } = require('./config/databse')

connectDataBase()


app.listen(process.env.PORT,()=>{
    console.log("server run on "+process.env.PORT)
})