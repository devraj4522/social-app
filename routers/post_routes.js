const express = require("express");
const { check } = require("express-validator");
const { request } = require("http");
const postController = require("../controller/post");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.post("/", postController.getAllFollowingPost);

router.post(
  "/create",
  fileUpload.single("image"),
  [check("title").not().isEmpty(), check("desc").isLength({ min: 5 })],
  postController.createPost
);

router.post("/like/", postController.like);
router.put("/unlike/", postController.unLike);

module.exports = router;
