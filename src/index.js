const express = require("express");
const mongoose = require("mongoose");
const {login, signup ,findByID, findByEmail} = require("../controllers/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
var userID = "";

app.get("/", (req, res) => {
  res.render("pages/homePage", { userID: userID });
});
app.get("/QNA", (req, res) => {
  res.render("pages/QNA", { userID: userID });
});

app.get("/signUp", (req, res) => {
  var status = "true";
  res.render("pages/signUp", { status: status, userID: userID });
});
app.get("/aboutUs", (req, res) => {
  res.render("pages/aboutUs", { userID: userID });
});
app.get("/personalProfile", (req, res) => {
  res.render("pages/personalProfile", { userID: userID });
});

app.get("/findTrainer", (req, res) => {
  console.log(userID);
  res.render("pages/findTrainer",{ userID: userID });
});

app.get("/trainerdashboard", (req, res) => {
  res.render("pages/trainerdashboard",{ userID: userID });
});
app.get("/traineeDashboard/:id", (req, res) => {
  userID = req.params.id;
  console.log("traineeID: "+ userID);
  res.render("pages/traineeDashboard",{ userID: userID });
});

app.get("/createBusinessProfile/:id", (req, res) => {
  userID = req.params.id;
  console.log("trainerID: "+ userID);
  res.render("pages/createBusinessProfile", { userID: userID });
});
app.get("/businessProfile", (req, res) => {
  
  res.render("pages/businessProfile", { userID: userID });
});
app.get("/editBusinessProfile", (req, res) => {

  res.render("pages/editBusinessProfile", { userID: userID });
});

app.get("/login", (req, res) => {
  var loginStatus = "true";
  res.render("pages/login", { loginStatus: loginStatus, userID: userID });
});
app.get("/calendar", (req, res) => {
  var loginStatus = "true";
  res.render("pages/calendar", { loginStatus: loginStatus, connected: connected });
});

app.get("/homePage", (req, res) => {
  res.render("pages/homePage",{ userID: userID });
});

app.get("/logout", (req, res) => {
  connected = "false";
  res.render("pages/homePage", { userID: userID });
});

app.post("/login", login);
app.post("/signUp",signup);

