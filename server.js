const express = require("express");
const app = express();
require("dotenv").config();

const dbConfig = require("./config/dbConfig");

app.use(express.json());

const employeeRoute = require("./routes/employeeRoute");
const studentRoute = require("./routes/studentRoute");
const resultsRoute = require("./routes/resultsRoute");



app.use("/api/employee", employeeRoute);
app.use("/api/student/", studentRoute);
app.use("/api/results/", resultsRoute);




const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.get("/", function (req, res) {
  res.send("Welcome to the Result management app");
});

app.listen(port, console.log(`!!Server running on ${port}!!!`));
