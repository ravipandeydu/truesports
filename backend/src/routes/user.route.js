const { Router } = require("express");
const { userModel } = require("../models/User.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRoutes = Router();

userRoutes.get("/", async (req, res) => {
  const users = await userModel.find();
  res.send(users);
});

userRoutes.post("/signup", async (req, res) => {
  let { username, password } = req.body;
  try {
    let user = await userModel.findOne({ username: username });
    if (user) {
      return res.send({ error: "Already Registered, Please Login" });
    } else {
      bcrypt.hash(password, 6, async function (err, hash) {
        if (err) {
          res.send({ error: "Something wrong" });
          console.log(err);
        } else {
          const newUser = new userModel({ username, password: hash });
          await newUser.save();
          res.send({ message: "Succesfully Registered", user: newUser });
        }
      });
    }
  } catch (err) {
    return res.status(401).send(e.message);
  }
});

userRoutes.post("/login", async (req, res) => {
  let { username, password } = req.body;
  let user = await userModel.findOne({ username });
  if (user) {
    let hash = user.password;
    bcrypt.compare(password, hash, async function (err, result) {
      if (user && result) {
        var token = jwt.sign({ userId: user._id }, process.env.privateKey);
        res.send({
          message: "Login Successful",
          token,
          user,
        });
      } else if (err) {
        res.send({ error: "Something went wrong" });
      } else {
        res.send({ error: "Wrong username or password" });
      }
    });
  } else {
    res.send({ error: "Wrong username or password" });
  }
});

module.exports = {
  userRoutes,
};
