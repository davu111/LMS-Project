const Assignment = require('../models/Assignment');

class AssignmentController {
    // [GET] /assignments
    getAssignments(req, res) {
        Assignment.find({})
            .then(assignments => res.json(assignments))
            .catch(err => res.status(400).json({ err }));
    }
}

module.exports = new AssignmentController();