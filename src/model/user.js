// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 4, maxLength: 50 }, //must camelCase otherwise not stored particular property in database
    lastName: { type: String },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true, // converted to lowercase
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid as" + value);
        }
      },
    },
    password: {
      type: String,
      minLength: 8,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password");
        }
      },
    },
    age: { type: Number, min: 18 }, //for number min,for String minLength
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender data is not valid");
        } //by dafault validate function only works for new user (singnup),for exisiting user expicitly add runValidators:true in patchApi
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Enter a proper URL");
        }
      },
    },
    about: { type: String, default: "This is default description about user" },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
