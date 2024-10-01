const express = require("express");
const app = express();
const PORT = 4000;

app.get("/user", (req, res) => {
  res.send({ firstName: "Satish", lastName: "Akula" });
});
app.post("/user", (req, res) => {
  res.send("data saved successfully");
});
app.delete("/user", (req, res) => {
  res.send("Data deleted successfully ");
});

app.use("/", (req, res) => {
  res.send("Hello namaste....");
});
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
