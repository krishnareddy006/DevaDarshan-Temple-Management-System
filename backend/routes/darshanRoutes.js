import express from "express";
import { bookDarshan, getAllDarshan, confirmDarshan } from "../controllers/darshanController.js";
import { verifyAdminToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/darshan/book", bookDarshan); // Public direct booking
router.get("/darshan", verifyAdminToken, getAllDarshan); // Admin view only
router.post("/darshan/confirm/:id", verifyAdminToken, confirmDarshan); // Deprecated but kept for compatibility

export default router;

