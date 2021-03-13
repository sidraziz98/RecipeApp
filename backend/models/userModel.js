const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userRole: {
      type: Number,
      ref: 'UserRole',
      default: 2,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "Users");
module.exports = User;