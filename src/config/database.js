const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
      "mongodb+srv://aliahmad:aliahmad111486@cluster0.y6nggwo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/devTinder",
    );
}
module.exports=connectDB;
  