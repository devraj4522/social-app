const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
const userRoutes = require("./routes/user_routes");
const app = express();
const mongoose = require("mongoose");

app.use(bodyParser.json());

const port = 3000;

app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("This Page is not available", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
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
