import express from "express";
import { adminSignup, adminLogin, verifyAdmin, getAllAdmins } from "../controllers/adminController.js";
import { verifyAdminToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/admin-signup", adminSignup);
router.post("/admin-login", adminLogin);
router.get("/verify-admin", verifyAdminToken, verifyAdmin);
router.get("/admins", verifyAdminToken, getAllAdmins);

export default router;
