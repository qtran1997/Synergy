const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const logger = require("morgan");

const app = express();

// TODO: Use an index
const router = require("./server/routes/api/test");

const db = require("./server/config/keys").mongoURI;

// new topology engine because Mongoose 5.7 uses MongoDB driver 3.3.x
mongoose.set("useUnifiedTopology", true);

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// Passport middleware
app.use(passport.initialize());

// Passport Config
// require("./config/passport")(passport);

// append /api for our http requests
// ex) http://localhost:5000/api
app.use("/api", router);

const API_PORT = process.env.PORT || 5000;

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
