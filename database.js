const mongoose = require("mongoose");
const connectDB = async () => {
  const conn = await mongoose.connect("connection string here", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`mongo connected: ${conn.connection.host}`);
};
module.exports = connectDB;
