// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

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
    },
    password: { type: String, minLength: 8 },
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
    },
    about: { type: String, default: "This is default description about user" },
    skills: { type: [String] },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
