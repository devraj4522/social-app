const express = require("express");
const { check } = require("express-validator");
const { request } = require("http");
const userController = require("../controller/user");

const router = express.Router();

router.get("/", userController.getUsers);
router.post(
  "/signup/",
  [
    check("name").not().isEmpty(),
    check("email")
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userController.signup
);

router.post("/login/", userController.login);

module.exports = router;
