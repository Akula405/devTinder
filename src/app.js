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
      const token = await jwt.sign({ _id: user._id }, "Dev@Tinder405");

      res.cookie("token", token);
      res.send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR.. " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length < 1) {
      res.status(404).send("users not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong.... " + err.message);
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

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.find({ email: userEmail }); // or we can use findOne method
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.send("something went wrong", err.message);
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const updatedFields = [
      "firstName",
      "about",
      "gender",
      "skills",
      "userId",
      "photoUrl",
    ]; //only specific fields should be updates
    const isUpdateAllowed = Object.keys(data).every((k) =>
      updatedFields.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills should not be greater than 10");
    }
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after", // "after"-latest data,"before"-previous data
      runValidators: true, //to enable validate function for exsisting user
    });

    res.send("User data uopdated successfully....");
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  try {
    //const user = await User.findByIdAndDelete(userId); // or  User.findByIdAndDelete({_id:userId})
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
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
