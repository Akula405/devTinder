const express = require("express");
const app = express();
const { userAuth, adminAuth } = require("./middleware/auth");
const PORT = 4000;

//app.use("/", userAuth);
app.use("/", adminAuth);

app.get("/user/login", (req, res) => {
  res.send("user loggedIn successfully");
});
app.get("/user/profile", userAuth, (req, res) => {
  res.send({ name: "Virat" });
});
app.get("/admin/posts", (req, res) => {
  res.send("fetched admin posts successfully");
});
app.get("/admin/profile", (req, res) => {
  res.send({ name: "admin" });
});
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
