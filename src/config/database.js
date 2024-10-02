const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://akula_405:pUM%24Gb8vG%23NFUmZ@cluster0.use89.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
};

module.exports = connectDb;

// Call the connectDb function
//connectDb();
