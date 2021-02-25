const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const data = require('../data');

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
    res.send(
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

router.get("/login", async (req, res) => {
  res.send("hello");
});

module.exports = router;