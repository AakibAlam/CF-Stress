const { Signup, Signin } = require("../Controllers/AuthController.jsx");
const { userVerification } = require("../Middlewares/AuthMiddleware.jsx");
const { UserCredentials } = require("../Controllers/UserCredentials.jsx");
const { StressTest } = require("../Controllers/StressTest.jsx");
const { Contact } = require("../Controllers/ContactUs.jsx");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/signin", Signin);
router.post("/", userVerification, UserCredentials);
router.post("/contact", userVerification, Contact);
router.post("/test", userVerification, StressTest);

module.exports = router;
