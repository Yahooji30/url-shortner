import express from "express";
import mongoose from "mongoose";
import router from "./routes/route.js";

const server = express();
const PORT = process.env.PORT || 5500;
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use("/images", express.static("images"));
server.set("view engine", "ejs");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://admin:admin@testingcluster.iu5ywjp.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

server.use("/", router);

server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
