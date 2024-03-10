const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
 async function connectToDb(){
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            
        })
        return mongoose.connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = {connectToDb}