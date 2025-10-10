const express = require("express");
const { adminSignup, adminLogin, verifyAdmin, getAllAdmins } = require("../controllers/adminController");
const { verifyAdminToken } = require("../middleware/auth");

const router = express.Router();

router.post("/admin-signup", adminSignup);
router.post("/admin-login", adminLogin);
router.get("/verify-admin", verifyAdminToken, verifyAdmin);
router.get("/admins", verifyAdminToken, getAllAdmins);

module.exports = router;
