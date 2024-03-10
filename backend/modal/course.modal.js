const mongoose = require("mongoose")
const { lectureSchema } = require("./lecture.modal")

const courseSchema = new mongoose.Schema({
    title:{
    required:true,
    type:String
    },
    lectures: [lectureSchema] 

})

const Course = mongoose.model("Course",courseSchema)
module.exports = {Course}