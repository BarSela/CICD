
const bcrypt = require("bcrypt"); //Password encryption
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongoose/lib/schema/index");
const Trainee = require("../model/trainee");
const Trainer = require("../model/trainer");
const User = require("../model/user");
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
  
    if(male){
      gender = "male";
    }
    else if(female){
      gender ="female";
    }
    else if (other){
      gender = "other";
    }
    //trainee user 
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
          const user = new User({email,password:hash,userType});
          user.save().then((result) => {
            console.log("new user created");
          })
          .catch((error) => {
            res.status(500).json({
              error,
            });
            console.log("post error ");
          });
          const trainee = new Trainee({fullName, email,  password: hash, gender});
          trainee.save().then((result) => {
              console.log("new trainee created");
              
              res.redirect("/traineeDashboard/"+trainee._id);
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

    //trainer user
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
          const user = new User({email,password:hash,userType});
          user.save().then((result) => {
            console.log("new user created");
          })
          .catch((error) => {
            res.status(500).json({
              error,
            });
            console.log("post error ");
          });
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
              return res.redirect("/createBusinessProfile/"+trainer._id);
              
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
    
    User.find({ email }).then((users) => {
      //If the user list is empty
      if (users.length === 0) {
        return res.render("pages/login", { loginStatus: loginStatus,userID: userID});
      }

      const [user] = users;
      //Checking the password
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          return res.render("pages/login", {
            loginStatus: loginStatus,
            userID: userID,
          });
        }

        if (result) {
          res.user = user;
          req.user = user;
          console.log("user : "+ res.user);
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
          if(user.userType == "trainer"){
            console.log("Auth successful");
            return res.redirect("/createBusinessProfile/"+user._id);
          }
          else if(user.userType == "trainee"){
            console.log("Auth successful");
            return res.redirect("/traineeDashboard/"+user._id);
          }
          
        }
        //If the password is incorrect
        return res.render("pages/login", {
          loginStatus: loginStatus,
          userID: userID,
        });
      });
    });
  },
};