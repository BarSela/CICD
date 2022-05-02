const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

// trainer schema
const trainerUser = new mongoose.Schema({
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

  specialty: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  phone: {
    type: Int16Array,
    required: true,
  },

  exist: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Trainer", trainerUser);
