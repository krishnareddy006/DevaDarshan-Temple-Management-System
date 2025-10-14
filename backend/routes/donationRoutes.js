import express from "express";
import { 
  addDonation, 
  getAllDonations, 
  addDonationUsage, 
  getAllDonationUsage 
} from "../controllers/donationController.js";
import { verifyAdminToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/donations", addDonation);
router.get("/donations", verifyAdminToken, getAllDonations);
router.post("/donation-usage", verifyAdminToken, addDonationUsage);
router.get("/donation-usage", verifyAdminToken, getAllDonationUsage);

export default router;
