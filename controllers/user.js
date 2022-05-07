
const bcrypt = require("bcrypt"); //Password encryption
const jwt = require("jsonwebtoken");
const Trainee = require("../model/trainee");
const Trainer = require("../model/trainer");

module.exports = {
  signup: (req, res, next) => {
    var connected = "false";
    var status = "false";
    var userType = req.body.userType;
    var fullName = req.body.fullName;
    var businessName = req.body.businessName;
    var email = req.body.email;
    var password = req.body.password;
    var gender = req.body.gender;
    console.log(userType);
    if(userType == "trainee"){
        //checks if the email already exists in the databases
    Trainee.find({ email }).then((trainees) => {
        if (trainees.length >= 1) {
          return res.render("pages/signUp", {
            status: status,
            connected: connected,
          });
        }
  
        //Password encryption
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            return res.status(500).json({
              error,
            });
          }
          const trainee = new Trainee({
            fullName,
            email,
            password: hash,
            gender,
          });
          trainee.save().then((result) => {
              console.log("new trainee created");
              return res.redirect("/traineeDashboard");
            })
            .catch((error) => {
              res.status(500).json({
                error,
              });
              console.log("post error ");
            });
        });
      });
    }
    else if(userType == "trainer"){
        //checks if the email already exists in the databases
    Trainer.find({ email }).then((trainers) => {
        if (trainers.length >= 1) {
          return res.render("pages/signUp", {
            status: status,
            connected: connected,
          });
        }
  
        //Password encryption
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            return res.status(500).json({
              error,
            });
          }
          const trainer = new Trainer({
            fullName,
            businessName,
            email,
            password: hash,
            gender,
          });
          trainer.save().then((result) => {
              console.log("new trainer created");
              return res.redirect("/trainerDashboard");
            })
            .catch((error) => {
              res.status(500).json({
                error,
              });
              console.log("post error ");
            });
        });
      });
    }   
  },

  login: (req, res) => {
    const { email, password } = req.body;
    var loginStatus = "false";
    var connected = "false";
    Trainee.find({ email }).then((trainees) => {
      //If the user list is empty
      if (trainees.length === 0) {
        return res.render("pages/login", { loginStatus: loginStatus,connected: connected, });
      }

      const [user] = trainees;
      //Checking the password
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          return res.render("pages/login", {
            loginStatus: loginStatus,
            connected: connected,
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
            },
            "lihi",
            {
              //For how long the user can stay connected
              expiresIn: "1H", //1 hour
            }
          );

          console.log("Auth successful");
          return res.redirect("/traineeDashboard");
        }
        //If the password is incorrect
        return res.render("pages/login", {
          loginStatus: loginStatus,
          connected: connected,
        });
      });
    });
  },
};