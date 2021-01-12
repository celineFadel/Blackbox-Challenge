const mongoose = require("mongoose");
const DB_LINK = "mongodb://localhost:27017/blackboxDB";

// const DB_LINK = "mongodb://tony:321580@api.wonderfulminds.ae:27017/blackBox?authSource=admin";
let poolSize = 5;

mongoose.connect(DB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize
});
const connect = mongoose.connection;

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

connect.on("connecting", function () {
  console.log("connecting to MongoDB...");
});
connect.on("error", function (error) {
  console.error("Error in MongoDb connection: " + error);
  mongoose.disconnect();
});
connect.on("connected", function () {
  console.log("MongoDB connected!");
});
connect.once("open", function () {
  console.log("MongoDB connection opened!");
});
connect.on("reconnected", function () {
  console.log("MongoDB reconnected!");
});
connect.on("disconnected", function () {
  console.log("MongoDB disconnected!");

  mongoose.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize
  });
});

module.exports = mongoose;
