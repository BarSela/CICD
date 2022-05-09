const express = require("express");
const mongoose = require("mongoose");
const {login, signup ,profile} = require("../controllers/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Trainer = require("../model/trainer");
const Trainee = require("../model/trainee");
const trainee = require("../model/trainee");
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
app.use(function(req, res, next) {
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
// app.param('user', function (req, res, next, id) {
//   // try to get the user details from the User model and attach it to the request object
//   User.find({ id_:id }).then((users) => {
//     //If the user list is empty
//     if (users.length === 0) {
//       console.log("error");
//       next(new Error('failed to load user'))
//     }
//     const [user] = users;
//     req.user = user;
//     res.user = user;
// })
// Trainer.find({ id_:id }).then((trainers) => {
//   //If the user list is empty
//   if (trainers.length === 0) {
//     console.log("error");
//     next(new Error('failed to load user'))
//   }
//   const [trainer] = trainers;
  
// })
// });


  
app.get("/", (req, res) => {
  res.render("pages/homePage", { userEmail: userEmail });
});
app.get("/QNA", (req, res) => {
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
app.get("/personalProfile", (req, res) => {
  // var user;
  // User.find({ id_:userID }).then((users) => {
  //   //If the user list is empty
  //   if (users.length === 0) {
  //     console.log("error");
  //     next(new Error('failed to load user'))
  //   }

  //   const [user] = users;
  
  //   console.log(user);
  // });
  // Trainer.find({ id_:id }).then((trainers) => {
  //   //If the user list is empty
  //   if (trainers.length === 0) {
  //     console.log("error");
  //     next(new Error('failed to load user'))
  //   }
  //   const [trainer] = trainers;
  //   console.log(trainer);
  // });
  res.render("pages/personalProfile", { userEmail: userEmail });
});

app.get("/findTrainer", (req, res) => {
  console.log(userEmail);
  res.render("pages/findTrainer",{ userEmail: userEmail });
});

app.get("/trainerdashboard", (req, res) => {
  res.render("pages/trainerdashboard",{ userEmail: userEmail });
});
app.get("/traineeDashboard/:email",async (req, res) => {
  userEmail = req.params.email;
  // console.log("userID :"+userEmail);
  // const user = await User.findById(userEmail);
  // userEmail=user.email;
  // console.log("email :"+email);
  // const trainee = await Trainee.find({email});
  // userID = trainee.id;
  // console.log("userID2 :"+ trainee._id);
  res.render("pages/traineeDashboard",{ userEmail: userEmail });
});

app.get("/createBusinessProfile/:email", (req, res) => {
  userEmail = req.params.email;
  console.log("trainerID: "+ userEmail);
  res.render("pages/createBusinessProfile", { userEmail: userEmail });
});
app.get("/businessProfile", (req, res) => {
  
  res.render("pages/businessProfile", { userEmail: userEmail });
});
app.get("/editBusinessProfile", (req, res) => {

  res.render("pages/editBusinessProfile", { userEmail: userEmail });
});

app.get("/login", (req, res) => {
  var loginStatus = "true";
  res.render("pages/login", { loginStatus: loginStatus, userEmail: userEmail });
});
app.get("/calendar", (req, res) => {
  var loginStatus = "true";
  res.render("pages/calendar", { loginStatus: loginStatus, connected: connected });
});

app.get("/homePage", (req, res) => {
  res.render("pages/homePage",{ userEmail: userEmail });
});

app.get("/logout", (req, res) => {
  connected = "false";
  res.render("pages/homePage", { userEmail: userEmail });
});

app.post("/login", login);
app.post("/signUp",signup);
// app.post("/profile",profile);