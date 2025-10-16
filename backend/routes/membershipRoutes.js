import express from "express";
import { submitMembership, getAllMemberships, approveMembership } from "../controllers/membershipController.js";
import { verifyAdminToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/membership", submitMembership);
router.get("/membership", verifyAdminToken, getAllMemberships);
router.post("/membership/approve/:id", verifyAdminToken, approveMembership);

export default router;

