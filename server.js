const express = require("express");
require("dotenv").config();
const CoonectDB = require("./config/connection");
const bookRouter = require("./routes/book-route");
const authRouter = require("./routes/userRouter");
const logData = require("./middleware/auth");

const app = express();
const port = process.env.PORT;

// middle ware for body parser
app.use(express.json());

// creating a default  route
app.use("/api/test", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    Message: "API Working Properly",
  });
});

//middleware function
app.use(logData);

//route
app.use("/api/", bookRouter);
app.use("/api/", authRouter);

// creating server
app.listen(port, (req, res) => {
  console.log(`server is working at port number : ${port}`);
  CoonectDB;
});

module.exports = app;
