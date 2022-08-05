import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    loginActive: true,
  });
};

export const postLogin = (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  User.findOne({ where: { userName: userName } })
    .then((user) => {
      if (!user) {
        req.flash("errors", "Username is invalid.");
        return res.redirect("/auth/login");
      }

      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/admin");
            });
          }
          req.flash("errors", "Password is invalid.");
          res.redirect("/auth/login");
        })
        .catch((err) => {
          console.log(err);
          req.flash(
            "errors",
            "An error has occurred contact the administrator."
          );
          res.redirect("/auth/login");
        });
    })
    .catch((err) => {
      console.log(err);
      req.flash("errors", "An error has occurred contact the administrator.");
      res.redirect("/auth/login");
    });
};

export const getRegister = (req, res) => {
  res.render("auth/register", {
    pageTitle: "Register",
    registerActive: true,
  });
};

export const postRegister = (req, res) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const userName = req.body.userName;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password != confirmPassword) {
    req.flash("errors", "Passwords are not the same.");
    return res.redirect("/auth/register");
  }

  User.findOne({ where: { userName: userName } })
    .then((user) => {
      if (user) {
        req.flash(
          "errors",
          "Username already exist, please use a different one."
        );
        return res.redirect("/auth/register");
      }

      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          User.create({
            name: name,
            lastName: lastName,
            email: email,
            userName: userName,
            password: hashedPassword,
            status: true,
          })
            .then((user) => {
              res.redirect("/auth/login");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postLogout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
