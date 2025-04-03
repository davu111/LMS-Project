const express = require("express");
const router = express.Router();
const scoreController = require("../app/controllers/ScoreController");

// router.get("/getScores", scoreController.getScores);
router.get("/getScores/:id", scoreController.getScores);

module.exports = router;