const Assignment = require('../models/Assignment');

class AssignmentController {
    // [GET] /assignments
    getAssignments(req, res, next) {
        Assignment.find({})
            .then(assignments => res.json(assignments))
            .catch(next);
    }

    // [POST] /assignments
    createAssignment(req, res, next) {
        Assignment.create(req.body)
            .then(assignment => res.json(assignment))
            .catch(next);
    }
}

module.exports = new AssignmentController();