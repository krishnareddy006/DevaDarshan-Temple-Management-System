import express from "express";
import { 
  bookAccommodation, 
  getAllAccommodations, 
  checkAvailability, 
  checkDateRange, 
  confirmAccommodation 
} from "../controllers/accommodationController.js";
import { verifyAdminToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/accommodations", bookAccommodation);
router.get("/accommodations", getAllAccommodations);
router.get("/accommodations/availability", checkAvailability);
router.post("/accommodations/check", checkDateRange);
router.post("/accommodations/confirm/:id", verifyAdminToken, confirmAccommodation);

export default router;
