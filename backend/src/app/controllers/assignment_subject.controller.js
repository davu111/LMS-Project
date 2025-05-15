const AssignmentSubject = require("../models/assignmentSubject.model");

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
    async createAssignmentSubject(req, res) {
        try {
            const { _id, ...rest } = req.body;
    
            let assignmentSubject;
    
            if (_id) {
                // Nếu có _id: update
                assignmentSubject = await AssignmentSubject.findByIdAndUpdate(
                    _id,
                    { $set: rest },
                    { new: true }
                );
            } else {
                // Nếu không có _id: tạo mới
                assignmentSubject = new AssignmentSubject(rest);
                await assignmentSubject.save();
            }
    
            res.status(201).json(assignmentSubject);
        } catch (error) {
            console.error("Error creating/updating assignment subject:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
    
    

    // [DELETE] /api/assignment_subjects/deleteAssignmentSubject/:id
    deleteAssignmentSubject(req, res) {
        AssignmentSubject.findByIdAndDelete(req.params.id)
            .then(assignmentSubject => res.json(assignmentSubject))
            .catch(error => {
                console.error("Error deleting assignment subject:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            });
    }

}

module.exports = new AssignmentSubjectController();