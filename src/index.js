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
  addTraining,
  addTrainingType,
  cancelTrainingRegistration,
  deleteTrainingTypes,
  forgotPasseord,
  resetPassword,
  statistics,
  editTraining,
  markUnavailable,
  deleteUnavailable,
  deleteTraining,
  viewTrainer,
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
    res.render("pages/findTrainer", {
      userEmail: userEmail,
      user: userObj,
      trainers,
    });
  });
});
app.post("/selectTrainer", async (req, res) => {
  let email = req.body.email;
  console.log(email);
  let trainer = await Trainer.findOne({ email: email });
  console.log(trainer);
  if (trainer != null) {
    res.render("pages/viewSchedual", {
      userEmail: email,
      user: userObj,
      trainer: trainer,
    });
  } else {
    console.log("else");
    res.render("pages/findTrainer", { userEmail: userEmail, user: userObj });
  }
});
app.post("/filterTrainings", (req, res) => {
  let filter = req.body.filterInput;
  let action = req.body.action;
  let results = [];
  console.log("action:"+action);

  if(action == "filter"){
  console.log("traineeeee:"+userObj);
  if(userObj instanceof Trainee){
    userObj.trainings.forEach(t=> {
      date = new Date(t.trainingDate)
      month = String(date.getMonth() + 1).padStart(2, '0')
      if(month == filter){
        results.push(t);
      }
    });
  }
  
}
else {//all results

  results = userObj.trainings;
  console.log("res: "+results)
}

  res.render("pages/traineeDashboard", { userEmail: userEmail, user: userObj,trainings:results });
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
  let today = new Date();

  userEmail = req.params.email;
  let trainer = await Trainer.findOne({ email: userEmail });
  let statistics = trainer.monthStatistics;
  console.log(trainer);
  if (trainer) {
    userObj = trainer;

    for (let i = 0; i < trainer.trainings.length; i++) {
      if (
        trainer.trainings[i].trainingDate < today &&
        !trainer.trainings[i].available
      ) {
        let date = trainer.trainings[i].trainingDate;
        let dateList = date.split("-");
        let month = parseInt(dateList[1]);
        statistics[month - 1].preformed += 1;
      }
    }
    Trainer.updateOne(
      { _id: trainer._id },
      { monthStatistics: statistics }
    ).then((trainer) => {
      if (!trainer) {
        return false;
      } else {
        return true;
      }
    });
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
      res.render("pages/traineeDashboard", {
        userEmail: userEmail,
        user: userObj,
        trainings: userObj.trainings,
      });
    }
  });
});
app.get("/dashboard", async (req, res) => {
  //add to fix the dashboard botton in home page
  console.log(userEmail);
  Trainee.find({ email: userEmail }).then((users) => {
    //If the user list is empty-trainer
    if (users.length === 0) {
      console.log("trainer ---------------");
      res.render("pages/trainerDashboard", {
        userEmail: userEmail,
        user: userObj,
      });
    } else {
      console.log("trainee-----------------------");
      const [user] = users;
      userObj = user;

      res.render("pages/traineeDashboard", {
        userEmail: userEmail,
        user: userObj,
        trainings: userObj.trainings,
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
app.get("/notifications", (req, res) => {
  let type;

  let empty = true; //no notifications

  Trainee.find({ email: userEmail }).then((users) => {
    if (users.length === 0) {
      //trainer-----------------------
      type = "trainer";
      let notificationObjList = userObj.notifications;
      if (notificationObjList.length != 0) {
        empty = false;
      }
      res.render("pages/notifications", {
        userEmail: userEmail,
        user: userObj,
        userType: type,
        notificationObjList: notificationObjList,
        empty: empty,
      });
    } else {
      //trainee----------------------------
      type = "trainee";
      let notificationObjList = userObj.notifications;

      if (notificationObjList.length != 0) {
        empty = false;
      }

      res.render("pages/notifications", {
        userEmail: userEmail,
        user: userObj,
        userType: type,
        notificationObjList: notificationObjList,
        empty: empty,
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
  var status = "true";
  res.render("pages/resetPassword", {
    loginStatus: loginStatus,
    userEmail: userEmail,
    status: status,
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
  let trainerEmail = req.body.trainerEmail;
  date = new Date (date);
  String(date.getDate())
  console.log(date);
  console.log(time);

  console.log("isTrainee");

  Trainee.findOne({ email: userEmail }).then((trainee) => {
    if (!trainee) {
      return false;
    } else {
      let trainingN = trainee.trainings;
      let training = {
        trainingType: trainingName,
        trainingDate: date,
        startHour: time,
        pass: false,
        duration: duration,
        price: price,
        trainerEmail: trainerEmail,
      };

      trainingN.push(training);
      Trainee.updateOne({ email: userEmail }, { trainings: trainingN }).then(
        (trainee) => {
          if (!trainee) {
            return false;
          } else {
            return true;
          }
        }
      );
    }
  });



  // let trainee = await Trainee.findOneAndUpdate(
  //   { email: userEmail },
  //   {
  //     $set: {
  //       trainings: [
  //         {
  //           trainingType: trainingName,
  //           trainingDate: date,
  //           startHour: time,
  //           pass: false,
  //           duration: duration,
  //           price: price,
  //           trainerEmail: trainerEmail,
  //         },
  //       ],
  //     },
  //   }
  // );
  console.log(trainerEmail);
  Trainer.findOne({ email: trainerEmail }).then((trainer) => {
    if (!trainer) {
      return false;
    } else {
      console.log("trainerEm               ail");
      if (trainer.trainings != null) {
        let trainingT = trainer.trainings;

        for (let i = 0; i < trainingT.length; i++) {
          // console.log('trainingT[i].trainingDate');
          // console.log(trainingT[i].trainingDate);
          // console.log('trainingT[i].trainingDate.toString()');
          // console.log(trainingT[i].trainingDate.toString());
          // console.log('date');
          // console.log(date);
          // console.log('trainingT[i].startHour');
          // console.log(trainingT[i].startHour);
          // console.log('time');
          // console.log(time);
          if (trainingT[i].startHour == time) {
            console.log("yes");
            trainingT[i].available = false;
            trainingT[i].traineeEmail = userEmail;
          }
        }
        Trainer.updateOne(
          { email: trainerEmail },
          { trainings: trainingT }
        ).then((trainer) => {
          if (!trainer) {
            return false;
          } else {
            return true;
          }
        });
      }
    }
  });

  res.render("pages/traineeDashboard", {
    userEmail: userEmail,
    user: userObj,
    trainings: userObj.trainings,
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
    let dateList = date.split("-");
    let month = parseInt(dateList[1]);

    Trainer.findOne({ email: userEmail }).then((trainer) => {
      if (!trainer) {
        return false;
      } else {
        if (trainer.monthStatistics != null) {
          let statistics = trainer.monthStatistics;
          statistics[month - 1].scheduled += 1;

          Trainer.updateOne(
            { _id: trainer._id },
            { monthStatistics: statistics }
          ).then((trainer) => {
            if (!trainer) {
              return false;
            } else {
              return true;
            }
          });
        }
      }
    });

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

/**
 * Add two numbers.
 * @param {number} date The first number.
 * @returns {number} new date.
 */
function correctDate(date) {
  let dateList = date.split(" ");
  console.log(dateList);
  console.log(dateList[3]);
  console.log(dateList[1]);
  console.log(dateList[2]);

  let newDate = "";
  newDate += dateList[3];
  console.log(new_date);
  newDate += "-";
  let month;
  switch (dateList[1]) {
    case "Jan":
      month = "01";
      break;
    case "Feb":
      month = "02";
      break;
    case "Mar":
      month = "03";
      break;
    case "Apr":
      month = "04";
      break;
    case "May":
      month = "05";
      break;
    case "Jun":
      month = "06";
      break;
    case "Jul":
      month = "07";
      break;
    case "Aug":
      month = "08";
      break;
    case "Sep":
      month = "09";
      break;
    case "Oct":
      month = "10";
      break;
    case "Nov":
      month = "11";
      break;
    case "Dec":
      month = "12";
      break;
  }
  newDate += month;
  newDate += "-";
  newDate += dateList[2];
  return newDate;
}
app.post("/editTraining", async (req, res) => {
  let action = req.body.editAction;
  let date = req.body.newDate;
  let time = req.body.newTime;
  var id = req.body.trainingID;
  let trainingName = req.body.viewType;
  let duration;
  let price;
  console.log("actionnnn:" + action);
  if (userObj instanceof Trainer) {
    if (action == "save") {
      userObj.trainingTypes.forEach((type) => {
        if (type.name == trainingName) {
          duration = type.duration;
          price = type.price;
          console.log(trainingName);
        }
      });
      training = {
        trainingType: trainingName,
        trainingDate: date.toString(),
        startHour: time.toString(),
        available: true,
        duration: duration,
        price: price,
      };
      let oldDate;
      let trainingsList = userObj.trainings;
      for (let i = 0; i < trainingsList.length; i++) {
        if (trainingsList[i]._id.toString() == id) {
          console.log("found");
          oldDate = trainingsList[i].trainingDate;
        }
      }
      let dateList = oldDate.split("-");
      let oldMonth = parseInt(dateList[1]);
      let dateList2 = date.split("-");
      let newMonth = parseInt(dateList2[1]);

      Trainer.findOne({ email: userEmail }).then((trainer) => {
        if (!trainer) {
          return false;
        } else {
          if (trainer.monthStatistics != null) {
            let statistics = trainer.monthStatistics;
            statistics[oldMonth - 1].scheduled -= 1;
            statistics[newMonth - 1].scheduled += 1;

            Trainer.updateOne(
              { email: userEmail },
              { monthStatistics: statistics }
            ).then((trainer) => {
              if (!trainer) {
                return false;
              } else {
                return true;
              }
            });
          }
        }
      });
      editTraining(userObj.email, training, id);
    } else if (action == "delete") {
      let oldDate;
      let trainingsList = userObj.trainings;
      for (let i = 0; i < trainingsList.length; i++) {
        if (trainingsList[i]._id.toString() == id) {
          console.log("found");
          oldDate = trainingsList[i].trainingDate;
        }
      }
      let dateList = oldDate.split("-");
      let month = parseInt(dateList[1]);

      Trainer.findOne({ email: userEmail }).then((trainer) => {
        if (!trainer) {
          return false;
        } else {
          console.log("1");
          if (trainer.monthStatistics != null) {
            let statistics = trainer.monthStatistics;
            statistics[month].canceled += 1;

            Trainer.updateOne(
              { email: userEmail },
              { monthStatistics: statistics }
            ).then((trainer) => {
              if (!trainer) {
                return false;
              } else {
                return true;
              }
            });
          }
        }
      });
      //---------------------------------
      var trainer = await Trainer.findOne({ email: userEmail });
      if (trainer.trainings != null) {
        let traineeEmail;
        let trainingDate;
        let trainingType;
        let startTime;
        for (let i = 0; i < trainer.trainings.length; i++) {
          if (trainer.trainings[i]._id.toString() == id) {
            if (trainer.trainings[i].available == false) {
              console.log("false............");
              traineeEmail = trainer.trainings[i].traineeEmail;
              console.log(traineeEmail);
              trainingDate = trainer.trainings[i].trainingDate;
              trainingType = trainer.trainings[i].trainingType;
              startTime = trainer.trainings[i].startHour;
              console.log(startTime);
            }
          }
        }
        console.log("2");
        console.log(traineeEmail);
        if (traineeEmail) {
          console.log("3");
          Trainee.findOne({ email: traineeEmail }).then((trainee) => {
            if (!trainee) {
              return false;
            } else {
              let notifications = trainee.notifications;
              let trainings = trainee.trainings;

              for (var i = 0; i < trainings.length; i++) {
                //let newDate = correctDate(trainingDateToDelete);
                console.log("trainingDat");
                console.log(trainingDate);
                console.log("trainings[i].trainingDate");
                console.log(trainings[i].trainingDate);
                let newDate = correctDate(trainings[i].trainingDate);
                if (
                  newDate == trainingDate &&
                  trainings[i].startHour == startTime
                ) {
                  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!");
                  trainings.splice(i, 1);
                }
              }

              let notifi = {
                read: false,
                trainerName: userObj.fullName,
                trainingType: trainingType,
                trainingDate: trainingDate,
                startHour: startTime,
              };
              console.log("trainerEmail");

              console.log("notifi....................................");
              console.log(notifi);
              console.log("notifi....................................");
              notifications.push(notifi);
              Trainee.updateOne(
                { email: traineeEmail },
                { notifications: notifications, trainings: trainings }
              )
                .then(() => {
                  console.log("true");
                  return true;
                })
                .catch((error) => {
                  console.log("true");

                  return false;
                });
            }
          });
        }
      }
      deleteTraining(userObj, id);
    }
  }

  res.render("pages/calendar", {
    userEmail: userEmail,
    user: userObj,
  });
});
app.post("/markUnavailable", async (req, res) => {
  let action = req.body.action;
  if (action == "save") {
    if (markUnavailable(userObj, req)) {
      console.log("Error to load the trainer from DB");
      res.redirect("/");
    } else {
      res.render("pages/calendar", { userEmail: userEmail, user: userObj });
    }
  } else if (action == "delete") {
    if (!deleteUnavailable(userObj, req)) {
      console.log("Error to load the trainer from DB");
      res.redirect("/");
    } else {
      res.render("pages/calendar", { userEmail: userEmail, user: userObj });
    }
  }
});
app.post("/TrainingReg", async (req, res) => {
  let date = req.body.dateIn;
  let time = req.body.startIn;
  let trainingName = req.body.typeIn;
  let duration = req.body.durationIn;
  let price = req.body.priceIn;
  let trainerEmail = req.body.trainerEmail;
  date = new Date (date);
  String(date.getDate())
  console.log(date);
  console.log(time);

  console.log("isTrainee");

  Trainee.findOne({ email: userEmail }).then((trainee) => {
    if (!trainee) {
      return false;
    } else {
      let trainingN = trainee.trainings;
      let training = {
        trainingType: trainingName,
        trainingDate: date,
        startHour: time,
        pass: false,
        duration: duration,
        price: price,
        trainerEmail: trainerEmail,
      };

      trainingN.push(training);
      Trainee.updateOne({ email: userEmail }, { trainings: trainingN }).then(
        (trainee) => {
          if (!trainee) {
            return false;
          } else {
            return true;
          }
        }
      );
    }
  });

  // let trainee = await Trainee.findOneAndUpdate(
  //   { email: userEmail },
  //   {
  //     $set: {
  //       trainings: [
  //         {
  //           trainingType: trainingName,
  //           trainingDate: date,
  //           startHour: time,
  //           pass: false,
  //           duration: duration,
  //           price: price,
  //           trainerEmail: trainerEmail,
  //         },
  //       ],
  //     },
  //   }
  // );
  console.log(trainerEmail);
  Trainer.findOne({ email: trainerEmail }).then((trainer) => {
    if (!trainer) {
      return false;
    } else {
      console.log("trainerEm               ail");
      if (trainer.trainings != null) {
        let trainingT = trainer.trainings;

        for (let i = 0; i < trainingT.length; i++) {
          // console.log('trainingT[i].trainingDate');
          // console.log(trainingT[i].trainingDate);
          // console.log('trainingT[i].trainingDate.toString()');
          // console.log(trainingT[i].trainingDate.toString());
          // console.log('date');
          // console.log(date);
          // console.log('trainingT[i].startHour');
          // console.log(trainingT[i].startHour);
          // console.log('time');
          // console.log(time);
          if (trainingT[i].startHour == time) {
            console.log("yes");
            trainingT[i].available = false;
            trainingT[i].traineeEmail = userEmail;
          }
        }
        Trainer.updateOne(
          { email: trainerEmail },
          { trainings: trainingT }
        ).then((trainer) => {
          if (!trainer) {
            return false;
          } else {
            return true;
          }
        });
      }
    }
  });

  res.render("pages/traineeDashboard", {
    userEmail: userEmail,
    user: userObj,trainings:userObj.trainings
  });
});
app.post("/viewTrainer", async (req, res) => {
  let trainerEmail = req.body.email;
  return res.redirect("/viewTrainer/" + trainerEmail);
});

app.get("/viewTrainer/:trainerEmail", async (req, res) => {
  let trainerEmail = req.params.trainerEmail;
  console.log(trainerEmail);
  let trainer = await Trainer.findOne({ email: trainerEmail });
  console.log(trainer);
  res.render("pages/viewTrainer", {
    userEmail: userEmail,
    user: trainer, //trainer
  });
});
