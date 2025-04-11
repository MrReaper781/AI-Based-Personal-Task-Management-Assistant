const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/auth-check", authController.authCheck);

module.exports = router;
