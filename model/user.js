const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    
  
    email: {
      type: String,
      required: true,
      unique: true,
      //match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
  
    password: {
      type: String,
      required: true,
    },
    userType:{
        type:String,
        
    }


});    

module.exports = mongoose.model("User", userSchema);
