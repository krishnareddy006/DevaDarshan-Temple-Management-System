const express = require("express");
const { bookDarshan, getAllDarshan, confirmDarshan } = require("../controllers/darshanController");
const { verifyAdminToken } = require("../middleware/auth");

const router = express.Router();

router.post("/book-darshan", bookDarshan);
router.get("/darshan", verifyAdminToken, getAllDarshan);
router.post("/confirm-darshan/:id", verifyAdminToken, confirmDarshan);

module.exports = router;
