const express = require("express");
const router = express.Router();
const questionController = require("../app/controllers/QuestionController");

// router.get("/getQuestions", questionController.getQuestions);
router.get("/getQuestion/:id", questionController.getQuestionById);
router.put("/updateQuestion/:id", questionController.updateQuestion);
router.post("/createQuestion", questionController.createQuestion);
// router.post('/questions/uploadFileQuestion', questionController.uploadFileQuestion);

module.exports = router;