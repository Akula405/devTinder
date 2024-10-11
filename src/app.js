const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./model/user");
const PORT = 4000;
app.use(express.json()); //json middleware => convert json to json object

app.post("/signup", async (req, res) => {
  const user = new User(req.body); // creating a new instance of user model

  try {
    await user.save();
    res.send("User data saved successfully");
  } catch (err) {
    res.status(400).send("Error saving the user ", err.message);
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
    res.status(400).send("something went wrong.... ", err.message);
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
  console.log(data);
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after", // "after"-latest data,"before"-previous data
    });
    console.log(updatedUser);
    res.send("User data uopdated successfully....");
  } catch (err) {
    res.status(400).send("Something went wrong.... ", err.message);
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
