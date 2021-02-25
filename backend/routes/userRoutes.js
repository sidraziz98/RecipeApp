const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const userRouter = express.Router();

// userRouter.get('/seed', async (req, res) => {
//     // await User.remove({});
//     const createdUsers = await User.insertMany(data.users);
//     res.send({ createdUsers });
//   }
// );

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
    console.log("hello");
    res.send(createdUser
    //   {
    //   _id: createdUser._id,
    //   firstName: createdUser.firstName,
    //   lastName: createdUser.lastName,
    //   email: createdUser.email,
    //   userRole: createdUser.userRole
    // }
    );
  }
  catch(err) {
    console.log(err);
  }
});

router.get("/login", async (req, res) => {
  res.send("hello");
});

module.exports = router;