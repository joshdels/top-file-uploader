const express = require("express");
const path = require("node:path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.listen(3000, (error) => {
  if (error) {
    throw error;
  }

  console.log("App is running");
});
