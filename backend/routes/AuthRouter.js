const { login, signup, getAllUsers } = require("../controllers/AuthController");

const router = require("express").Router();

router.post("/login", login)
router.post("/signup", signup)


module.exports = router