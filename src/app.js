const express = require("express");
const app = express();
const PORT = 4000;

app.use("/user", [
  (req, res, next) => {
    //res.send("1st response.....");
    console.log("1st response");
    next();
  },
  (req, res, next) => {
    //res.send("2nd response.......");
    console.log("2nd response");
    next();
  },
  (req, res, next) => {
    //res.send("3rd response...."); => infinite loop for both next and rh uncomented
    console.log("3rd response");
    //next(); if only rh uncomented we can get error 404
  },
]);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
