const express = require("express");
const router = express.Router();
const questionController = require("../app/controllers/QuestionController");

// router.get("/getQuestions", questionController.getQuestions);
router.get("/getQuestion/:id", questionController.getQuestionById);
router.post("/createQuestion", questionController.createQuestion);

module.exports = router;