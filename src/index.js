const express = require("express");
const mongoose = require("mongoose");
const {
  login,
  signup,
  editPersonalprofile,
  createBusinessP,
  editBusinessP,
  editPassword,
  deleteAccount,
  editTrainingTypes,
  deleteTraining,
  addTraining,
  addTrainingType,
  cancelTrainingRegistration,
  deleteTrainingTypes,
  forgotPasseord,
  resetPassword,
  statistics,editTraining, markUnavailable, deleteUnavailable
} = require("../controllers/user");

//const bcrypt = require("bcrypt");
const User = require("../model/user");
const Trainer = require("../model/trainer");
const Trainee = require("../model/trainee");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

//const { findByIdAndUpdate } = require("../model/trainee");
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  `mongodb+srv://LihiSabag:1234512345@pm-web-api.p22dw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected!");
});

// Set EJS as templating engine
app.set("view engine", "ejs");

// MiddleWare
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// for parsing application to x-www-form-urlencoded
app.use(express.json());

app.listen(port, () => {
  console.log("server is up and running");
});

//Routing for the GET request methods
//var userType = "";
var userEmail = "";
var userObj;

app.get("/", (req, res) => {
  res.render("pages/homePage", { userEmail: userEmail });
});
app.get("/QNA", async (req, res) => {
  res.render("pages/QNA", { userEmail: userEmail });
});

app.get("/signUp", (req, res) => {
  var status = "true";
  res.render("pages/signUp", { status: status, userEmail: userEmail });
});
app.get("/aboutUs", (req, res) => {
  res.render("pages/aboutUs", { userEmail: userEmail });
});
app.get("/condNterms", (req, res) => {
  res.render("pages/condNterms", { userEmail: userEmail });
});

// app.get("/personalProfile", async (req, res) => {
//   User.find({ email: userEmail }).then((users) => {
//     //If the user list is empty
//     if (users.length === 0) {
//       console.log("user Error");
//       res.redirect("/");
//     } else {
//       const [user] = users;
//       var userObjInfo = user;

//       if (userObjInfo.userType == "trainee") {
//         Trainee.find({ email: userEmail }).then((trainees) => {
//           //If the user list is empty
//           if (users.length === 0) {
//             console.log("trainee Error");
//             res.redirect("/");
//           } else {
//             const [user] = trainees;
//             userObj = user;

//             console.log(userObj);
//             res.render("pages/personalProfile", {
//               userEmail: userEmail,
//               user: userObj,
//               info: userObjInfo,
//             });
//           }
//         });
//       } else {
//         Trainer.find({ email: userEmail }).then((trainers) => {
//           //If the user list is empty
//           if (users.length === 0) {
//             console.log("user Error");
//             res.redirect("/");
//           } else {
//             const [user] = trainers;
//             userObj = user;

//             console.log(userObj);
//             res.render("pages/personalProfile", {
//               userEmail: userEmail,
//               user: userObj,
//               info: userObjInfo,
//             });
//           }
//         });
//       }
//     }
//   });
// });

app.get("/personalProfile", async (req, res) => {
  console.log("2222222222222222222222222222222222");

  let type;
  User.find({ email: userEmail }).then((users) => {
    //If the user list is empty
    if (users.length === 0) {
      console.log("user Error");
      res.redirect("/");
    } else {
      const [user] = users;
      var userObjInfo = user;

      if (userObjInfo.userType == "trainee") {
        Trainee.find({ email: userEmail }).then((trainees) => {
          //If the user list is empty
          if (users.length === 0) {
            console.log("trainee Error");
            res.redirect("/");
          } else {
            const [user] = trainees;
            userObj = user;
            type = "trainee";
            console.log(userObj);
            res.render("pages/personalProfile", {
              userEmail: userEmail,
              user: userObj,
              info: userObjInfo,
              userType: type,
            });
          }
        });
      } else {
        Trainer.find({ email: userEmail }).then((trainers) => {
          //If the user list is empty
          if (users.length === 0) {
            console.log("user Error");
            res.redirect("/");
          } else {
            const [user] = trainers;
            userObj = user;
            type = "trainer";

            console.log(userObj);
            res.render("pages/personalProfile", {
              userEmail: userEmail,
              user: userObj,
              info: userObjInfo,
              userType: type,
            });
          }
        });
      }
    }
  });
});

app.get("/personalProfile/:email", async (req, res) => {
  userEmail = req.params.email;
  let type;
  User.find({ email: userEmail }).then((users) => {
    //If the user list is empty
    if (users.length === 0) {
      console.log("user Error");
      res.redirect("/");
    } else {
      const [user] = users;
      var userObjInfo = user;

      if (userObjInfo.userType == "trainee") {
        Trainee.find({ email: userEmail }).then((trainees) => {
          //If the user list is empty
          if (users.length === 0) {
            console.log("trainee Error");
            res.redirect("/");
          } else {
            const [user] = trainees;
            userObj = user;
            type = "trainee";

            console.log(userObj);
            res.render("pages/personalProfile", {
              userEmail: userEmail,
              user: userObj,
              info: userObjInfo,
              userType: type,
            });
          }
        });
      } else {
        Trainer.find({ email: userEmail }).then((trainers) => {
          //If the user list is empty
          if (users.length === 0) {
            console.log("user Error");
            res.redirect("/");
          } else {
            const [user] = trainers;
            userObj = user;
            type = "trainer";

            console.log(userObj);
            res.render("pages/personalProfile", {
              userEmail: userEmail,
              user: userObj,
              info: userObjInfo,
              userType: type,
            });
          }
        });
      }
    }
  });
});

////

app.get("/editPersonalProfile", async (req, res) => {
  var status = "true";
  console.log(status);
  let type;

  User.find({ email: userEmail }).then((users) => {
    //If the user list is empty
    if (users.length === 0) {
      console.log("user Error");
      res.redirect("/");
    } else {
      const [user] = users;
      var userObjInfo = user;

      if (userObjInfo.userType == "trainee") {
        Trainee.find({ email: userEmail }).then((trainees) => {
          //If the user list is empty
          if (users.length === 0) {
            console.log("trainee Error");
            res.redirect("/");
          } else {
            type = "trainee";
            const [user] = trainees;
            userObj = user;

            console.log(userObj);
            res.render("pages/editPersonalProfile", {
              userEmail: userEmail,
              user: userObj,
              info: userObjInfo,
              status: status,
              userType: type,
            });
          }
        });
      } else {
        Trainer.find({ email: userEmail }).then((trainers) => {
          //If the user list is empty
          if (users.length === 0) {
            console.log("user Error");
            res.redirect("/");
          } else {
            type = "trainer";
            const [user] = trainers;
            userObj = user;

            console.log(userObj);
            res.render("pages/editPersonalProfile", {
              userEmail: userEmail,
              user: userObj,
              info: userObjInfo,
              status: status,
              userType: type,
            });
          }
        });
      }
    }
  });
});

app.get("/findTrainer", (req, res) => {
  Trainer.find({}).then((trainers) => {
    res.render("pages/findTrainer", { userEmail: userEmail, trainers });
  });
});
app.post("/selectTrainer", async (req, res) => {
  let email = req.body.email;
  console.log(email);
  let trainings;
  let trainer = await Trainer.findOne({ email: email });
  if (trainer != null) {
    console.log("trainer selected: " + trainer);
    trainings = trainer.trainings;
    // trainings = trainer.trainings;
    res.render("pages/viewSchedual", {
      userEmail: email,
      user: userObj,
      trainer: trainer,
    });
  } else {
    res.render("pages/findTrainer", { userEmail: userEmail, user: userObj });
  }
});

app.post("/searchTrainer", (req, res) => {
  let traineeInput = req.body.traineeInput;
  let filter = req.body.filterInput;
  filter = filter.toString();

  if (filter == "fullName") {
    Trainer.find({ fullName: { $regex: ".*" + traineeInput + ".*" } }).then(
      (trainers) => {
        res.render("pages/findTrainer", { userEmail: userEmail, trainers });
      }
    );
  } else if (filter == "businessName") {
    Trainer.find({ businessName: { $regex: ".*" + traineeInput + ".*" } }).then(
      (trainers) => {
        res.render("pages/findTrainer", { userEmail: userEmail, trainers });
      }
    );
  } else if (filter == "specialty") {
    Trainer.find({ specialty: { $regex: ".*" + traineeInput + ".*" } }).then(
      (trainers) => {
        res.render("pages/findTrainer", { userEmail: userEmail, trainers });
      }
    );
  } else if (filter == "city") {
    Trainer.find({ city: { $regex: ".*" + traineeInput + ".*" } }).then(
      (trainers) => {
        res.render("pages/findTrainer", { userEmail: userEmail, trainers });
      }
    );
  }
});

app.get("/trainerDashboard/:email", async (req, res) => {
  userEmail = req.params.email;
  let trainer = await Trainer.findOne({ email: userEmail });
  console.log(trainer);
  if (trainer) {
    userObj = trainer;
    res.render("pages/trainerDashboard", {
      userEmail: userEmail,
      user: userObj,
    });
  } else {
    res.redirect("/");
  }
});

app.get("/traineeDashboard/:email", async (req, res) => {
  userEmail = req.params.email;
  Trainee.find({ email: userEmail }).then((trainees) => {
    //If the user list is empty
    if (trainees.length === 0) {
      console.log("user Error");
      res.redirect("/");
    } else {
      const [trainee] = trainees;
      userObj = trainee;
    }
    res.render("pages/traineeDashboard", {
      userEmail: userEmail,
      user: userObj,
    });
  });
});
app.get("/dashboard", async (req, res) => {
  //add to fix the dashboard botton in home page
  Trainer.find({ email: userEmail }).then((users) => {
    //If the user list is empty-trainer
    if (users.length === 0) {
      res.render("pages/trainerDashboard", {
        userEmail: userEmail,
        user: userObj,
      });
    } else {
      const [user] = users;
      userObj = user;

      res.render("pages/traineeDashboard", {
        userEmail: userEmail,
        user: userObj,
      });
    }
  });
});

app.get("/createBusinessProfile/:email", (req, res) => {
  userEmail = req.params.email;
  User.find({ email: userEmail }).then((users) => {
    //If the user list is empty
    if (users.length === 0) {
      console.log("user Error");
      res.redirect("/");
    } else {
      const [user] = users;
      userObj = user;
      res.render("pages/createBusinessProfile", {
        userEmail: userEmail,
        user: userObj,
      });
    }
  });
});
app.get("/deleteAccount", (req, res) => {
  res.render("pages/deleteAccount"), { userEmail: userEmail };
});
app.get("/businessProfile", (req, res) => {
  Trainer.find({ email: userEmail }).then((users) => {
    //If the user list is empty
    if (users.length === 0) {
      console.log("user Error");
      res.redirect("/");
    } else {
      const [user] = users;
      userObj = user;

      console.log(userObj);
      res.render("pages/businessProfile", {
        userEmail: userEmail,
        user: userObj,
      });
    }
  });
});
app.get("/createTrainingTypes", (req, res) => {
  Trainer.find({ email: userEmail }).then((users) => {
    //If the user list is empty
    if (users.length === 0) {
      console.log("user Error");
      res.redirect("/");
    } else {
      const [user] = users;
      userObj = user;

      console.log(userObj);
      res.render("pages/createTrainingTypes", {
        userEmail: userEmail,
        user: userObj,
      });
    }
  });
});
app.get("/editBusinessProfile", (req, res) => {
  res.render("pages/editBusinessProfile", {
    userEmail: userEmail,
    user: userObj,
  });
});

app.get("/login", (req, res) => {
  var loginStatus = "true";
  res.render("pages/login", { loginStatus: loginStatus, userEmail: userEmail });
});
app.get("/calendar", (req, res) => {
  res.render("pages/calendar", {
    userEmail: userEmail,
    user: userObj,
  });
});


app.get("/statistics/:month", (req, res) => {
  let month = parseInt(req.params.month);
  console.log(month);

  let fullDataScheduled = []; //all year
  let fullDataCanceled = []; //all year
  let fullDataPreformed = []; //all year

  let type;
  Trainer.find({ email: userEmail }).then((trainers) => {
    const [user] = trainers;
    userObj = user;
    type = "trainer";
    let monthlist = userObj.monthStatistics;
    console.log(monthlist.length);
    for (let i = 0; i < 12; i++) {
      fullDataScheduled.push(monthlist[i].scheduled);
      fullDataCanceled.push(monthlist[i].canceled);
      fullDataPreformed.push(monthlist[i].preformed);
    }
    console.log(fullDataScheduled.length);

    console.log(typeof fullDataCanceled[0]);
    console.log(userObj);
    res.render("pages/statisticsResults", {
      userEmail: userEmail,
      user: userObj,
      userType: type,
      month: month,
      scheduledList: fullDataScheduled,
      canceledList: fullDataCanceled,
      preformedList: fullDataPreformed,
    });
  });
});
app.get("/viewSchedual", (req, res) => {
  let email = req.body.email;
  console.log("view user: " + req.user);
  res.render("pages/viewSchedual", {
    userEmail: email,
    user: userObj,
    trainer: "lll",
  });
});

app.get("/homePage", (req, res) => {
  res.render("pages/homePage", { userEmail: userEmail });
});
app.get("/editTrainingTypes", (req, res) => {
  Trainer.find({ email: userEmail }).then((users) => {
    //If the user list is empty
    if (users.length === 0) {
      console.log("user Error");
      res.redirect("/");
    } else {
      const [user] = users;
      userObj = user;

      console.log(userObj);
      res.render("pages/editTrainingTypes", {
        userEmail: userEmail,
        user: userObj,
      });
    }
  });
});

app.get("/logout", (req, res) => {
  userEmail = "";
  res.render("pages/homePage", { userEmail: userEmail });
});
app.get("/resetPassword", (req, res) => {
  var loginStatus = "true";
  res.render("pages/resetPassword", {
    loginStatus: loginStatus,
    userEmail: userEmail,
  });
});
app.get("/forgotPassword", (req, res) => {
  var loginStatus = "true";
  res.render("pages/forgotPassword", {
    loginStatus: loginStatus,
    userEmail: userEmail,
  });
});

//post:
app.post("/editTrainingTypes", editTrainingTypes);
app.post("/login", login);
app.post("/signUp", signup);
app.post("/editPersonalprofile", editPersonalprofile);
app.post("/createBusinessP", createBusinessP);
app.post("/editBusinessP", editBusinessP);
app.post("/editPassword", editPassword);
app.post("/editPassword", editPassword);
app.post("/TrainingReg", async (req, res) => {
  let date = req.body.dateIn;
  let time = req.body.startIn;
  let trainingName = req.body.typeIn;
  let duration = req.body.durationIn;
  let price = req.body.priceIn;

  console.log(userEmail);
  console.log(date);
  console.log(time);

  console.log("isTrainee");
  let trainee = await Trainee.findOneAndUpdate(
    { email: userEmail },
    {
      $set: {
        trainings: [
          {
            trainingType: trainingName,
            trainingDate: date.toString(),
            startHour: time,
            pass: false,
            duration: duration,
            price: price,
          },
        ],
      },
    }
  );

  res.render("pages/traineeDashboard", {
    userEmail: userEmail,
    user: userObj,
  });
});
app.post("/newTraining", async (req, res) => {
  let traineeInput = req.body.Type;
  let date = req.body.date;
  let time = req.body.time;
  let trainingName;
  let duration;
  let price;

  console.log("traineeInput" + traineeInput);
  console.log(userObj);

  if (userObj instanceof Trainer) {
    userObj.trainingTypes.forEach((type) => {
      if (type.name == traineeInput) {
        console.log("YESS");
        trainingName = type.name;
        duration = type.duration;
        price = type.price;
        console.log(trainingName);
      }
    });
    training = {
      trainingType: trainingName,
      trainingDate: date,
      startHour: time.toString(),
      available: true,
      duration: duration,
      price: price,
    };
    addTraining(userObj.email, training);
  }
  res.render("pages/calendar", {
    userEmail: userEmail,
    user: userObj,
  });
});
app.post("/deleteAccount", deleteAccount);
app.post("/addTrainingType", addTrainingType);
app.post("/cancelTrainingRegistration", cancelTrainingRegistration);
app.post("/deleteTrainingTypes", deleteTrainingTypes);

app.post("/forgotPassword", forgotPasseord);
app.post("/resetPassword", resetPassword);
app.post("/statistics", statistics);
app.post("/editTraining",async (req, res) => {
  // let traineeInput = req.body.Type;
  let date = req.body.newDate;
  let time = req.body.newTime;
  let id = req.body.trainingID;
  console.log("id: "+id);
  let trainingName = req.body.viewType;
  let duration;
  let price;
  
  console.log("training name "+ trainingName);

  if(userObj instanceof Trainer){
    
    userObj.trainingTypes.forEach(type => {
      if(type.name == trainingName){
        console.log("YESS");
        duration = type.duration;
        price = type.price;
        console.log(trainingName);
      }});
      training = {
        trainingType:trainingName,
        trainingDate: date.toString(),
        startHour:time.toString(),
        available: true,
        duration:duration,
        price:price

      }
     editTraining(userObj.email,training,id);
    
  }
  res.render("pages/calendar", {
    userEmail: userEmail,
    user: userObj,
  });
});
app.post("/markUnavailable",async (req, res) => {
  let action = req.body.action;
      if(action == "save"){
        if(markUnavailable(userObj,req)){
          console.log("Error to load the trainer from DB");
          res.redirect("/");
        }
        else{
          res.render("pages/calendar", {userEmail: userEmail,user: userObj,});
        }
      }
      else if(action == "delete"){
        if(!deleteUnavailable(userObj,req)){
          console.log("Error to load the trainer from DB");
          res.redirect("/");
        }
        else{
          res.render("pages/calendar", {userEmail: userEmail,user: userObj,});
        }
      }
        
      
    
  });
    
