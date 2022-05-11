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
} = require("../controllers/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Trainer = require("../model/trainer");
const Trainee = require("../model/trainee");
const TrainingType = require("../model/trainingType");
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
var userType = "";
var userEmail = "";
var userObj;

app.get("/", (req, res) => {

  
  res.render("pages/homePage", { userEmail: userEmail });
});
app.get("/QNA",async (req, res) => {
  const mytrainer = await Trainer.findOneAndUpdate(
    { email: "Elon11@gmail.com" },
    {
      $set: {

     
      trainings:[{
        trainingType:"627b5b7068494c494be48d7f",
        trainingDate: new Date().getDate(),
        available: true,

      },
      {
        trainingType:"627b5b7068494c494be48d7e",
        trainingDate: new Date().getDate(),
        available: true,

      }]
        
      },
    }
  );

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

app.get("/personalProfile", async (req, res) => {
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

            console.log(userObj);
            res.render("pages/personalProfile", {
              userEmail: userEmail,
              user: userObj,
              info: userObjInfo,
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

            console.log(userObj);
            res.render("pages/personalProfile", {
              userEmail: userEmail,
              user: userObj,
              info: userObjInfo,
            });
          }
        });
      }
    }
  });
});

app.get("/personalProfile/:email", async (req, res) => {
  userEmail = req.params.email;
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

            console.log(userObj);
            res.render("pages/personalProfile", {
              userEmail: userEmail,
              user: userObj,
              info: userObjInfo,
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

            console.log(userObj);
            res.render("pages/personalProfile", {
              userEmail: userEmail,
              user: userObj,
              info: userObjInfo,
            });
          }
        });
      }
    }
  });
});
app.get("/editPersonalProfile", async (req, res) => {
  var status = "true";
  console.log(status);
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

            console.log(userObj);
            res.render("pages/editPersonalProfile", {
              userEmail: userEmail,
              user: userObj,
              info: userObjInfo,
              status: status,
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

            console.log(userObj);
            res.render("pages/editPersonalProfile", {
              userEmail: userEmail,
              user: userObj,
              info: userObjInfo,
              status: status,
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

app.get("/trainerdashboard/:email", (req, res) => {
  userEmail = req.params.email;
  User.find({ email: userEmail }).then((users) => {
    //If the user list is empty
    if (users.length === 0) {
      console.log("user Error");
      res.redirect("/");
    } else {
      const [user] = users;
      userObj = user;
      res.render("pages/trainerdashboard", {
        userEmail: userEmail,
        user: userObj,
      });
    }
  });
});

app.get("/traineeDashboard/:email", async (req, res) => {
  userEmail = req.params.email;
  User.find({ email: userEmail }).then((users) => {
    //If the user list is empty
    if (users.length === 0) {
      console.log("user Error");
      res.redirect("/");
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

app.get("/businessProfile", (req, res) => {
  let trainerId1 = "";
  let trainerId2 = "";
  let trainerId3 = "";
  let trainerId4 = "";
  let trainingTypes = {
    trainingType1: typeName1,
    trainingType2: typeName2,
    trainingType3: typeName3,
    trainingType4: typeName4,
  };

  Trainer.find({ email: userEmail }).then((users) => {
    //If the user list is empty
    if (users.length === 0) {
      console.log("user Error");
      res.redirect("/");
    } else {
      const [user] = users;
      userObj = user;
      trainerId1 = user.trainerId1;
      trainerId2 = user.trainerId2;
      trainerId3 = user.trainerId2;
      trainerId4 = user.trainerId2;
      trainingTypes = {
        trainingType1: typeName1,
        trainingType2: typeName2,
        trainingType3: typeName3,
        trainingType4: typeName4,
      };

      console.log(userObj);
      res.render("pages/businessProfile", {
        userEmail: userEmail,
        user: userObj,
        trainingTypes,
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
  TrainingType.find(userObj.trainingType1).then((types) => {
    //If the user list is empty
    if (types.length === 0) {
      console.log("user Error");
      res.redirect("/");
    } else {
      const [type] = types;

      console.log(userObj);
      res.render("pages/businessProfile", {
        userEmail: userEmail,
        user: userObj,
        types,
      });
    }
  });
  res.render("pages/calendar", {
    userEmail: userEmail,
    user: userObj,
  });
});

app.get("/homePage", (req, res) => {
  res.render("pages/homePage", { userEmail: userEmail });
});
app.get("/editTrainingTypes", (req, res) => {
  res.render("pages/editTrainingTypes", { user: userEmail });
});

app.get("/logout", (req, res) => {
  userEmail = "";
  res.render("pages/homePage", { userEmail: userEmail });
});

app.post("/login", login);
app.post("/signUp", signup);
app.post("/editPersonalprofile", editPersonalprofile);
app.post("/createBusinessP", createBusinessP);
app.post("/editBusinessP", editBusinessP);
app.post("/editPassword", editPassword);
app.post("/newTrainind", (req, res) => {
  let traineeInput = req.body.Type;
  let filter = req.body.filterInput;
  filter = filter.toString();
});
app.post("/deleteAccount", deleteAccount);
app.post("/editTrainingTypes", editTrainingTypes);
