const jwt = require("jsonwebtoken");
const User = require("../Models/User.jsx");

module.exports.UserCredentials = async (req, res) => {
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({
        status: false,
        message: "error fetching user details.",
      });
    }
    try {
      const user = await User.findById(data.id);
      if (!user) {
        console.error("User not found in the database");
        return res.status(401).json({ status: false, error: "User not found" });
      }
      return res.status(200).json({ status: true, user: user });
    } catch (error) {
      console.error("Error while querying the database:", error);
      return res
        .status(500)
        .json({ status: false, error: "Internal server error" });
    }
  });
};
