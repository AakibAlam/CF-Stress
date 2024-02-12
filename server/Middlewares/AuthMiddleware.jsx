require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Models/User.jsx");

module.exports.userVerification = async (req, res, next) => {
  const token = req.cookies.token;
  if (token === undefined) {
    console.log("Not Signed In\n");
    return res.json({ status: false, error: "Not Signed IN\n" });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({
        status: false,
        error: "Error in verification with token\n",
      });
    }
    try {
      const user = await User.findById(data.id);
      if (!user) {
        console.error("User not found in the database");
        return res.status(401).json({ status: false, error: "User not found" });
      }
      next();
    } catch (error) {
      console.error("Error while querying the database:", error);
      return res
        .status(500)
        .json({ status: false, error: "Internal server error" });
    }
  });
};
