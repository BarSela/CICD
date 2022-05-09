const bcrypt = require("bcrypt"); //Password encryption
const jwt = require("jsonwebtoken");
const Trainee = require("../model/trainee");
const Trainer = require("../model/trainer");
const User = require("../model/user");
var userEmail = "";
var userType = "";
module.exports = {
  signup: (req, res, next) => {
    let status = "false";
    let userType = req.body.userType;
    let fullName = req.body.fullName;
    let businessName = req.body.businessName;
    let email = req.body.email;
    let password = req.body.password;
    let male = req.body.male;
    let female = req.body.female;
    let other = req.body.other;
    let gender = req.body.gender;

    //trainee user
    if (userType == "trainee") {
      //checks if the email already exists in the databases
      Trainee.find({ email }).then((trainees) => {
        if (trainees.length >= 1) {
          return res.render("pages/signUp", {
            status: status,
            userEmail: userEmail,
          });
        }

        //Password encryption
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            return res.status(500).json({
              error,
            });
          }
          const user = new User({ email, password: hash, userType });
          user
            .save()
            .then((result) => {
              console.log("new user created");
            })
            .catch((error) => {
              res.status(500).json({
                error,
              });
              console.log("post error ");
            });
          const trainee = new Trainee({
            fullName,
            email,
            password: hash,
            gender,
          });
          trainee
            .save()
            .then((result) => {
              console.log("new trainee created");
              res.redirect("/traineeDashboard/" + trainee._id);
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
    else if (userType == "trainer") {
      //checks if the email already exists in the databases
      Trainer.find({ email }).then((trainers) => {
        if (trainers.length >= 1) {
          return res.render("pages/signUp", {
            status: status,
            userEmail: userEmail,
          });
        }

        //Password encryption
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            return res.status(500).json({
              error,
            });
          }
          const user = new User({ email, password: hash, userType });
          user
            .save()
            .then((result) => {
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
          trainer
            .save()
            .then((result) => {
              console.log("new trainer created");
              // res.status(200).render("/createBusinessProfile",{userId:result._id});
              userID = trainer._id.toString();
              return res.redirect("/createBusinessProfile/" + trainer._id);
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
    const email = req.body.email;
    const password = req.body.password;
    var loginStatus = "false";
    console.log("email1 : " + email);
    User.find({ email: email }).then((users) => {
      //If the user list is empty
      if (users.length === 0) {
        return res.render("pages/login", {
          loginStatus: loginStatus,
          userEmail: userEmail,
        });
      }

      const [user] = users;
      //Checking the password
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          return res.render("pages/login", {
            loginStatus: loginStatus,
            userEmail: userEmail,
          });
        }
        if (result) {
          userEmail = email;
          if (user.userType == "trainer") {
            userType = "trainer";

            console.log("trainer if \n");
            // Trainer.find({email:email}).then((trainers) => {
            //   //If the user list is empty
            //   if (trainers.length === 0) {
            //     console.log("error - failed to load user");

            //   }
            //   else{
            //   const [trainer] = trainers;
            //   user._id = trainer._id;
            //   console.log("trainer: "+trainer);
            //   }

            // });
            console.log("Auth successful");
            return res.redirect("/createBusinessProfile/" + user.email);
          } else if (user.userType == "trainee") {
            userType = "trainee";
            // Trainee.find({ email:email }).then((trainees) => {
            //   //If the user list is empty
            //   if (trainees.length === 0) {
            //     console.log("error - failed to load user");
            //   }
            //   else{
            //   const [trainee] = trainees;
            //   console.log("trainee: "+trainee);
            //   user._id = trainee._id;
            //   }

            // });
            console.log("Auth successful");
            console.log("userID: " + user.email);
            return res.redirect("/traineeDashboard/" + user.email);
          }
        }
        //If the password is incorrect
        return res.render("pages/login", {
          loginStatus: loginStatus,
          userEmail: userEmail,
        });
      }); //end bcrypt
    }); //end User.find
  },
  createBusinessP: async (req, res, next) => {
    let specialty = req.body.specialty;
    let city = req.body.city;
    let phone = req.body.phone;
    let about = req.body.about;
    let schoolName = req.body.schoolName;
    let schoolDate = req.body.date;
    let schoolInfo = req.body.info;

    let hebrew = req.body.hebrew;
    let english = req.body.english;
    let spanish = req.body.spanish;
    let russian = req.body.russian;
    let arabic = req.body.arabic;

    console.log("city");
    console.log(city);
    console.log("hebrew");
    console.log(hebrew);
    const trainer = await Trainer.findOneAndUpdate(
      { email: userEmail },
      {
        $set: {
          specialty: specialty,
          city: city,
          phone: phone,
          about: about,
          schoolName: schoolName,
          schoolDate: schoolDate,
          schoolInfo: schoolInfo,
          hebrew: hebrew,
          english: english,
          spanish: spanish,
          russian: russian,
          arabic: arabic,
        },
      }
    );
  },
  editBusinessP: async (req, res, next) => {
    let businassName = req.body.BusinessName;
    let fullName = req.body.fullName;
    let specialty = req.body.specialty;
    let city = req.body.city;
    let phone = req.body.phone;
    let about = req.body.about;
    let schoolName = req.body.schoolName;
    let schoolDate = req.body.date;
    let schoolInfo = req.body.info;

    let hebrew = req.body.Hebrew;
    let english = req.body.english;
    let russian = req.body.russian;
    let spanish = req.body.spanish;
    let arabic = req.body.arabic;

    const trainer = await Trainer.findOneAndUpdate(
      { email: userEmail },
      {
        $set: {
          businassName: businassName,
          fullName: fullName,
          specialty: specialty,
          city: city,
          phone: phone,
          about: about,
          schoolName: schoolName,
          schoolDate: schoolDate,
          schoolInfo: schoolInfo,
          hebrew: hebrew,
          english: english,
          spanish: spanish,
          russian: russian,
          arabic: arabic,
        },
      }
    );

  },
};
