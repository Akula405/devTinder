const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./model/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { validateSignupData } = require("./utils/validation");
const { userAuth } = require("./middleware/auth");
const PORT = 4000;

app.use(express.json()); //json middleware => convert json to json object
app.use(cookieParser()); // middleware for to read cookie on each request

app.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignupData(req);
    const { firstName, lastName, email, password, gender } = req.body;
    // encrypting the password
    const passwordHash = await bcrypt.hash(password, 10); //10 => salt rounds
    console.log(passwordHash);
    // creating a new instance of user model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      gender,
    });
    await user.save();
    res.status(201).send("User data saved successfully");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      //create jwt token
      const token = await jwt.sign({ _id: user._id }, "Dev@Tinder405", {
        expiresIn: "7d",
      });

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR.. " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user does not exist..");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Error" + err.message);
  }
});

app.post("/sendConnectRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " send request");
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

connectDb()
  .then(() => {
    console.log("Database conneceted successfully");
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database cant be connected", err);
  });
