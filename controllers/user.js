const bcrypt = require("bcrypt"); //Password encryption
const Trainee = require("../model/trainee");
const Trainer = require("../model/trainer");
const TrainingType = require("../model/trainingType");
const user = require("../model/user");
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
          const user = new User({ fullName, email, password: hash, userType });
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
              userEmail = trainee.email;
              console.log("new trainee created");
              return res.redirect("/traineeDashboard/" + trainee.email);
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
          const user = new User({ fullName, email, password: hash, userType });
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
              userEmail = trainer.email;
              return res.redirect("/createBusinessProfile/" + trainer.email);
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
    userEmail = "";
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
          if (user.userType == "trainer") {
            userEmail = user.email;
            userType = "trainer";
            console.log("Auth successful");
            return res.redirect("/createBusinessProfile/" + user.email);
          } else if (user.userType == "trainee") {
            userEmail = user.email;
            userType = "trainee";
            console.log("Auth successful");
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
  createBusinessP: async (req, res) => {
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

    // let typeName1 = req.body.typeName1;
    // let typeName2 = req.body.typeName2;
    // let typeName3 = req.body.typeName3;
    // let typeName4 = req.body.typeName4;

    // let typeDuration1 = req.body.typeDuration1;
    // let typeDuration2 = req.body.typeDuration2;
    // let typeDuration3 = req.body.typeDuration3;
    // let typeDuration4 = req.body.typeDuration4;

    // let typePrice1 = req.body.typePrice1;
    // let typePrice2 = req.body.typePrice2;
    // let typePrice3 = req.body.typePrice3;
    // let typePrice4 = req.body.typePrice4;

    // console.log(typeName1);
    // console.log(typeDuration1);
    // console.log(typePrice1);

    // const trainingType = new TrainingType({
    //   typeName1,
    //   typeDuration1,
    //   typePrice1,
    // });
    // trainingType
    //   .save()
    //   .then((result) => {
    //     console.log("new training type created");
    //   })
    //   .catch((error) => {
    //     res.status(500).json({
    //       error,
    //     });
    //     console.log("post error ");
    //   });
    // console.log(typeof typeName2);
    // let trainingTypeId = trainingType._id.toString();
    // console.log("trainingTypeId: ");
    // console.log(trainingTypeId);
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
    if (trainer) {
      console.log("1");
      console.log(trainer);
      return res.redirect("/businessProfile");
    } else {
      console("Error to find trainer");
      return res.render("/");
    }
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
    if (trainer) {
      res.redirect("/businessProfile");
    } else {
      console("Error to find trainer");
      res.render("/");
    }
  },
  profile: async (req, res) => {
    var fullName = req.body.fullName;
    var email = req.body.email;
    console.log("profile");
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      {
        $set: {
          fullName: fullName,
          email: email,
        },
      }
    );
    if (user) {
      console.log("sucssefule");
    } else {
      console.log("user Error (profile Page -user)");
      res.redirect("/");
    }

    if (userType == "trainer") {
      const trainer = await Trainer.findOneAndUpdate(
        { email: userEmail },
        {
          $set: {
            fullName: fullName,
            email: email,
          },
        }
      );
      if (trainer) {
        console.log("sucssefule");
        return res.render("pages/personalProfile", {
          userEmail: userEmail,
          trainer,
        });
      } else {
        console.log("user Error (profile Page -trainer)");
        res.redirect("/");
      }
    } else if (userType == "trainee") {
      console.log(userEmail);

      const user = await Trainee.findOneAndUpdate(
        { email: userEmail },
        {
          $set: {
            fullName: fullName,
            email: email,
          },
        }
      );
      if (user) {
        console.log("sucssefule");
        return res.render("/updateProfile", { userEmail: userEmail, user });
      } else {
        console.log("user Error (profile Page -trainee)");
        res.redirect("/");
      }
    }
  },
};
