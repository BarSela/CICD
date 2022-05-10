const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;
var today = new Date();
    var date = today.getDate() + "-" +
    (today.getMonth() + 1) +"-" +
    today.getFullYear();
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      maxlength: 32
    },
   
    email: {
      type: String,
      required: true,
      unique: true,
    },
  
    password: {
      type: String,
      required: true,
    },
    userType:{
        type:String,
        
    },
    Date_of_Registretion: {
      type: String,
      required: true,
      default:date,
    },
    exsits:{
      type:String,
      required:true,
      default:"active",
    }

});    

module.exports = mongoose.model("User", userSchema);
