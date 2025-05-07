const AssignmentSubject = require("../models/AssignmentSubject");

class AssignmentSubjectController {
    // [GET] /api/assignment_subjects/getAssignmentSubjectsBySubject/:id
    getAssignmentSubjects(req, res) {
        AssignmentSubject.find()
            .then(assignmentSubjects => {
                console.log(req.params.id);

                res.json(assignmentSubjects)
    })
            .catch(error => {
                console.log(req.params.id);
                console.error("Error getting assignment subjects:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            });
    }

    // [POST] /api/assignment_subjects/createAssignmentSubject
    createAssignmentSubject(req, res) {
        AssignmentSubject.create(req.body)
            .then(assignmentSubject => res.status(201).json(assignmentSubject))
            .catch(error => {
                console.error("Error creating assignment subject:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            });
    }

}

module.exports = new AssignmentSubjectController();