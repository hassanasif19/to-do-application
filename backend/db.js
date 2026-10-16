const mongoose = require("mongoose");

const mongooseURI = "mongodb://localhost:27017/inotebook";

const connecttomongo = () => {
  mongoose
    .connect(mongooseURI)
    .then(() => {
      console.log("Connected to mongo Successfully");
    })
    .catch((err) => {
      console.log("Cannnot connected to mongo Successfully", err);
    });
};

module.exports = connecttomongo;
