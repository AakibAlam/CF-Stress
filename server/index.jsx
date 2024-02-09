const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./Routes/AuthRoute.jsx");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const { PORT, MONGO_URL } = process.env;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL, {});
    console.log(`MongoDB Connected!\n ${conn}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/", authRoute);