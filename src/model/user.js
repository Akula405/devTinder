const { default: mongoose } = require("mongoose");
const mongoos = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: { type: String },
  lastName: { type: String },
  email: { type: String },
  age: { type: Number },
  gender: { type: String },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
