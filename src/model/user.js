const { default: mongoose } = require("mongoose");
const mongoos = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String }, //must camelCase otherwise not stored particular property in database
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  age: { type: Number },
  gender: { type: String },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
