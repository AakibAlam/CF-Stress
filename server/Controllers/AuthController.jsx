const User = require("../Models/User.jsx");
const { createSecretToken } = require("../Utils/SecretToken.jsx");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { name, email, password, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User with this Email already exists" });
    }
    const user = await User.create({ name, email, password, createdAt });
    next();
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res
      .status(400)
      .json({ success: false, message: "Failed to sign up." });
  }
};

module.exports.Signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User with this email doesn't exist" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Wrong Password" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "Sign In Successful!", success: true, user: user });
    // next();
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};
