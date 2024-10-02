const express = require("express");
const app = express();
const connectDb = require("./config/database");
const PORT = 4000;

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
