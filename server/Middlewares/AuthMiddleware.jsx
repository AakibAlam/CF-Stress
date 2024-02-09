require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Models/User.jsx");

module.exports.userVerification = async (req, res, next) => {
  const token = req.cookies.token;
  if (token === undefined) {
    console.log("Not Signed In\n");
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    }
    try {
      const user = await User.findById(data.id);
      if (!user) {
        console.error("User not found in the database");
        return res.status(401).json({ status: false, error: "User not found" });
      }
      const { name, email } = user;
      console.log("User verified:", name, email);
      next();
    } catch (error) {
      console.error("Error while querying the database:", error);
      return res
        .status(500)
        .json({ status: false, error: "Internal server error" });
    }
  });
};
