const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;


const trainingType = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    maxlength: 32,
  },
  
  duration: {
    type: Number,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },

  
  
});

module.exports = mongoose.model("TrainingType", trainingType);
