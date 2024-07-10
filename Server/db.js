const mongoose = require("mongoose");
mongoose.set('strictQuery', true)
function connectDB(){
  

    mongoose.connect('mongodb://localhost:27017/bike-rent' , {useUnifiedTopology: true , useNewUrlParser: true})

    const connection = mongoose.connection
    // mongoose.set('strictQuery', false);
    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose