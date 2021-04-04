const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const data = require('../data');
const { isAuth, generateToken, jsonResponse } = require('../utils');

const User = require('../models/userModel');
const UserRole = require('../models/userRoleModel');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './backend/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Incorrect File Type'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

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

router.post("/signup", upload.single('image'), async (req, res) => {
  try {
    if (req.body.firstName && req.body.lastName && req.body.email && req.body.password) {
      const userExist = await User.findOne({ email: req.body.email });
      if (userExist) {
        res.status(401).json(jsonResponse(null, "User with this email already exists."));
      } else {
        const user = new User(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            image: req.file.path
          }
        );
        const createdUser = await user.save();
        res.status(201).json(jsonResponse(createdUser, "Signup Successful"));
      }
    }
    else {
      res.status(401).json(jsonResponse(null, "Incomplete profile details."));
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(jsonResponse(null, err.message));
  }
});

router.post("/login", async (req, res) => {
  try {
    if (req.body.email && req.body.password) {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const validPass = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (validPass) {
          const sendUser = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userRole: user.userRole,
            email: user.email,
            image: user.image,
            token: generateToken(user._id),
          };
          res.status(201).json(jsonResponse(sendUser, "Login Successful"));
        }
      }
      res.status(401).send(jsonResponse(null, 'Invalid email or password'));
    }
    else {
      res.status(401).send(jsonResponse(null, 'Email or password missing'));
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(jsonResponse(null, err.message));
  }
});

router.get('/profile', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.id).populate('userRole');
    if (user) {
      const sendUser = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userRole: user.userRole['role'],
      };
      res.status(201).json(jsonResponse(sendUser, "Profile retreival successful"));
    } else {
      res.status(401).send(jsonResponse(null, 'User not found'));
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(jsonResponse(null, err.message));
  }
});

router.put('/profile', isAuth, upload.single('image'), async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      user.image = req.file.path;
      const updatedUser = await user.save();
      res.status(201).json(jsonResponse(updatedUser, "Update profile successful"));      
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(jsonResponse(null, err.message));
  }
});

module.exports = router;