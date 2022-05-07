const express = require("express");
const mongoose = require("mongoose");
const {login, signup } = require("../controllers/user");
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
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// for parsing application to x-www-form-urlencoded
app.use(express.json());

app.listen(port, () => {
  console.log("server is up and running");
});

//Routing for the GET request methods
var status = "false";
var connected = false;

app.get("/", (req, res) => {
  res.render("pages/homePage", { connected: connected });
});
app.get("/QNA", (req, res) => {
  res.render("pages/QNA", { connected: connected });
});

app.get("/signUp", (req, res) => {
  var status = "true";
  res.render("pages/signUp", { status: status, connected: connected });
});
app.get("/aboutUs", (req, res) => {
  connected = "true";
  res.render("pages/aboutUs", { connected: connected });
});
app.get("/personalProfile", (req, res) => {
  connected = "true";
  res.render("pages/personalProfile", { connected: connected });
});

app.get("/findTrainer", (req, res) => {
  connected = "true";
  res.render("pages/findTrainer",{ connected: connected });
});
app.get("/trainerdashboard", (req, res) => {
  connected = "true";
  res.render("pages/trainerdashboard",{ connected: connected });
});
app.get("/traineeDashboard", (req, res) => {
  connected = "true";
  res.render("pages/traineeDashboard",{ connected: connected });
});
app.get("/createBusinessProfile", (req, res) => {
  connected = "true";
  res.render("pages/createBusinessProfile", { connected: connected });
});
app.get("/businessProfile", (req, res) => {
  connected = "true";
  res.render("pages/businessProfile", { connected: connected });
});
app.get("/editBusinessProfile", (req, res) => {
  connected = "true";
  res.render("pages/editBusinessProfile", { connected: connected });
});

app.get("/login", (req, res) => {
  var loginStatus = "true";
  res.render("pages/login", { loginStatus: loginStatus, connected: connected });
});
app.get("/calendar", (req, res) => {
  var loginStatus = "true";
  res.render("pages/calendar", { loginStatus: loginStatus, connected: connected });
});

app.get("/homePage", (req, res) => {
  res.render("pages/homePage",{ connected: connected });
});

app.get("/logout", (req, res) => {
  connected = "false";
  res.render("pages/homePage", { connected: connected });
});

app.post("/login", login);
app.post("/signUp",signup);
// app.post("/signUp",signupAsTrainer);
//app.post("/new", addTraining);
