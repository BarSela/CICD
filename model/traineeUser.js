const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

// trainee schema
const traineeUser = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    maxlength: 32,
  },

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

  gender: {
    type: String,
    required: true,
  },

  Date_of_Registretion: {
    type: Date,
    required: true,
  },

  exist: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Trainee", traineeUser);
