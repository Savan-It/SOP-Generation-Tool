const mongoose = require('mongoose') 
const env = require('dotenv').config()

const connection = async () =>{
    try {
        await mongoose.connect(process.env.DATABASE,{ useUnifiedTopology:true, useNewUrlParser: true})
        console.log("Database successfully Connected!!");
        
    } catch (error) {
        console.log(`Error while connecting with databse :`, error.message);
    }
}

module.exports = connection;