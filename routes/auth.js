const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User")
//REGISTER


router.post("/register", async (req, res) => {
  console.log(req.body);

   

try {

  const userexist = await User.findOne({ email: req.body.email });
  if (userexist) {
    res.status(201).json({exist:true});

  }else{

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    });
    const user = await newUser.save();
    res.status(201).json(user);
  }
  } catch (err) {
    res.status(500).json(err);
  }
});
//LOGIN
router.post('/login', passport.authenticate('local',{ failureRedirect: '/login' }),async (req, res) => {
  // Access the authenticated user's ID
  const userId = req.user.id;


  // Store the userId in the session
  req.session.userId = userId;
  try {
    const user = await User.findOne({ _id: req.user.id });
    !user && res.status(401).json("Wrong password or username!");

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info});
    
  } catch (err) {
        res.status(500).json(err);

  }

  // Handle successful authentication
});

module.exports = router;
