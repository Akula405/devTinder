const jwt = require("jsonwebtoken");
const User = require("../model/user");

async function userAuth(req, res, next) {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid token....");
    }
    const decodedObj = await jwt.verify(token, "Dev@Tinder405");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found...");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
}

module.exports = { userAuth };
