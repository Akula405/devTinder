const express = require("express");
const app = express();
app.use("/", (req, res) => {
  res.send("Hello namaste.....");
});
app.use("/home", (req, res) => {
  res.send("Hello namaste..... from home");
});
app.use("/test", (req, res) => {
  res.send("Hello Namaste... from test");
});
app.listen(5555, () => {
  console.log("Server is Running at port 5555");
});
