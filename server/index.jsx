const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoute = require("./Routes/AuthRoute.jsx");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 4000;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected!\n ${conn}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://cfstress.azurewebsites.net"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(express.static("./public"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.use(express.json());
app.use(cookieParser());
app.use("/", authRoute);
