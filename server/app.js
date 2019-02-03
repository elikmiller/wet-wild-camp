// Dependencies
const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const Boom = require("boom");
require("dotenv").config();

// Initialize Express
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable session storage
mongoose.set("useCreateIndex", true);
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 900000, secure: false },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Enable CORS
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    process.env.CORS_URL || process.env.CORS_URL_NOT_SECURE
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  return next();
});

// Enable logging
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(logger("common"));
} else {
  app.use(logger("dev"));
}

// Routes
app.use("/users", require("./src/routes/users"));
app.use("/auth", require("./src/routes/auth"));
app.use("/campers", require("./src/routes/campers"));
app.use("/camps", require("./src/routes/camps"));
app.use("/registrations", require("./src/routes/registrations"));
app.use("/admin", require("./src/routes/admin"));
app.use("/payments", require("./src/routes/payments"));

// Default Error Handler
app.use((err, req, res, next) => {
  if (!Boom.isBoom(err)) {
    err = Boom.boomify(err);
  }
  if (err.output.statusCode === 500) {
    err.output.payload.message =
      "An internal server error has occurred. Please try again later.";
  }
  return res.status(err.output.statusCode).json(err.output.payload);
});

// Run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
