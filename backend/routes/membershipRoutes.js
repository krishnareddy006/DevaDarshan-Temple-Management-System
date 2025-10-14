import express from "express";
import { submitMembership, getAllMemberships, approveMembership } from "../controllers/membershipController.js";
import { verifyAdminToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", submitMembership);
router.get("/", verifyAdminToken, getAllMemberships);
router.post("/approve/:id", verifyAdminToken, approveMembership);

export default router;

