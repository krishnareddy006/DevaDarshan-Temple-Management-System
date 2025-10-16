import express from "express";
import { bookDarshan, getAllDarshan, confirmDarshan } from "../controllers/darshanController.js";
import { verifyAdminToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/book-darshan", bookDarshan);
router.get("/darshan", verifyAdminToken, getAllDarshan);
router.post("/confirm-darshan/:id", verifyAdminToken, confirmDarshan);

export default router;
