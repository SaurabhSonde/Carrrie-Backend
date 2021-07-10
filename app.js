require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");

//Database Connection
mongoose
  .connect(process.env.Database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database Connected....");
  })
  .catch((err) => {
    console.log(err);
  });

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", todoRoutes);

//Port
const port = process.env.PORT || 5000;

//starting the server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
