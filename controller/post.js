const fs = require("fs");
const { v4: uuid } = require("uuid");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const { error } = require("console");
const User = require("../models/users");
const Post = require("../models/post");
const { startSession } = require("../models/users");
const mongoose = require("mongoose");
const post = require("../models/post");
const { title } = require("process");

const createPost = async (req, res, next) => {
  console.log(req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, desc, creator } = req.body;
  const createdPost = new Post({
    title,
    desc,
    image: req.file.path,
    creator,
  });

  let user;
  try {
    user = await User.findById(req.body.creator);
  } catch (err) {
    const error = new HttpError("Error Finding user ", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user", 404);
    return next(error);
  }

  try {
    const sesson = await mongoose.startSession();
    sesson.startTransaction();
    await createdPost.save({ session: sesson });
    user.posts.push(createdPost);
    await user.save({ session: sesson });
    await sesson.commitTransaction();
  } catch (err) {
    const error = new HttpError("Sesson Error", 500);
    return next(error);
  }
  res.status(201).json({ post: createdPost });
};

const like = async (req, res, next) => {
  const { likerId, postId } = req.body;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError("Error Fetching Post", 501);
    return next(error);
  }

  if (!post) {
    return next(new HttpError("Post not exist", 501));
  }

  let author;
  let authorId;
  try {
    authorId = post.creator.toString();
    author = await User.findById(authorId);
  } catch (err) {
    const error = new HttpError("Error Fetching Post Author", 501);
    return next(error);
  }

  if (!author) {
    return next(new HttpError("Post Author not exist", 501));
  }

  let liker;
  try {
    liker = await User.findById(likerId);
  } catch (err) {
    const error = new HttpError("Error fetching liker", 501);
    return next(error);
  }

  if (!liker) {
    return next(new HttpError("Liker not exist", 501));
  }

  // already liked
  const alreadyLiked = post.likes.find((like) => like.toString() == likerId);
  if (alreadyLiked) {
    return next(new HttpError("Already liked by this user"), 500);
  }
  // TODO: Push follower to self

  try {
    const sesson = await mongoose.startSession();
    sesson.startTransaction();
    post.likes.push(liker);
    await post.save({ session: sesson });
    author.liked.push(post);
    await author.save({ session: sesson });
    await sesson.commitTransaction();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.json({
    creatorId: authorId,
    likes: post.likes,
  });
};

const unLike = async (req, res, next) => {
  const { unLikerId, postId } = req.body;

  let unLiker;
  try {
    unLiker = await User.findById(unLikerId);
  } catch (err) {
    const error = new HttpError("Error fetching liker", 501);
    return next(error);
  }

  if (!unLiker) {
    return next(new HttpError("Liker not exist", 501));
  }

  let post;
  try {
    post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: unLiker._id } },
      { new: true }
    );
  } catch (err) {
    const error = new HttpError("Not able to ulike the post", 500);
    return next(error);
  }

  res.json({
    // creatorId: authorId,
    id: post._id,
    likes: post.likes,
  });
};

const getAllFollowingPost = async (req, res, next) => {
  const { userId } = req.body;

  // TODO: If User exist.
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Error loading User", 501);
    return next(error);
  }

  if (!user) {
    return next(new HttpError("User Not exist", 404));
  }
  // 61c761f133d3b710d6110259
  // const following = user.follows;
  const following = new mongoose.Types.ObjectId("61c83eae2d9458f044f8b5cd");
  console.log(following);
  let allPosts = [];
  try {
    await Post.find({
      creator: { $in: following },
    })

      .populate("creator", "_id title desc")
      .populate("likes.creator", "_id name")
      .then((posts) => {
        allPosts = posts;
      });
  } catch (err) {
    const error = new HttpError("Error fetching posts");
    return next(error);
  }

  res.json({ allPosts });
};

exports.createPost = createPost;
exports.like = like;
exports.unLike = unLike;
exports.getAllFollowingPost = getAllFollowingPost;
