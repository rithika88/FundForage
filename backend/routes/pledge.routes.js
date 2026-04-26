const express = require("express");
const router = express.Router();
const { createPledge } = require("../controllers/pledge.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/", protect, createPledge);

module.exports = router;