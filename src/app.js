const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./model/user");
const PORT = 4000;
app.use(express.json()); //json middleware

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User data saved successfully");
  } catch (err) {
    res.status(400).send("Error saving the user ", err.message);
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
