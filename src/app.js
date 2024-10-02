const express = require("express");
const app = express();
const PORT = 4000;

app.get("/user/:id/:name/:password", (req, res) => {
  console.log(req.params); //http://localhost:4000/user/101/satish/testing => can get { id: '101', name: 'satish', password: 'testing' }
  res.send({ firstName: "Satish", lastName: "Akula" }); // reading dynamic routes
});
// app.get("/user", (req, res) => {
//   console.log(req.query);  => http://localhost:4000/user?id=101&pasword=testing => can get {id:101,pasword:testing}
//   res.send({ firstName: "Satish", lastName: "Akula" }); // reading query params
// });

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
