const express = require("express");
const router = express.Router();
const assignmentSubjectController = require("../app/controllers/assignment_subject.controller");

router.get("/getAssignmentSubjectsBySubject/:id", assignmentSubjectController.getAssignmentSubjects);
router.post("/createAssignmentSubject", assignmentSubjectController.createAssignmentSubject);
module.exports = router;