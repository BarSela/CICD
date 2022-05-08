
const bcrypt = require("bcrypt"); //Password encryption
const jwt = require("jsonwebtoken");
const Trainee = require("../model/trainee");
const Trainer = require("../model/trainer");
const Trainer = require("../model/trainer");
module.exports = {
  signup: (req, res, next) => {
    var userID = "";
    var status = "false";
    var userType = req.body.userType;
    var fullName = req.body.fullName;
    var businessName = req.body.businessName;
    var email = req.body.email;
    var password = req.body.password;
    var male = req.body.male;
    var female = req.body.female;
    var other = req.body.other;
    var gender = "male";
    console.log(male);
    if(male){
      gender = "male";
    }
    else if(female){
      gender ="female";
    }
    else if (other){
      gender = "other";
    }
    if(userType == "trainee"){
        //checks if the email already exists in the databases
    Trainee.find({ email }).then((trainees) => {
        if (trainees.length >= 1) {
          return res.render("pages/signUp", {
            status: status,
            userID: userID,
          });
        }
  
        //Password encryption
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            return res.status(500).json({
              error,
            });
          }

          // const trainer = await Trainee.findById();
          
          const trainee = new Trainee({
            fullName,
            email,
            password: hash,
            gender,
          });
          trainee.save().then((result) => {
              console.log("new trainee created");
              
              userID = trainee._id.toString();
              res.render("pages/createBusinessProfile",{userID:userID});
              // userID = trainee.find({ email })._id;
              
              // return res.redirect("/traineeDashboard",userID);
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
            userID: userID,
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
              // res.status(200).render("/createBusinessProfile",{userId:result._id});
              userID = trainer._id.toString();
              res.render("pages/createBusinessProfile",{userID:userID});
              // return res.redirect("/createBusinessProfile");

              // res.status(200).render("",{userId:result._id}).
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
    var userID = "";
    Trainee.find({ email }).then((trainees) => {
      //If the user list is empty
      if (trainees.length === 0) {
        Trainer.find({ email }).then((trainers) => {
          //If the user list is empty
          if (trainers.length === 0) {
            return res.render("pages/login", { loginStatus: loginStatus,userID: userID });
          }
    
          const [user] = trainers;
          //Checking the password
          bcrypt.compare(password, user.password, (error, result) => {
            if (error) {
              return res.render("pages/login", {
                loginStatus: loginStatus,
                userID: userID,
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
              return res.render("pages/traineeDashboard",{userID: userID});
            }
            //If the password is incorrect
            return res.render("pages/login", {
              loginStatus: loginStatus,
              userID: userID,
            });
          });
        });      }
      else {
      const [user] = trainees;
      //Checking the password
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          return res.render("pages/login", {
            loginStatus: loginStatus,
            userID: userID,
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
          return res.render("pages/traineeDashboard",{userID: userID});
        }
        //If the password is incorrect
        return res.render("pages/login", {
          loginStatus: loginStatus,
          userID: userID,
        });
      });
    }
    });
    
  },
};