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

    // [PUT] /api/scores/updateScore/:id
    updateScore(req, res) {
        Score.findByIdAndUpdate(req.params.id, req.body, { new: true }) // <-- cần `{ new: true }` để lấy bản ghi sau cập nhật
            .populate('student_id') // <-- populate lại student_id
            .then(score => res.json(score))
            .catch(error => {
                console.error("Error updating score:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            });
    }
    
}

module.exports = new ScoreController();