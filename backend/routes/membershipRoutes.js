const express = require("express");
const { submitMembership } = require("../controllers/membershipController");

const router = express.Router();

router.post("/membership", submitMembership);

module.exports = router;
