const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
const userRoutes = require("./routers/user_routes");
const postRoutes = require("./routers/post_routes");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const port = 5000;
const fs = require("fs");
const path = require("path");

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use((req, res, next) => {
  const error = new HttpError("This Page is not available", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(new HttpError("Header sent error with response", error.code));
  }
  res.status(error.code || 501);
  res.json({ message: "error.message" || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://1234:rSG9R9LVcTjsos1w@cluster0.5cjls.mongodb.net/test?retryWrites=true&w=majority`
  )
  .then(
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
