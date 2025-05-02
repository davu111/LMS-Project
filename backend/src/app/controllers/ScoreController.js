const Score = require("../models/Score");

class ScoreController {
    // GET /api/scores/getScores/:id
    getScores(req, res) {
        Score.find({ assignment_id: req.params.id })
            .then(scores => res.json(scores))
            .catch(error => {
                console.error("Error getting scores:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            });
    }

    async getScoresByAssignment(req, res) {
        try {
          const assignmentId  = req.params.id;
      
          const scores = await Score.find({ assignment_id: assignmentId }).populate("student_id", "name");
      
          res.json(scores); // mỗi phần tử sẽ có student_id: { _id, name }
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ScoreController();