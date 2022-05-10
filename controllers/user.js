const bcrypt = require("bcrypt"); //Password encryption
const Trainee = require("../model/trainee");
const Trainer = require("../model/trainer");
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
          const user = new User({fullName, email, password: hash, userType });
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
          trainee.save().then((result) => {
            userEmail = trainee.email;
              console.log("new trainee created");
              return res.redirect("/traineeDashboard/"+ trainee.email);
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
          const user = new User({fullName, email, password: hash, userType });
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
              return res.redirect("/createBusinessProfile/"+trainer.email);
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
    userEmail ="";
    var loginStatus = "false";
    console.log("email1 : " + email);
    User.find({ email:email }).then((users) => {
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
          
          if(user.userType == "trainer"){
            userEmail = user.email;
            userType = "trainer";
            console.log("Auth successful");
            return res.redirect("/createBusinessProfile/"+ user.email);
          }
          else if(user.userType == "trainee"){
            userEmail = user.email;
            userType = "trainee";
            console.log("Auth successful");
            return res.redirect("/traineeDashboard/"+user.email);
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
    if(trainer){
      res.render("pages/businessProfile",{userEmail,trainer});
    }
    else{
      console("Error to find trainer");
      res.render("/");
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

  },
  profile: async(req, res) => {
    var fullName = req.body.fullName;
    var newEmail = req.body.email;
    var status = "false";
    const currUser = await User.find({ email: userEmail });
    //check if the new email already exsits in the DB
    let user = await User.findOne({ email:newEmail });
    console.log(user);
    if (user != null) {
      console.log("if user");
      return res.render("pages/editPersonalProfile", {userEmail:userEmail,user:currUser,status:status});
    }
     
    //else
     user = await User.findOneAndUpdate(
      { email: userEmail },
      {
        $set: {
          fullName: fullName,
          email: newEmail,
        },
      });
      if(user){
        console.log("Email updated successfully");
      }
      else{
        console.log("Failed to update email (profile Page -user)");
        res.redirect('/');    
      }
    if(userType == "trainer"){
      const trainer = await Trainer.findOneAndUpdate(
        { email: userEmail },
        {
          $set: {
            fullName: fullName,
            email: newEmail,
          },
        });
        if(trainer){
          return res.render("pages/personalProfile", {userEmail:newEmail,user:trainer,status:"true"});
        }
        else{
          console.log("Failed to update email (profile Page - trainer)");
            res.redirect('/');    
        }  
    }   
    else if(userType == "trainee"){
      const trainee = await Trainee.findOneAndUpdate(
          { email: userEmail },
          {
            $set: {
              fullName: fullName,
              email: newEmail,
            },
          });
          console.log(trainee);
          if(trainee){
            return res.render("pages/personalProfile", {userEmail:newEmail,user:trainee,status:"true"});
          }
          else{
            console.log("Failed to update email (profile Page - trainee)");
              res.redirect('/');    
          }
            
        }   
  },

};
