const express = require("express");
const { addPooja, getAllPoojas, getPoojaById } = require("../controllers/poojaController");
const { verifyAdminToken } = require("../middleware/auth");

const router = express.Router();

router.post("/poojas", verifyAdminToken, addPooja);
router.get("/poojas", getAllPoojas);
router.get("/poojas/:id", getPoojaById);

module.exports = router;
