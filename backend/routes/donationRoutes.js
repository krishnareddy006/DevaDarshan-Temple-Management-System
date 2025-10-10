const express = require("express");
const { 
  addDonation, 
  getAllDonations, 
  addDonationUsage, 
  getAllDonationUsage 
} = require("../controllers/donationController");
const { verifyAdminToken } = require("../middleware/auth");

const router = express.Router();

router.post("/donations", addDonation);
router.get("/donations", verifyAdminToken, getAllDonations);
router.post("/donation-usage", verifyAdminToken, addDonationUsage);
router.get("/donation-usage", verifyAdminToken, getAllDonationUsage);

module.exports = router;
