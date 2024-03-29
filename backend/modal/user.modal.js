const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin:{
        type:Boolean,
        required:true
    
    },
    courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
  }]
  });
  
  const User = mongoose.model("User",userSchema)
  module.exports = {User}
  