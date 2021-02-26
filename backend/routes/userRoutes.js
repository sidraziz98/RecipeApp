const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const data = require('../data');
const generateToken = require('../utils').generateToken;
const isAuth = require('../utils').isAuth;

const User = require('../models/userModel');
const UserRole = require('../models/userRoleModel');

router.get('/seed/roles', async (req, res) => {
  await UserRole.deleteMany({});
  const createdUserRoles = await UserRole.insertMany(data.userRoles);
  res.send({ createdUserRoles });
}
);

router.get('/seed/users', async (req, res) => {
  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
}
);

router.post("/signup", async (req, res) => {
  try {
    const user = new User(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        userRole: req.body.userRole
      }
    );
    const createdUser = await user.save();
    res.status(201).json(
      {
        _id: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        userRole: createdUser.userRole
      }
    );
  }
  catch (err) {
    console.log(err);
    res.status(400).json({
      message: "User with this email already exists.",
    });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const validPass = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (validPass) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userRole: user.userRole,
        email: user.email,
        token: generateToken(user._id),
      });
      return;
    }
  }
  res.status(401).send({ message: 'Invalid email or password' });
});

router.get('/profile', isAuth, async (req, res) => {
  const user = await User.findById( req.id );
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(401).send({ message: 'User not found' });
  }
});

module.exports = router;