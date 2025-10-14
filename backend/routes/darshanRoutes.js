// const express = require("express");
// const { bookDarshan, getAllDarshan, confirmDarshan } = require("../controllers/darshanController");
// const { verifyAdminToken } = require("../middleware/auth");

// const router = express.Router();

// router.post("/book-darshan", bookDarshan);
// router.get("/darshan", verifyAdminToken, getAllDarshan);
// router.post("/confirm-darshan/:id", verifyAdminToken, confirmDarshan);

// module.exports = router;


import express from "express";
import { bookDarshan, getAllDarshan, confirmDarshan } from "../controllers/darshanController.js";
import { verifyAdminToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/book-darshan", bookDarshan);
router.get("/darshan", verifyAdminToken, getAllDarshan);
router.post("/confirm-darshan/:id", verifyAdminToken, confirmDarshan);

export default router;
