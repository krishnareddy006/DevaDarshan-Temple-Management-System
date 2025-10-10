const express = require("express");
const { 
  bookAccommodation, 
  getAllAccommodations, 
  checkAvailability, 
  checkDateRange, 
  confirmAccommodation 
} = require("../controllers/accommodationController");
const { verifyAdminToken } = require("../middleware/auth");

const router = express.Router();

router.post("/accommodations", bookAccommodation);
router.get("/accommodations", getAllAccommodations);
router.get("/accommodations/availability", checkAvailability);
router.post("/accommodations/check", checkDateRange);
router.post("/accommodations/confirm/:id", verifyAdminToken, confirmAccommodation);

module.exports = router;
