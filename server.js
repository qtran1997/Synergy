import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import logger from "morgan";

import users from "./server/routes/api/users";
import { dbKey } from "./server/config/keys";
import passportCheck from "./server/config/passport";

const app = express();

const db = dbKey.mongoURI;

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
passportCheck(passport);

// append /api for our http requests
// ex) http://localhost:5000/api/xxxx
app.use("/api/users", users);

const API_PORT = process.env.PORT || 5000;

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
