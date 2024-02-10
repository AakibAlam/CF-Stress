const { Signup, Signin } = require("../Controllers/AuthController.jsx");
const { userVerification } = require("../Middlewares/AuthMiddleware.jsx");
const { UserCredentials } = require("../Controllers/UserCredentials.jsx");
const { StressTest } = require("../Controllers/StressTest.jsx");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/signin", Signin);
router.post("/contact", userVerification, (req, res) => {
  res.status(200).send("You can access the contact route!");
});
router.post("/test", userVerification, StressTest);
router.post("/", userVerification, UserCredentials);
module.exports = router;
