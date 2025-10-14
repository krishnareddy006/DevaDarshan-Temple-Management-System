import express from "express";
import { addPooja, getAllPoojas, getPoojaById, deletePooja, deleteExpiredPoojas } from "../controllers/poojaController.js";
import { verifyAdminToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/poojas", verifyAdminToken, addPooja);
router.get("/poojas", getAllPoojas);
router.get("/poojas/:id", getPoojaById);
router.delete("/poojas/:id", verifyAdminToken, deletePooja);
router.delete("/poojas/cleanup/expired", verifyAdminToken, deleteExpiredPoojas);

export default router;
