const express = require("express");
const { addEvent, getAllEvents } = require("../controllers/eventController");
const { verifyAdminToken } = require("../middleware/auth");

const router = express.Router();

router.post("/events", verifyAdminToken, addEvent);
router.get("/events", getAllEvents);

module.exports = router;
