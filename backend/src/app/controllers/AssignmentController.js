const Assignment = require('../models/Assignment');

class AssignmentController {
    // [GET] /assignments
    getAssignments(req, res, next) {
        Assignment.find({})
            .then(assignments => res.json(assignments))
            .catch(next);
    }

    // [GET] /assignments/:id
    getAssignmentById(req, res, next) {
        Assignment.findById(req.params.id)
            .then(assignment => res.json(assignment))
            .catch(next);
    }

    // [POST] /assignments
    createAssignment(req, res, next) {
        Assignment.create(req.body)
            .then(assignment => res.json(assignment))
            .catch(next);
    }
    // [PUT] /assignments/:id
    updateAssignment(req, res, next) {
        Assignment.findByIdAndUpdate(req.params.id, req.body)
            .then(assignment => res.json(assignment))
            .catch(next);
    }

    // [DELETE] /assignments/:id
    deleteAssignment(req, res, next) {
        Assignment.findByIdAndDelete(req.params.id)
            .then(assignment => res.json(assignment))
            .catch(next);
    }
}

module.exports = new AssignmentController();