const express = require("express");
const mongoose = require("mongoose");
const {
  login,
  signup,
  profile,
  createBusinessP,
  editBusinessP,
} = require("../controllers/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Trainer = require("../model/trainer");
const Trainee = require("../model/trainee");
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
app.get("/personalProfile", async (req, res) => {
  res.render("pages/personalProfile", { userEmail: userEmail, user: userObj });
});
app.get("/editPersonalProfile", async (req, res) => {
  var status = "true";
  console.log(status);
  res.render("pages/editPersonalProfile", {
    userEmail: userEmail,
    user: userObj,
    status: status,
  });
});
app.get("/findTrainer", (req, res) => {
  const value = "fitness";
  Trainer.find({ businessName: { $regex: ".*" + value + ".*" } }).then(
    (trainers) => {
      console.log("trainers: " + trainers);
    }
  );
  res.render("pages/findTrainer", { userEmail: userEmail });
});
app.post("/findTrainer", (req, res) => {
  console.log(userEmail);

  res.render("pages/findTrainer", { userEmail: userEmail });
});

app.get("/trainerdashboard", (req, res) => {
  res.render("pages/trainerdashboard", { userEmail: userEmail });
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
  res.render("pages/createBusinessProfile", { userEmail: userEmail });
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
  var loginStatus = "true";
  res.render("pages/calendar", {
    loginStatus: loginStatus,
    connected: connected,
  });
});

app.get("/homePage", (req, res) => {
  res.render("pages/homePage", { userEmail: userEmail });
});

app.get("/logout", (req, res) => {
  connected = "false";
  res.render("pages/homePage", { userEmail: userEmail });
});

app.post("/login", login);
app.post("/signUp", signup);
app.post("/profile", profile);
app.post("/createBusinessP", createBusinessP);
app.post("/editBusinessP", editBusinessP);
