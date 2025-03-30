const Question = require("../models/Question");

class QuestionController {
    // GET /api/questions/getQuestions/:id
    getQuestionById(req, res) {
        Question.find({ assignment_id: req.params.id })
            .then(questions => res.json(questions))
            .catch(error => {
                console.error("Error getting questions:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            });
    }

    // PUT /api/questions/updateQuestion/:id
    updateQuestion(req, res) {
        Question.findByIdAndUpdate(req.params.id, req.body)
            .then(question => res.json(question))
            .catch(error => {
                console.error("Error updating question:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            });
    }

    // POST /api/questions/createQuestion
    createQuestion(req, res) {
        Question.create(req.body)
            .then(question => res.status(201).json(question))
            .catch(error => {
                console.error("Error creating question:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            });
    }
}

module.exports = new QuestionController();
