const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("User Not found");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("wrong credentials");
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
