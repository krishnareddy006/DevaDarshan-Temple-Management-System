import express from "express";
import { addEvent, getAllEvents, deleteEvent, deleteExpiredEvents } from "../controllers/eventController.js";
import { verifyAdminToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/events", verifyAdminToken, addEvent);
router.get("/events", getAllEvents);
router.delete("/events/:id", verifyAdminToken, deleteEvent);
router.delete("/events/cleanup/expired", verifyAdminToken, deleteExpiredEvents);

export default router;
