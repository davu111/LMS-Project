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
}

module.exports = new ScoreController();