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

router.post("/accommodations/book", bookAccommodation); 
router.get("/accommodations", verifyAdminToken, getAllAccommodations); 
router.get("/accommodations/availability", checkAvailability); 
router.post("/accommodations/check-range", checkDateRange); 
router.put("/accommodations/confirm/:id", verifyAdminToken, confirmAccommodation); 

export default router;
