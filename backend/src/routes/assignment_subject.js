const express = require("express");
const router = express.Router();
const assignmentSubjectController = require("../app/controllers/assignment_subject.controller");

router.get("/getAssignmentSubjectsBySubject/:id", assignmentSubjectController.getAssignmentSubjects);
router.put("/createAssignmentSubject", assignmentSubjectController.createAssignmentSubject);
router.delete("/deleteAssignmentSubject/:id", assignmentSubjectController.deleteAssignmentSubject);
module.exports = router;