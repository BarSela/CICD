const bcrypt = require("bcrypt"); //Password encryption
const Trainee = require("../model/trainee");
const Trainer = require("../model/trainer");
const User = require("../model/user");
const TrainingType = require("../model/trainingType");
const res = require("express/lib/response");

var userEmail = "";
var userType = "";
module.exports = {
  signup: async (req, res, next) => {
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
              userType = trainee.userType;
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
              userEmail = trainer.email;
              userType = trainer.userType;
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

  login: async (req, res) => {
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
            console.log("trainer");
            console.log("Auth successful");
            return res.redirect("/trainerDashboard/" + user.email);
          } else if (user.userType == "trainee") {
            userEmail = user.email;
            userType = "trainee";
            console.log("trainee");
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

    let typeName1 = req.body.typeName1;
    let typeName2 = req.body.typeName2;
    let typeName3 = req.body.typeName3;
    let typeName4 = req.body.typeName4;

    let typeDuration1 = parseInt(req.body.typeDuration1);
    let typeDuration2 = parseInt(req.body.typeDuration2);
    let typeDuration3 = parseInt(req.body.typeDuration3);
    let typeDuration4 = parseInt(req.body.typeDuration4);

    let typePrice1 = parseInt(req.body.typePrice1);
    let typePrice2 = parseInt(req.body.typePrice2);
    let typePrice3 = parseInt(req.body.typePrice3);
    let typePrice4 = parseInt(req.body.typePrice4);

    let typeId1 = "";
    let typeId2 = "";
    let typeId3 = "";
    let typeId4 = "";
    let trainingType1;
    let trainingType2;
    let trainingType3;
    let trainingType4;
    let trainer;
     trainingType1 ={
      name: typeName1.toString(),
      duration: typeDuration1,
      price: typePrice1,
    }

    console.log("trainingtype:" + trainingType1);
    
    if (typeName2) {
        trainingType2 ={
        name: typeName2.toString(),
        duration: typeDuration2,
        price: typePrice2,
      }
      
    }
    else{
      trainingType2 ={
        name:"empty"
      }
    }   
    console.log("trainingtype:" + trainingType2);
      
    if (typeName3) {
      trainingType3 ={
        name: typeName3.toString(),
        duration: typeDuration3,
        price: typePrice3,
      }
      
    }
    else{
      trainingType3 ={
        name:"empty"
      }
    }
    if (typeName4) {
      trainingType4 ={
        name: typeName4.toString(),
        duration: typeDuration4,
        price: typePrice4,
      }
    }
    else{
      trainingType4 ={
        name:"empty"
      }
    }
    console.log(trainingType4);
    console.log(typeId1);
    console.log(typeId2);
    console.log(typeId3);
    console.log(typeId4);

    trainer = await Trainer.findOneAndUpdate(
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
          trainingTypes:[trainingType1,trainingType2,trainingType3,trainingType4]
    
          },
          
        },
      
    );

    if (trainer) {
      console.log(trainer);
      console.log("1");
      
      return res.redirect("/businessProfile");
    }
      else{
        res.redirect("/");
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
      res.render("/businessProfile", trainer);
    } else {
      console("Error to find trainer");
      res.render("/");
    }
  },
  editPersonalprofile: async (req, res) => {
    var fullName = req.body.fullName;
    var newEmail = req.body.email;
    var gender = req.body.gender;
    var status = "false";
    const currUser = await User.findOne({ email: userEmail });

    //check if the new email already exsits in the DB
    let user = await User.findOne({ email: newEmail });
    console.log(user);
    if (user != null && newEmail != userEmail) {
      console.log("if user");
      console.log(userEmail);
      console.log(currUser);
      return res.render("pages/editPersonalProfile", {
        userEmail: userEmail,
        user: currUser,
        status: status,
      });
    }
    let userT = currUser.userType;
    //else
    user = await User.findOneAndUpdate(
      { email: userEmail },
      {
        $set: {
          fullName: fullName,
          email: newEmail,
        },
      }
    );

    if (user) {
      console.log("Email updated successfully");

      console.log(userT);
    } else {
      console.log("Failed to update email (profile Page -user)");
      res.redirect("/");
    }
    if (userT == "trainer") {
      const trainer = await Trainer.findOneAndUpdate(
        { email: userEmail },
        {
          $set: {
            fullName: fullName,
            email: newEmail,
            gender: gender,
          },
        }
      );
      if (trainer) {
        userEmail = newEmail;
        return res.redirect("personalProfile/" + newEmail);
      } else {
        console.log("Failed to update email (profile Page - trainer)");
        res.redirect("/");
      }
    } else if (userT == "trainee") {
      console.log(newEmail);
      const trainee = await Trainee.findOneAndUpdate(
        { email: userEmail },
        {
          $set: {
            fullName: fullName,
            email: newEmail,
            gender: gender,
          },
        }
      );
      console.log(trainee);
      if (trainee) {
        console.log(newEmail);
        userEmail = newEmail;
        return res.redirect("personalProfile/" + newEmail);
      } else {
        console.log("Failed to update email (profile Page - trainee)");
        res.redirect("/");
      }
    }
  },
  editPassword: async (req, res) => {
    let currPassword = req.body.currPassword;
    let newPassword = req.body.newPassword;
    let status = "false";
    User.find({ email: userEmail }).then((users) => {
      //If the user list is empty
      if (users.length === 0) {
        return res.render("pages/editPersonalProfile", {
          status: status,
          user: userEmail,
        });
      }

      const [user] = users;
      //Checking the password
      bcrypt.compare(currPassword, user.password, async (error, result) => {
        if (error) {
          return res.render("pages/editPersonalProfile", {
            loginStatus: loginStatus,
            user: userEmail,
          });
        }
        if (result) {
          if (user.userType == "trainer") {
            const userU = await User.findOneAndUpdate(
              { email: userEmail },
              {
                $set: {
                  password: newPassword,
                },
              }
            );
            if (userU) {
              const trainer = await Trainer.findOneAndUpdate(
                { email: userEmail },
                {
                  $set: {
                    password: newPassword,
                  },
                }
              );
              if (trainer) {
                return res.redirect("/personalProfile");
              } else {
                console("Error to find trainer");
                return res.render("/");
              }
            } else {
              console("Error to find user");
              return res.render("/");
            }
          } else if (user.userType == "trainee") {
            console.log("okkkkkkkkkkkk trainer");
            const userU = await User.findOneAndUpdate(
              { email: userEmail },
              {
                $set: {
                  password: newPassword,
                },
              }
            );
            console.log("update1");
            if (userU) {
              const trainee = await Trainee.findOneAndUpdate(
                { email: userEmail },
                {
                  $set: {
                    password: newPassword,
                  },
                }
              );
              console.log("update2");
              if (trainee) {
                return res.redirect("/personalProfile");
              } else {
                console("Error to find trainee");
                res.render("/");
              }
            } else {
              console("Error to find user");
              res.render("/");
            }
          }
        }
        //If the password is incorrect
        return res.render("pages/editPersonalProfile", {
          status: status,
          user: userEmail,
          userEmail: userEmail,
        });
      }); //end bcrypt
    }); //end User.find

    console.log("okkkkkkkkkkkk");
  },
  deleteAccount: async (req, res) => {
    const currUser = await User.findOne({ email: userEmail });
    let userType = currUser.userType;
    console.log(userType);
    if (userType == "trainer") {
      const user = await Trainer.findOneAndDelete({ email: userEmail });
    }
    if (userType == "trainee") {
      const user = await Trainee.findOneAndDelete({ email: userEmail });
    }
    const user = await User.findOneAndDelete({ email: userEmail });

    if (user) {
      userEmail = "";
      return res.redirect("/logout");
    } else {
      console("Error to find user-fail delete account");
      res.render("/");
    }
  },

  editTrainingTypes: async (req, res) => {
    let typeName1 = req.body.typeName1;
    let typeName2 = req.body.typeName2;
    let typeName3 = req.body.typeName3;
    let typeName4 = req.body.typeName4;

    let typeDuration1 = parseInt(req.body.typeDuration1);
    let typeDuration2 = parseInt(req.body.typeDuration2);
    let typeDuration3 = parseInt(req.body.typeDuration3);
    let typeDuration4 = parseInt(req.body.typeDuration4);

    let typePrice1 = parseInt(req.body.typePrice1);
    let typePrice2 = parseInt(req.body.typePrice2);
    let typePrice3 = parseInt(req.body.typePrice3);
    let typePrice4 = parseInt(req.body.typePrice4);

    let trainingType1;
    let trainingType2;
    let trainingType3;
    let trainingType4;
    let trainer;
    const currtrainer = await Trainer.findOne({ email: userEmail });

    trainingType1 = {
      name: typeName1.toString(),
      duration: typeDuration1,
      price: typePrice1,
    };
    currtrainer = await Trainer.findOneAndUpdate(
      { email: userEmail },
      {
        $set: {
          trainingTypes: [trainingType1],
        },
      }
    );
    console.log("trainingtype:" + trainingType1);

    if (typeName2) {
      trainingType2 = {
        name: typeName2.toString(),
        duration: typeDuration2,
        price: typePrice2,
      };
      currtrainer = await Trainer.findOneAndUpdate(
        { email: userEmail },
        {
          $set: {
            trainingTypes: [trainingType2],
          },
        }
      );
    }
    console.log("trainingtype:" + trainingType2);

    if (typeName3) {
      trainingType3 = {
        name: typeName3.toString(),
        duration: typeDuration3,
        price: typePrice3,
      };
      currtrainer = await Trainer.findOneAndUpdate(
        { email: userEmail },
        {
          $set: {
            trainingTypes: [trainingType3],
          },
        }
      );
    }
    if (typeName4) {
      trainingType4 = {
        name: typeName4.toString(),
        duration: typeDuration4,
        price: typePrice4,
      };
      currtrainer = await Trainer.findOneAndUpdate(
        { email: userEmail },
        {
          $set: {
            trainingTypes: [trainingType4],
          },
        }
      );
    }
    console.log("111");
    return res.redirect("/businessProfile");
  },
 
};