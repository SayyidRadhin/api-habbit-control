const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const session = require('express-session');
const authRoute = require("./routes/auth");
const habbitRoute = require("./routes/habbit")
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');
const completionRoute =require("./routes/completion")

dotenv.config();
app.use(cors())
// Configure session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Configure Passport.js middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());

//passport

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return done(err);
        if (!isMatch) return done(null, false);

        return done(null, user);
      });
    });
  })
);

// searialize
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});
//desirialize
passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});



app.use("/api/auth", authRoute);
app.use("/api/habbit", habbitRoute);
app.use("/api/completions/", completionRoute)


app.listen(8800, () => {
  console.log("Backend server is running!");
});
