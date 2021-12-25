const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const { error } = require("console");
const User = require("../models/users");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  // input is invalid
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name, email, password } = req.body;

  // user already exist
  let oldUser;
  try {
    oldUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signup Faild", 500);
    return next(error);
  }

  if (oldUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword = "";
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could Not create user please try agian", 500);
    return next(error);
  }

  const createdUser = new User({
    name, // name: name
    email,
    password: hashedPassword,
  });

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser._id, email: createdUser.email },
      "supresecreat_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(token);
    const error = new HttpError("User Login Failed", 500);
    return next(error);
  }

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    userId: createdUser._id,
    email: createdUser.email,
    token: token,
    message: "Account Created",
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let identifiedUser;

  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!identifiedUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: identifiedUser.id, email: identifiedUser.email },
      "supresecreat_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(token);
    const error = new HttpError("User Login Failed");
    return next(error);
  }

  res.json({
    userId: identifiedUser.id,
    name: identifiedUser.name,
    email: identifiedUser.email,
    token: token,
    message: "Logged In.",
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
