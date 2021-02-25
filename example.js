const express = require("express");
const User = require('./backend/models/userModel');
const bcrypt = require('bcrypt');
const db = require("../utils/connection");

const router = express.Router();

//DB_Connection = mongodb+srv://admin:admin@123@cluster0.crwvu.mongodb.net/RecipeDB?retryWrites=true&w=majority

//const userRole = require("../models/userRoleModel");

// router.get("/", async (req, res) => {
//     /* userRole.create([
//       {
//         role: "user",
//         id: 1,
//       },
//     ]);
//     user.create([
//       {
//         name: "admin",
//         email: "admin@gmail.com",
//         password: "1234",
//       },
//     ]); */
//   res.send("here");
// });

router.post("/signup", async (req, res) => {
  //res.send("hello");
  //res.send("here");
 // if (req.body.password == req.body.confirmpassword) {
//  try {
   //const hashedPassword = await bcrypt.hash(req.body.password,10);
   const userObj = new User(
     {
       firstName: req.body.fname,
       lastName: req.body.lname,
       email: req.body.email ,
       password: req.body.password
     }
   );
   const createdUser = await user.save();
   res.send({
    _id: createdUser._id,
    firstName: createdUser.firstName,
    lastName: createdUser.lastName,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
    token: generateToken(createdUser),
  });
/*   }
  catch{
  res.send(err);
  } */
//}
/* else{
  res.send("passwords did not match");
} */
});

module.exports = router;