const mongoose = require('mongoose')

const lectureSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    meetLink:{
        type:String,
    }
})
const Lecture = mongoose.model('Lecture',lectureSchema)
module.exports = {Lecture,lectureSchema}