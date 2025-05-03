const express = require("express");
const router = express.Router();
const scoreController = require("../app/controllers/ScoreController");

// router.get("/getScores", scoreController.getScores);
router.get("/getScores/:id", scoreController.getScores);
router.get("/getScoresByAssignment/:id", scoreController.getScoresByAssignment);
router.put("/updateScore/:id", scoreController.updateScore);

module.exports = router;