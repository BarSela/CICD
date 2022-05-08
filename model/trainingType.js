const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;


const trainingType = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
  },
  
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  
  
});

module.exports = mongoose.model("TrainingType", trainingType);
