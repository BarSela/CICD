const bcrypt = require("bcrypt"); //Password encryption
const jwt = require("jsonwebtoken");
const User = require("../model/trainerUser");

module.exports = {
  signup: (req, res, next) => {
    var connected = "false";
    var fullName = req.body.fullName;
    var email = req.body.email;
    var password = req.body.password;
    var status = "false";

    //checks if the email already exists in the databases
    User.find({ email }).then((users) => {
      if (users.length >= 1) {
        return res.render("pages/signUp", {
          status: status,
          connected: connected,
        });
      }

      //Password encryption
      bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
          return res.status(500).json({
            error,
          });
        }
        const user = new User({
          fullName,
          email,
          password: hash,
        });
        user
          .save()
          .then((result) => {
            console.log("new user created");
            return res.redirect("/wellcomePage");
          })
          .catch((error) => {
            res.status(500).json({
              error,
            });
            console.log("post error ");
          });
      });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    var loginStatus = "false";
    var connected = "false";
    User.find({ email }).then((users) => {
      //If the user list is empty
      if (users.length === 0) {
        return res.render("pages/signUp", { loginStatus: loginStatus });
      }

      const [user] = users;
      //Checking the password
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          return res.render("pages/login", {
            loginStatus: loginStatus,
            connected: connected,
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
            },
            "lihi",
            {
              //For how long the user can stay connected
              expiresIn: "1H", //1 hour
            }
          );

          console.log("Auth successful");
          return res.redirect("/wellcomePage");
        }
        //If the password is incorrect
        return res.render("pages/login", {
          loginStatus: loginStatus,
          connected: connected,
        });
      });
    });
  },
};
